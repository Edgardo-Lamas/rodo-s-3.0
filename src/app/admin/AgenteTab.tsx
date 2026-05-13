"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Send, BarChart2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string; display?: string };

function MarkdownLine({ line }: { line: string }) {
  if (line.startsWith("## "))
    return <p style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB", margin: "14px 0 5px" }}>{line.slice(3)}</p>;
  if (line.startsWith("**") && line.endsWith("**"))
    return <p style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB", margin: "3px 0" }}>{line.slice(2, -2)}</p>;
  if (line.startsWith("- "))
    return <p style={{ fontSize: 13, color: "#9CA3AF", margin: "2px 0", paddingLeft: 12, borderLeft: "2px solid #2C2C2E" }}>{line.slice(2)}</p>;
  if (line.trim() === "")
    return <div style={{ height: 4 }} />;
  return <p style={{ fontSize: 13, color: "#D1D5DB", margin: "2px 0", lineHeight: 1.65 }}>{line}</p>;
}

function BubbleAssistant({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#1C1C1E", border: "1px solid #2C2C2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Sparkles size={13} color="#e8820a" />
      </div>
      <div style={{ flex: 1, background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: "4px 12px 12px 12px", padding: "12px 16px", maxWidth: "85%" }}>
        {content
          ? content.split("\n").map((line, i) => <MarkdownLine key={i} line={line} />)
          : <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>…</p>
        }
        {streaming && (
          <span style={{ display: "inline-block", width: 7, height: 13, background: "#e8820a", borderRadius: 1, animation: "blink 0.8s step-end infinite", marginLeft: 2, verticalAlign: "middle" }} />
        )}
      </div>
    </div>
  );
}

function BubbleUser({ content }: { content: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ background: "#e8820a", borderRadius: "12px 4px 12px 12px", padding: "10px 14px", maxWidth: "75%" }}>
        <p style={{ fontSize: 13, color: "#fff", margin: 0, lineHeight: 1.5 }}>{content}</p>
      </div>
    </div>
  );
}

function EmptyState({ onAnalisis }: { onAnalisis: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: 32 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1C1C1E", border: "1px solid #2C2C2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Sparkles size={20} color="#e8820a" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#E5E7EB", margin: "0 0 6px" }}>Agente de estrategia</p>
        <p style={{ fontSize: 12, color: "#4B5563", margin: 0, maxWidth: 300 }}>Preguntá lo que quieras sobre el negocio, o pedí un análisis completo de los datos del sitio.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 340 }}>
        {[
          { icon: <BarChart2 size={13} />, label: "Analizar datos del sitio", fn: onAnalisis },
        ].map(({ icon, label, fn }) => (
          <button key={label} onClick={fn}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, border: "1px solid #2C2C2E", background: "#1C1C1E", color: "#D1D5DB", fontSize: 12, cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: "#e8820a" }}>{icon}</span>{label}
          </button>
        ))}
        <p style={{ fontSize: 11, color: "#374151", margin: "4px 0 0", textAlign: "center" }}>
          O escribí tu pregunta abajo — ¿qué precio cobro? ¿qué publicar esta semana?
        </p>
      </div>
    </div>
  );
}

export default function AgenteTab() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef  = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async (texto: string, displayText?: string) => {
    if (streaming || !texto.trim()) return;

    const userDisplay = displayText ?? texto;
    const historialParaAPI = messages.map((m) => ({
      role: m.role,
      content: m.role === "user" && m.content === "__analisis__"
        ? "(análisis de negocio solicitado)"
        : m.content,
    }));

    setMessages((prev) => [
      ...prev,
      { role: "user", content: texto, display: userDisplay },
      { role: "assistant", content: "" },
    ]);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/admin/agente", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mensaje: texto, historial: historialParaAPI }),
        signal:  controller.signal,
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "Error al conectar con el agente. Verificá la API key de Anthropic." };
          return updated;
        });
        return;
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let texto_acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        texto_acc += decoder.decode(value, { stream: true });
        const snap = texto_acc;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: snap };
          return updated;
        });
      }
    } catch (err: unknown) {
      if ((err as { name?: string }).name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "Error de conexión. Intentá de nuevo." };
          return updated;
        });
      }
    } finally {
      setStreaming(false);
    }
  }, [messages, streaming]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function triggerAnalisis() {
    send("__analisis__", "📊 Analizá los datos del sitio");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 480, background: "#111113", borderRadius: 8, border: "1px solid #2C2C2E", overflow: "hidden" }}>

      {/* Mensajes */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.length === 0
          ? <EmptyState onAnalisis={triggerAnalisis} />
          : messages.map((m, i) =>
              m.role === "user"
                ? <BubbleUser key={i} content={m.display ?? m.content} />
                : <BubbleAssistant key={i} content={m.content} streaming={streaming && i === messages.length - 1} />
            )
        }
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ borderTop: "1px solid #2C2C2E", padding: "12px 14px", display: "flex", gap: 8, alignItems: "flex-end", background: "#161618" }}>
        <button
          onClick={triggerAnalisis}
          disabled={streaming}
          title="Analizar datos del sitio"
          style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 6, border: "1px solid #2C2C2E", background: "#1C1C1E", display: "flex", alignItems: "center", justifyContent: "center", cursor: streaming ? "not-allowed" : "pointer", opacity: streaming ? 0.5 : 1 }}
        >
          <BarChart2 size={15} color="#e8820a" />
        </button>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          placeholder="Preguntá algo… (Enter para enviar)"
          rows={1}
          style={{ flex: 1, background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 6, padding: "8px 12px", color: "#E5E7EB", fontSize: 13, resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 120, overflowY: "auto", fontFamily: "inherit" }}
        />

        <button
          onClick={() => send(input)}
          disabled={streaming || !input.trim()}
          style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 6, border: "none", background: input.trim() && !streaming ? "#e8820a" : "#2C2C2E", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !streaming ? "pointer" : "not-allowed", transition: "background 0.2s" }}
        >
          <Send size={15} color={input.trim() && !streaming ? "#fff" : "#4B5563"} />
        </button>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        textarea::placeholder { color: #374151; }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #2C2C2E; border-radius: 2px; }
      `}</style>
    </div>
  );
}
