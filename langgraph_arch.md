```
                    START
                      │
                      ▼
                Router Node
                      │
         route_intent (conditional)
                      │
     ┌────┬────┬──────┼──────┬───────┐
     │    │    │      │      │       │
     ▼    ▼    ▼      ▼      ▼       ▼
   agent agent agent agent safety  offtopic
  (chart)(transit)(knl)(chat) _node   _node
                      │      │       │
                      │      ▼       ▼
                      │     END     END
                      │
        tools_condition (conditional)
                      │
                 ┌────┴─────┐
                 │          │
                 ▼          ▼
             ToolNode      END
                 │
                 ▼
            Memory Node
                 │
                 ▼
              agent
           (loop back)
```