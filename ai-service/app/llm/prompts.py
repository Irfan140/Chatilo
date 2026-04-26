from langchain_core.prompts import ChatPromptTemplate


# System prompt for chat
SYSTEM_PROMPT = """You are a helpful AI assistant. 
Provide clear, concise, and helpful responses to user queries.
Be friendly and professional in your tone."""


def get_chat_prompt() -> ChatPromptTemplate:
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("human", "{input}"),
    ])
    return prompt