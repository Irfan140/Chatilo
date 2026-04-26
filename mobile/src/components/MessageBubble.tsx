/**
 * Chat message bubble component
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  botContainer: {
    alignItems: "flex-start",
  },
  bubble: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#007AFF",
  },
  botBubble: {
    backgroundColor: "#E5E5EA",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#000000",
  },
});
