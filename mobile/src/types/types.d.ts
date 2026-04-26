interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  loading: boolean;
}

interface MessageBubbleProps {
  text: string;
  sender: "user" | "bot";
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}