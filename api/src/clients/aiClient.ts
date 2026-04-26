import httpClient from "../utils/http";

const AI_SERVICE_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";


//  Call FastAPI /api/generate endpoint
export async function generate(prompt: string): Promise<string> {
  try {
    const url = `${AI_SERVICE_BASE_URL}/api/generate`;
    
    const { data } = await httpClient.post<GenerateResponse>(url, { prompt });
    
    return data.response;
  } catch (error) {
    throw new Error(
      `AI service error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
