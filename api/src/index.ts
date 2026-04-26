import express from "express";
import chatRoutes from "./routes/chat";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Chat API is running" });
});

export default app