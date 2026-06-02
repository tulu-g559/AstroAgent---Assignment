from app.core.llm import llm

ROUTER_PROMPT = """
Classify the user message.

Return ONLY one word.

chart
transit
knowledge
chat
safety
offtopic

Definitions:

chart:
birth chart generation
natal chart calculation

transit:
today's horoscope
current planetary energy
daily transits

knowledge:
astrology explanations
interpretation of planetary placements
astrology concept questions

chat:
general conversation
greetings
thanks

safety:
medical diagnosis or health condition questions
financial advice or investment certainty
gambling, lottery numbers, or betting
legal advice or lawsuit questions
requests for definite predictions about marriage, job, wealth, or life events

offtopic:
completely unrelated topics like weather, sports, cooking, arithmetic, travel booking
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
