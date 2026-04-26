/**
 * Main chat screen
 */

import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useChat } from "../hooks/useChat";
import { MessageBubble } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";
import * as api from "../lib/api";

export default function ChatScreen() {
  const { messages, loading, error, sendMessage, clearMessages } = useChat();
  const [apiConnected, setApiConnected] = React.useState(false);
  const [checkingConnection, setCheckingConnection] = React.useState(true);
  const flatListRef = React.useRef<FlatList>(null);

  // Check API connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await api.checkHealth();
      setApiConnected(connected);
      setCheckingConnection(false);
    };

    checkConnection();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  if (checkingConnection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.checkingText}>Connecting to API...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!apiConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.errorText}>
            Cannot connect to chat API. Please ensure the backend is running on http://localhost:3000
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconBg}>
            <Text style={styles.headerIcon}>🤖</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Chat AI</Text>
            <Text style={styles.headerSubtitle}>Powered by LLM</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble text={item.text} sender={item.sender} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          inverted={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Start a conversation!</Text>
            </View>
          }
        />

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        <ChatInput onSendMessage={sendMessage} loading={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "#F8F9FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontWeight: "500",
  },
  messageList: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  checkingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  errorBanner: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#FF3B30",
  },
  errorBannerText: {
    fontSize: 14,
    color: "#FF3B30",
  },
});
