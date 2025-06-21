import { Image } from "expo-image";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";

// Type definitions
interface CapturedPhoto {
  uri: string;
  width: number;
  height: number;
}

interface OCRSpaceResult {
  IsErroredOnProcessing: boolean;
  ErrorMessage?: string;
  ParsedResults: {
    ParsedText: string;
  }[];
}

interface API4AIResult {
  status: string;
  results: {
    entities: {
      texts: {
        text: string;
      }[];
    };
  }[];
}

interface EasyOCRItem {
  0: number[][]; // bounding box coordinates
  1: string; // detected text
  2: number; // confidence score
}

interface FormDataFile {
  uri: string;
  type: string;
  name: string;
}

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedIngredients, setExtractedIngredients] = useState<string[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  // Enhanced function to process OCR text and extract ingredients
  const processIngredientsText = (text: string): string[] => {
    // console.log("Raw OCR Text:", text); // Debug log

    // Convert to lowercase for better matching
    const lowerText = text.toLowerCase();

    // Enhanced ingredients keywords
    const ingredientsKeywords = [
      "ingredients:",
      "ingredients",
      "contains:",
      "contains",
      "ingrédients:",
      "inhaltsstoffe:",
      "składniki:", // Multi-language support
      "composition:",
      "made with:",
      "made from:",
    ];

    let ingredientsSection = "";

    // Find the ingredients section
    for (let keyword of ingredientsKeywords) {
      const index = lowerText.indexOf(keyword);
      if (index !== -1) {
        // Extract text after the keyword until next section or end of reasonable length
        let endIndex = text.length;

        // Look for section endings
        const endKeywords = [
          "nutrition",
          "nutritional",
          "storage",
          "store",
          "best before",
          "use by",
          "allergen",
          "warning",
        ];
        for (let endKeyword of endKeywords) {
          const endIdx = lowerText.indexOf(endKeyword, index);
          if (endIdx !== -1 && endIdx < endIndex) {
            endIndex = endIdx;
          }
        }

        ingredientsSection = text.substring(index + keyword.length, endIndex);
        break;
      }
    }

    if (!ingredientsSection) {
      // If no specific ingredients section found, use the whole text
      ingredientsSection = text;
    }

    // Enhanced cleaning and splitting
    let ingredients = ingredientsSection
      .replace(/[()[\]{}]/g, "") // Remove all types of brackets
      .replace(/\d+%/g, "") // Remove percentages
      .replace(/E\d+/gi, "E-number") // Handle E-numbers
      .replace(/\b(and|or|&)\b/gi, ",") // Replace 'and', 'or', '&' with commas
      .split(/[,;.\n\r]/) // Split by comma, semicolon, period, or newlines
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 2) // Remove very short strings
      .filter((ingredient) => !ingredient.match(/^\d+$/)) // Remove pure numbers
      .filter((ingredient) => !ingredient.match(/^[^\w\s]+$/)) // Remove strings with only special characters
      .filter((ingredient) => ingredient.match(/[a-zA-Z]/)) // Must contain at least one letter
      .map((ingredient) => {
        // Clean up common OCR errors
        return ingredient
          .replace(/[|]/g, "l") // Replace pipes with 'l'
          .replace(/[0]/g, "O") // Replace zeros with 'O' in ingredient names
          .replace(/\s+/g, " ") // Replace multiple spaces with single space
          .trim();
      })
      .slice(0, 25); // Increased limit for more ingredients

    console.log("Processed ingredients:", ingredients); // Debug log
    return ingredients;
  };

  // Free OCR APIs - Choose one of these options
  const performOCR = async (imageUri: string): Promise<string> => {
    try {
      // Option 1: OCR.space API (Free tier: 25,000 requests/month)
      return await ocrSpaceAPI(imageUri);

      // Option 2: API4AI OCR (Free tier: 100 requests/month, then paid)
      // return await api4aiOCR(imageUri);

      // Option 3: EasyOCR via RapidAPI (Free tier available)
      // return await easyOCRAPI(imageUri);
    } catch (error) {
      console.error("OCR Error:", error);
      throw new Error("Failed to extract text from image");
    }
  };

  // OCR.space API implementation (FREE - 25,000 requests/month)
  const ocrSpaceAPI = async (imageUri: string): Promise<string> => {
    const formData = new FormData();

    // React Native FormData requires this format
    const fileData: FormDataFile = {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    };

    formData.append("file", fileData as any); // Type assertion for React Native FormData
    formData.append("apikey", "K83833819288957"); // Free API key (you should get your own)
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("detectOrientation", "true");
    formData.append("scale", "true");
    formData.append("OCREngine", "2"); // Use OCR Engine 2 for better accuracy

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const result: OCRSpaceResult = await response.json();

    if (result.IsErroredOnProcessing) {
      throw new Error(result.ErrorMessage || "OCR processing failed");
    }

    return result.ParsedResults[0]?.ParsedText || "";
  };

  // API4AI OCR implementation (FREE tier: 100 requests/month)
  const api4aiOCR = async (imageUri: string): Promise<string> => {
    const formData = new FormData();

    const fileData: FormDataFile = {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    };

    formData.append("image", fileData as any); // Type assertion for React Native

    const response = await fetch("https://api.api4ai.cloud/v1/results", {
      method: "POST",
      headers: {
        "A4A-CLIENT-APP-ID": "sample", // Get your own client ID
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const result: API4AIResult = await response.json();

    if (result.status !== "success") {
      throw new Error("API4AI OCR failed");
    }

    // Extract text from API4AI response
    const texts = result.results[0]?.entities?.texts || [];
    return texts.map((item) => item.text).join(" ");
  };

  // EasyOCR via RapidAPI implementation
  const easyOCRAPI = async (imageUri: string): Promise<string> => {
    const formData = new FormData();

    const fileData: FormDataFile = {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    };

    formData.append("image", fileData as any); // Type assertion for React Native
    formData.append("language", "en");

    const response = await fetch("https://easyocr1.p.rapidapi.com/easyocr", {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Sign up for free at rapidapi.com
        "X-RapidAPI-Host": "easyocr1.p.rapidapi.com",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const result: EasyOCRItem[] = await response.json();

    // Check if result has error property (error responses might have different structure)
    if ("error" in result) {
      throw new Error((result as any).error);
    }

    // Extract text from EasyOCR response
    return result.map((item) => item[1]).join(" ");
  };

  const takePicture = async (): Promise<void> => {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });

        setCapturedImage(photo.uri);

        // Perform OCR on the captured image
        const ocrText = await performOCR(photo.uri);
        const ingredients = processIngredientsText(ocrText);

        setExtractedIngredients(ingredients);

        Alert.alert(
          "Success",
          `Found ${ingredients.length} ingredients! Check console for details.`
        );
      } catch (error) {
        Alert.alert("Error", "Failed to capture or process image");
        console.error("Camera error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const pickImageFromGallery = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIsLoading(true);
      try {
        setCapturedImage(result.assets[0].uri);

        // Perform OCR on the selected image
        const ocrText = await performOCR(result.assets[0].uri);
        const ingredients = processIngredientsText(ocrText);

        setExtractedIngredients(ingredients);

        Alert.alert(
          "Success",
          `Found ${ingredients.length} ingredients! Check console for details.`
        );
      } catch (error) {
        Alert.alert("Error", "Failed to process image");
        console.error("Image processing error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const logIngredients = (): void => {
    console.log("=== EXTRACTED INGREDIENTS ===");
    console.log("Total ingredients found:", extractedIngredients.length);
    console.log("Ingredients list:");
    extractedIngredients.forEach((ingredient, index) => {
      console.log(`${index + 1}. ${ingredient}`);
    });
    console.log("==============================");

    if (extractedIngredients.length === 0) {
      Alert.alert("No ingredients", "Please scan a product first");
    } else {
      Alert.alert(
        "Ingredients logged",
        `${extractedIngredients.length} ingredients logged to console`
      );
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>

        {/* Camera View */}
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
        </View>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Processing..." : "Scan Product"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.captureButton, { backgroundColor: "#34C759" }]}
          onPress={pickImageFromGallery}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.captureButton, { backgroundColor: "#FF9500" }]}
          onPress={logIngredients}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Show Ingredients</Text>
        </TouchableOpacity>

        {capturedImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          </View>
        )}

        {extractedIngredients.length > 0 && (
          <View style={styles.ingredientsContainer}>
            <ThemedText type="subtitle">
              Found {extractedIngredients.length} ingredients:
            </ThemedText>
            {extractedIngredients.slice(0, 10).map((ingredient, index) => (
              <ThemedText key={index} style={styles.ingredientText}>
                • {ingredient}
              </ThemedText>
            ))}
            {extractedIngredients.length > 10 && (
              <ThemedText style={styles.moreText}>
                ... and {extractedIngredients.length - 10} more
              </ThemedText>
            )}
          </View>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  cameraContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    minWidth: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  ingredientsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    maxWidth: "100%",
  },
  ingredientText: {
    fontSize: 14,
    marginVertical: 2,
  },
  moreText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginTop: 5,
  },
});
