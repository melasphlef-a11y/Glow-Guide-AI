"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const askAI = async (q) => {
    const text = q || question;
    if (!text) return;
    setLoading(true);
    setAnswer("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const topics = [
    { label: "Acne & Breakouts", emoji: "🌿" },
    { label: "Dry Skin", emoji: "💧" },
    { label: "Dark Spots", emoji: "✨" },
    { label: "Anti-Aging", emoji: "🕊️" },
    { label: "Oily Skin", emoji: "🍋" },
    { label: "Sensitive Skin", emoji: "🌸" },
    { label: "Hair Care", emoji: "💫" },
    { label: "Makeup Tips", emoji: "💄" },
    { label: "Eye Concerns", emoji: "🌙" },
    { label: "Sun Damage", emoji: "☀️" },
    { label: "Uneven Texture", emoji: "🪷" },
    { label: "Redness", emoji: "🌺" },
  ];

  const raised = {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "6px",
    boxShadow: `
      0 1px 0 #000,
      0 4px 0 #111,
      0 6px 0 #0a0a0a,
      0 8px 16px rgba(0,0,0,0.8),
      inset 0 1px 0 rgba(255,255,255,0.06),
      inset 0 0 40px rgba(201,169,110,0.03)
    `,
  };

  const raisedActive = {
    background: "linear-gradient(145deg, #d4b06e, #a07840)",
    border: "1px solid #c9a96e",
    borderRadius: "6px",
    boxShadow: `
      0 1px 0 #6b5020,
      0 3px 0 #7a5c28,
      0 5px 0 #5a4418,
      0 7px 12px rgba(0,0,0,0.8),
      inset 0 1px 0 rgba(255,255,255,0.25),
      inset 0 0 20px rgba(255,220,150,0.1)
    `,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a1208 0%, #0d0d0d 60%)",
      fontFamily: "'Georgia', serif",
      color: "#f5efe8",
    }}>

      {/* Top Bar */}
      <div style={{
        borderBottom: "1px solid #222",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.65rem",
        letterSpacing: "3px",
        color: "#555",
        textTransform: "uppercase",
        background: "#0a0a0a",
        boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
      }}>
        <span>Est. 2025</span>
        <span style={{ color: "#c9a96e" }}>✦ AI-Powered Beauty Intelligence ✦</span>
        <span>Premium</span>
      </div>

      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "80px 24px 60px",
        borderBottom: "1px solid #1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <p style={{
          fontSize: "0.65rem",
          letterSpacing: "6px",
          color: "#c9a96e",
          textTransform: "uppercase",
          marginBottom: "24px",
          textShadow: "0 0 20px rgba(201,169,110,0.5)",
        }}>
          The Art of Beauty
        </p>

        {/* 3D Title */}
        <h1 style={{
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontWeight: "normal",
          margin: "0 0 20px 0",
          letterSpacing: "12px",
          textTransform: "uppercase",
          lineHeight: 1.1,
          color: "#f0e0c0",
          textShadow: `
            0 1px 0 #c9a96e,
            0 2px 0 #b8943a,
            0 3px 0 #a07830,
            0 4px 0 #886420,
            0 5px 0 #705010,
            0 6px 0 #583c00,
            0 8px 20px rgba(0,0,0,0.9),
            0 0 40px rgba(201,169,110,0.15)
          `,
        }}>
          Glow Guide
        </h1>

        <div style={{
          width: "80px",
          height: "1px",
          background: "linear-gradient(to right, transparent, #c9a96e, transparent)",
          margin: "0 auto 20px",
          boxShadow: "0 0 8px rgba(201,169,110,0.4)",
        }} />

        <p style={{
          color: "#666",
          fontSize: "0.75rem",
          letterSpacing: "5px",
          textTransform: "uppercase",
          margin: 0,
        }}>
          Personalized AI Beauty Consultation
        </p>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Section Label */}
        <p style={{
          textAlign: "center",
          color: "#c9a96e",
          fontSize: "0.65rem",
          letterSpacing: "5px",
          textTransform: "uppercase",
          marginBottom: "28px",
          textShadow: "0 0 12px rgba(201,169,110,0.3)",
        }}>
          Select Your Concern
        </p>

        {/* Topic Grid - Raised Boxes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
          gap: "14px",
          marginBottom: "56px",
        }}>
          {topics.map((topic) => {
            const isActive = activeCategory === topic.label;
            return (
              <button
                key={topic.label}
                onClick={() => {
                  setActiveCategory(topic.label);
                  askAI(`Give me expert-level, detailed beauty tips for: ${topic.label}`);
                }}
                style={{
                  ...(isActive ? raisedActive : raised),
                  color: isActive ? "#1a0f00" : "#c9b89a",
                  padding: "18px 12px",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                  lineHeight: "1.5",
                  transform: isActive ? "translateY(3px)" : "translateY(0)",
                  transition: "all 0.15s ease",
                  outline: "none",
                }}
              >
                <div style={{
                  fontSize: "1.4rem",
                  marginBottom: "8px",
                  filter: isActive ? "none" : "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                }}>
                  {topic.emoji}
                </div>
                <div style={{
                  textShadow: isActive
                    ? "none"
                    : "0 1px 3px rgba(0,0,0,0.9)",
                  fontWeight: isActive ? "bold" : "normal",
                }}>
                  {topic.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
          <span style={{
            color: "#c9a96e",
            fontSize: "0.65rem",
            letterSpacing: "4px",
            textShadow: "0 0 10px rgba(201,169,110,0.4)",
          }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
        </div>

        {/* Input Card - Raised */}
        <div style={{
          ...raised,
          padding: "36px",
          marginBottom: "20px",
        }}>
          <p style={{
            color: "#c9a96e",
            fontSize: "0.65rem",
            letterSpacing: "5px",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
            textShadow: "0 0 10px rgba(201,169,110,0.3)",
          }}>
            Your Question
          </p>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your skin concern in detail for a personalized recommendation..."
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #2a2a2a",
              outline: "none",
              resize: "none",
              fontSize: "1rem",
              color: "#f0e0c0",
              fontFamily: "Georgia, serif",
              lineHeight: "1.8",
              minHeight: "80px",
              background: "transparent",
              boxSizing: "border-box",
              paddingBottom: "16px",
              marginBottom: "20px",
            }}
            rows={3}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "2px" }}>
              AI-Powered Analysis
            </span>
            <button
              onClick={() => askAI("")}
              disabled={loading || !question}
              style={{
                ...(loading || !question ? raised : raisedActive),
                color: loading || !question ? "#444" : "#1a0f00",
                padding: "14px 36px",
                fontSize: "0.75rem",
                cursor: loading || !question ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: "3px",
                textTransform: "uppercase",
                transform: loading || !question ? "translateY(0)" : "translateY(0)",
                transition: "all 0.15s",
                outline: "none",
              }}
            >
              {loading ? "Analyzing..." : "Consult"}
            </button>
          </div>
        </div>

        {/* Answer Card */}
        {(answer || loading) && (
          <div style={{
            ...raised,
            padding: "40px",
            borderColor: "#c9a96e33",
            boxShadow: `
              0 1px 0 #000,
              0 4px 0 #111,
              0 6px 0 #0a0a0a,
              0 8px 24px rgba(0,0,0,0.8),
              inset 0 1px 0 rgba(201,169,110,0.1),
              inset 0 0 60px rgba(201,169,110,0.04),
              0 0 0 1px rgba(201,169,110,0.1)
            `,
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "28px",
              paddingBottom: "20px",
              borderBottom: "1px solid #222",
            }}>
              <p style={{
                margin: 0,
                color: "#c9a96e",
                fontSize: "0.65rem",
                letterSpacing: "5px",
                textTransform: "uppercase",
                textShadow: "0 0 10px rgba(201,169,110,0.4)",
              }}>
                Your Consultation
              </p>
              <div style={{
                width: "30px", height: "30px",
                border: "1px solid #c9a96e",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: "#c9a96e",
                boxShadow: "0 0 12px rgba(201,169,110,0.2), inset 0 0 8px rgba(201,169,110,0.05)",
              }}>✦</div>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "32px", color: "#555" }}>
                <div style={{
                  fontSize: "0.65rem",
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}>
                  ✦ &nbsp; Preparing your consultation &nbsp; ✦
                </div>
              </div>
            ) : (
              <p style={{
                color: "#c9b89a",
                lineHeight: "2",
                fontSize: "0.97rem",
                whiteSpace: "pre-wrap",
                margin: 0,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}>
                {answer}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "80px",
          paddingTop: "32px",
          borderTop: "1px solid #151515",
          color: "#2a2a2a",
          fontSize: "0.65rem",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}>
          <p style={{ margin: "0 0 6px 0", color: "#c9a96e55" }}>✦ Glow Guide ✦</p>
          <p style={{ margin: 0 }}>Beauty Intelligence Platform</p>
        </div>

      </div>
    </div>
  );
}
