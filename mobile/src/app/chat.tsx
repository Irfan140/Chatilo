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
} from "react-native";
import { useChat } from "../hooks/useChat";
import { MessageBubble } from "../components/MessageBubble";
import { ChatInput } from "../components/ChatInput";
import * as api from "../lib/api";

export default function ChatScreen() {
  const { messages, loading, error, sendMessage, clearMessages } = useChat();
  const [apiConnected, setApiConnected] = React.useState(false);
  const [checkingConnection, setCheckingConnection] = React.useState(true);

  // Check API connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await api.checkHealth();
      setApiConnected(connected);
      setCheckingConnection(false);
    };

    checkConnection();
  }, []);

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
        <Text style={styles.headerTitle}>Chat AI</Text>
      </View>

      <FlatList
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
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
