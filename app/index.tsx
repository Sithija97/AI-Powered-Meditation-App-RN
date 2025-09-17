import Colors from "@/shared/colors";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("screen");

export default function Index() {
  const handleGetStarted = () => {
    console.log("Get Started pressed");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/login.png")}
        style={styles.heroImage}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to AI Pocket Agent</Text>
        <Text style={styles.subtitle}>
          Your Ultimate AI Personal Agent to make life easier. Try it Today,
          Completely Free!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: Platform.OS === "android" ? 30 : 40,
    backgroundColor: Colors.WHITE || "#FFFFFF",
  },
  heroImage: {
    width: screenWidth * 0.85,
    height: 280,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: Colors.BLACK,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
    lineHeight: 24,
    marginHorizontal: 5,
  },
  getStartedButton: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
