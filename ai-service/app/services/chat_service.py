from app.graph.chat_graph import run_chat_graph


async def chat_service(prompt: str) -> str:
    # Execute LangGraph workflow
    response = await run_chat_graph(prompt)
    
    return response
