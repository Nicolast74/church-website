# Backend Integration Notes

## Sentinel (RAG Chat Engine)

The frontend currently sends POST requests to the `ENGINE_API_URL/chat` endpoint.

**Payload Structure:**
The frontend now sends a `mode` parameter in the JSON payload to differentiate between interactions from the global chat widget and the dedicated `/sentinel` page.

```json
{
  "message": "User's message here",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ],
  "mode": "short" // or "detailed"
}
```

### Modes
- `mode: "short"` : Used by the floating Chat Widget. The backend should instruct the LLM to give concise, brief answers without heavy markdown or long citations to fit the small widget UI.
- `mode: "detailed"` : Used by the `/sentinel` dedicated page. The backend should instruct the LLM to give comprehensive, long-form answers, including complete citations and markdown formatting.
