import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(public)");
  };

  return (
    <View style={styles.containr}>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  containr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
