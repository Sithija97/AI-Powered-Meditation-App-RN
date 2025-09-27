import { chatWithAiModel } from "@/services/ai-chat.service";
import { useClerk } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type IMessage = { role: string; content: string };

export default function Index() {
  const router = useRouter();
  const { signOut } = useClerk();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const { agentName, initialText, agentPrompt, agentId } =
    useLocalSearchParams();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: agentName,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log("Plus icon pressed");
          }}
          style={{ marginRight: 15 }}
        >
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, agentName]);

  useEffect(() => {
    setInput(initialText.toString());
    if (agentPrompt) {
      setMessages((prev) => [
        ...prev,
        { role: "system", content: agentPrompt.toString() },
      ]);
    }
  }, [agentPrompt]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(public)");
  };

  const onSendMessage = async () => {
    if (!input?.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const loadingMessage = { role: "assistant", content: "loading" };
    setMessages((prev) => [...prev, loadingMessage]);

    const result = await chatWithAiModel([...messages, newMessage]);
    // @ts-ignore
    const responseMessage = { role: "assistant", content: result.aiResponse };
    // setMessages((prev) => [...prev, responseMessage]);
    setMessages((prev) => {
      const updatedMessageList = [...prev];
      updatedMessageList[updatedMessageList.length - 1] = responseMessage;
      return updatedMessageList;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={headerHeight - 100}
      >
        <View style={styles.messagesContainer}>
          <FlatList
            data={messages}
            keyboardShouldPersistTaps="handled"
            // @ts-ignore
            renderItem={({ item, index }) =>
              item.role !== "system" && (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    item.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage,
                  ]}
                >
                  {item.content == "loading" ? (
                    <ActivityIndicator size={"small"} color={"black"} />
                  ) : (
                    <>
                      <Text
                        style={[
                          styles.messageText,
                          item.role === "user"
                            ? styles.userMessageText
                            : styles.assistantMessageText,
                        ]}
                      >
                        {item.content}
                      </Text>
                      {item.role == "assistant" && (
                        <Pressable>
                          <Feather name="copy" size={26} color={"gray"} />
                        </Pressable>
                      )}
                    </>
                  )}
                </View>
              )
            }
            showsVerticalScrollIndicator={false}
          />
          <Button title="Sign out" onPress={handleSignOut} />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Feather name="camera" size={26} color={"gray"} />
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message..."
            style={styles.input}
            value={input}
            onChangeText={(value) => setInput(value)}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
            <Feather name="send" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "75%",
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: "#4285F4",
    alignSelf: "flex-end",
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "white",
  },
  assistantMessageText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginHorizontal: 8,
    paddingHorizontal: 16,
    textAlignVertical: "center",
  },
  sendButton: {
    backgroundColor: "#4285F4",
    padding: 8,
    borderRadius: 99,
    marginBottom: 2,
  },
});
