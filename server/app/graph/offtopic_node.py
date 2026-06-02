import re

from langchain_core.messages import AIMessage

SAFETY_PATTERNS = [
    r"\b(disease|diagnosis|diagnose|symptom|medical condition|health condition|what disease|what illness|am I sick)\b",
    r"\b(prescription|medication|treatment|cure|surgery|operation)\b",
    r"\b(invest|investment|should I invest|stock market|trading|financial advice)\b",
    r"\b(all my money|my savings|put my money|buy stocks|sell stocks)\b",
    r"\b(lottery|gambling|bet|casino|lottery numbers|winning numbers|jackpot)\b",
    r"\b(lawyer|attorney|sue|lawsuit|legal advice|legal matter|court case)\b",
    r"\b(will I be rich|will I get married|quit my job|good day to quit|should I quit|should I leave my)\b",
    r"\b(tell me my lottery numbers|am I going to be rich|will I become)\b",
]

SAFETY_REFUSAL_MESSAGE = (
    "I cannot help with this request. "
    "For matters requiring professional advice, "
    "please consult a qualified expert."
)

OFFTOPIC_MESSAGE = (
    "I specialize in zodiac-based guidance and celestial insights. "
    "I cannot assist with this request."
)


def offtopic_node(state):
    user_message = state["messages"][-1].content.lower()

    for pattern in SAFETY_PATTERNS:
        if re.search(pattern, user_message):
            return {
                "blocked": True,
                "messages": [AIMessage(content=SAFETY_REFUSAL_MESSAGE)],
            }

    return {
        "messages": [AIMessage(content=OFFTOPIC_MESSAGE)],
    }
