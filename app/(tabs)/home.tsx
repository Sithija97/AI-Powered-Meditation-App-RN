import AgentList from "@/components/home/agent-list";
import CreateAgent from "@/components/home/create-agent";
import { useClerk } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { signOut } = useClerk();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerTitle}>AI Pocket Agent</Text>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.proButton} onPress={() => {}}>
          <Text style={styles.proButtonText}>Pro</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
          <Feather name="settings" size={20} color="#1f2937" />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
      headerLeftContainerStyle: {
        paddingLeft: 16,
      },
      headerRightContainerStyle: {
        paddingRight: 16,
      },
    });
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(public)");
  };

  return (
    // <View style={styles.container}>
    //   <Button title="Sign out" onPress={handleSignOut} />
    // </View>
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View style={styles.container}>
          <AgentList isFeatured={true} />
          <CreateAgent />
          <AgentList isFeatured={false} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  proButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  proButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
