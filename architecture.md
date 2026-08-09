


                         ┌──────────────────────────┐
                         │        CLIENTS           │
                         │                          │
                         │ Web / Mobile / Banking   │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │      API GATEWAY         │
                         │        FastAPI            │
                         └────────────┬─────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             Authentication      Transactions      Dashboard
                    │                 │                 │
                    ▼                 ▼                 ▼
               ZKP Layer        Risk Engine       Analytics
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
                 Fraud Detection            Graph Intelligence
                         │                         │
                         ▼                         ▼
                   ML Models                  GraphSAGE
                         │                         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                              Risk Intelligence
                                      │
                                      ▼
                              Security Decision
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
                     Monitor                    Alert
                                                   │
                                                   ▼
                                          Security Dashboard