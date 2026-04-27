/**
 * API client for Expo mobile app
 * Communicates with Express backend
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Send message to chat API
 */
export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = (await response.json()) as ChatResponse;
    return data.reply;
  } catch (error) {
    throw new Error(
      `Failed to send message: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}
