from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from app.llm.models import get_model


class ChatState(TypedDict):
    input: str
    output: str


def process_chat(state: ChatState) -> ChatState:
    model = get_model()
    response = model.invoke(state["input"])
    
    # Extract string content from response
    state["output"] = response.content if hasattr(response, "content") else str(response)
    return state


def build_chat_graph() -> StateGraph:
    graph = StateGraph(ChatState)
    
    # Add single processing node
    graph.add_node("chat", process_chat)
    
    # Connect start → chat → end
    graph.add_edge(START, "chat")
    graph.add_edge("chat", END)
    
    return graph.compile()


async def run_chat_graph(input_text: str) -> str:
    graph = build_chat_graph()
    initial_state = {"input": input_text, "output": ""}
    
    # Run graph - invoke is thread-safe and can be called from async context
    final_state = graph.invoke(initial_state)
    
    return final_state["output"]
