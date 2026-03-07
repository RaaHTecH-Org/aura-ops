import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "Show incidents affecting Azure systems",
  "Summarize today's incidents",
  "List high priority tickets",
  "What systems have the most issues?",
];

const mockResponses: Record<string, string> = {
  "show incidents affecting azure systems":
    "I found **5 incidents** affecting Azure systems today:\n\n1. **INC-001** — Azure AD Authentication Failures (Critical)\n2. **INC-002** — VPN Gateway Connectivity Loss (Critical)\n3. **INC-005** — MFA Push Notification Failures (High)\n4. **INC-006** — Azure SQL Database High DTU (High)\n5. **INC-012** — Conditional Access Policy Block (High)\n\nThe majority relate to identity and access management. I recommend escalating INC-001 and INC-008 to the Security Operations team for coordinated response.",
  "summarize today's incidents":
    "**Today's Incident Summary:**\n\n- **12 total incidents** — 3 critical, 4 high, 3 medium, 2 low\n- **3 incidents** are actively being worked (in-progress)\n- **2 incidents** resolved today\n- **Key pattern**: Multiple incidents relate to Azure AD / Entra ID authentication services\n- **Recommendation**: Schedule emergency review of identity infrastructure with Identity Operations team",
  "list high priority tickets":
    "**High Priority Tickets (Critical + High):**\n\n| ID | Title | Status |\n|---|---|---|\n| INC-001 | Azure AD Authentication Failures | Open |\n| INC-002 | VPN Gateway Connectivity Loss | In Progress |\n| INC-003 | SharePoint Online Slow Performance | Open |\n| INC-005 | MFA Push Notification Failures | In Progress |\n| INC-006 | Azure SQL Database High DTU | Open |\n| INC-008 | Defender Alert: Suspicious Sign-in | Open |\n| INC-012 | Conditional Access Policy Block | In Progress |\n\n**7 high-priority tickets** require attention. INC-008 (security alert) should be triaged first.",
  "what systems have the most issues?":
    "**Systems by Incident Count:**\n\n1. **Azure AD / Entra ID** — 3 incidents (INC-001, INC-005, INC-012)\n2. **Azure Infrastructure** — 2 incidents (INC-002, INC-006)\n3. **Microsoft 365** — 2 incidents (INC-003, INC-004)\n4. **Security** — 1 incident (INC-008)\n5. **Endpoint/DevOps** — 2 incidents (INC-009, INC-011)\n\n**Identity and Access Management** is the most impacted area with 3 active incidents.",
};

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Operations Copilot. I can help you analyze incidents, summarize operational data, and provide insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const key = userMsg.toLowerCase();
      const response =
        mockResponses[key] ||
        `I analyzed your query: "${userMsg}"\n\nBased on current operational data, I found relevant patterns in the incident management system. For a more detailed analysis, I would need to connect to your Azure OpenAI instance.\n\n*This is a demo response. In production, this would be powered by Azure OpenAI.*`;
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] animate-slide-in">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          AI Copilot
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered operational intelligence assistant
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-auto bg-card border border-border rounded-lg p-4 space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-lg px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse-glow text-primary" />
              Analyzing...
            </div>
          </div>
        )}
      </div>

      {/* Suggested queries */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQueries.map((q) => (
            <button
              key={q}
              onClick={() => {
                setInput(q);
              }}
              className="text-xs bg-secondary border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask about incidents, operations, or systems..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-secondary border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="bg-primary text-primary-foreground p-2.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
