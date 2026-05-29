```
                User Query
                     |
                     v
            +----------------+
            |   FastAPI API  |
            +----------------+
                     |
                     v

            +----------------+
            | LangGraph Agent|
            +----------------+

                     |
       +-------------+--------------+
       |                            |
       v                            v

  Reasoning Node             Tool Node
       |                            |
       +------------Router----------+
                    |
                    v

    +-----------------------------------+
    | geocode_place                     |
    | compute_birth_chart               |
    | get_daily_transits                |
    | knowledge_lookup                  |
    +-----------------------------------+

                    |
                    v

              Final Response
                    |
                    v

            React Chat UI

```