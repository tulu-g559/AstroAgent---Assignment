from app.core.llm import llm

ROUTER_PROMPT = """
Classify the user message.

Return ONLY one word.

chart
transit
knowledge
chat
offtopic

Definitions:

chart:
birth chart generation

transit:
today's horoscope
current planetary energy

knowledge:
astrology explanations

chat:
general conversation

offtopic:
unrelated topics
"""


def router_node(state):
    user_message = state["messages"][-1].content

    response = llm.invoke(
        [
            ("system", ROUTER_PROMPT),
            ("human", user_message),
        ]
    )

    intent = response.content.strip().lower()

    return {
        "intent": intent,
    }


def route_intent(state):
    return state["intent"]
