import { useState, useEffect, useRef } from "react";
import "./style/Chatbot.css";

const WHATSAPP_NUMBER = "923104047808";

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does a website cost?",
  "How long does a project take?",
  "Can you build a SaaS product?",
];

const GREETING = {
  role: "model",
  text: "Hi! I'm Qodex 👋, Qodexaa's AI assistant. I can answer questions about our services, process, and pricing. What can I help you with today?",
  id: 0,
};

function TypingIndicator() {
  return (
    <div className="cb-msg cb-msg--bot">
      <div className="cb-bubble cb-bubble--bot cb-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const msgIdRef = useRef(1);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!mounted) return null;

  const whatsappUrl = (context = "") => {
    const text = encodeURIComponent(
      context
        ? `Hi Qodexaa! I was chatting with your AI assistant about: "${context}". I'd like to discuss this further.`
        : "Hi Qodexaa! I'd like to discuss a project."
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setShowQuickReplies(false);

    const userMsg = { role: "user", text: userText, id: msgIdRef.current++ };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build history excluding the greeting and the current message
      const history = messages
        .filter(m => m.id !== 0)
        .map(m => ({ role: m.role === 'model' ? 'assistant' : m.role, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await res.json();
      const reply = data.reply || data.error || "Sorry, I couldn't get a response. Please try again.";

      setMessages(prev => [
        ...prev,
        { role: "model", text: reply, id: msgIdRef.current++, userQuery: userText },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "model", text: "Connection error. Please check your internet and try again.", id: msgIdRef.current++ },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      <div className={`cb-window ${open ? "cb-window--open" : ""}`} aria-hidden={!open}>
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar">
              <img src="/LOGO1.png" alt="Qodexaa" className="cb-avatar-logo" />
            </div>
            <div>
              <div className="cb-header-name">Qodex AI</div>
              <div className="cb-header-status">
                <span className="cb-online-dot" />
                Online
              </div>
            </div>
          </div>
          <button className="cb-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="cb-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`cb-msg ${msg.role === "user" ? "cb-msg--user" : "cb-msg--bot"}`}>
              <div className={`cb-bubble ${msg.role === "user" ? "cb-bubble--user" : "cb-bubble--bot"}`}>
                {msg.text}
              </div>
              {/* WhatsApp CTA after every bot response (except greeting) */}
              {msg.role === "model" && msg.id !== 0 && (
                <a
                  href={whatsappUrl(msg.userQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cb-wa-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Continue on WhatsApp
                </a>
              )}
            </div>
          ))}

          {loading && <TypingIndicator />}

          {/* Quick reply chips — shown only at start */}
          {showQuickReplies && !loading && (
            <div className="cb-quick-replies">
              {QUICK_REPLIES.map((q) => (
                <button key={q} className="cb-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="cb-input-row">
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Ask me anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            maxLength={500}
          />
          <button
            className="cb-send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Ask AI Button */}
      <button
        className="cb-trigger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close Qodex AI" : "Chat with Qodex AI"}
      >
        {open ? (
          <div className="cb-trigger-inner cb-trigger-inner--close">
            <span className="cb-trigger-close-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </span>
          </div>
        ) : (
          <div className="cb-trigger-inner">
            <img src="/LOGO1.png" alt="Qodexaa" className="cb-trigger-logo" />
            <span className="cb-trigger-text">Ask AI</span>
          </div>
        )}
      </button>
    </>
  );
}
