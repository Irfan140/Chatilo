import app from "./index";

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Chat API server running on http://${HOST}:${PORT}`);
  console.log(`📡 AI Service URL: ${process.env.AI_SERVICE_URL || "http://localhost:8000"}`);
});
