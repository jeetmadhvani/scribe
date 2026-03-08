import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLES = [
  "I've always believed that consistency beats motivation every single time. Motivation is a feeling. Consistency is a decision.",
  "Hot take: most people fail not because they lack talent, but because they quit three feet from the gold.",
  "shipped v1 of my app today. it's broken in 3 places. the ui looks rough. it's live anyway. done > perfect.",
];

const STATS = [
  { label: "Tone", value: 82, color: "#4F46E5" },
  { label: "Rhythm", value: 74, color: "#7C3AED" },
  { label: "Voice", value: 91, color: "#4F46E5" },
  { label: "Warmth", value: 67, color: "#7C3AED" },
];

const PROMPT = "Write a LinkedIn post about getting rejected from a job";

const OUTPUT = `got a rejection email for a job i actually wanted today.

spent 3 weeks prepping. four rounds of interviews.
convinced myself it was already mine.

then the "we went in a different direction" email hit.

sucks for about ten minutes.
then you realize they just saved you from a role
that was never really yours.

back to building. back to the keyboard i guess.`;

type Stage =
  | "sample-input"
  | "analyzing"
  | "sidebar-in"
  | "prompt-input"
  | "generating"
  | "pause";

const Cursor = ({ visible }: { visible: boolean }) => (
  <motion.span
    animate={{ opacity: visible ? [1, 0, 1] : 0 }}
    transition={{ duration: 0.8, repeat: Infinity }}
    style={{ color: "#4F46E5", fontWeight: 300 }}
  >|</motion.span>
);

// ─── Responsive wrapper — scales the 760px box to fit the screen ─────────────
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      // 760px is the design width, 32px padding on each side
      const available = window.innerWidth - 64;
      setScale(Math.min(1, available / 760));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function DemoBox() {
  const scale = useScale();

  const [stage, setStage] = useState<Stage>("sample-input");
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [completedSamples, setCompletedSamples] = useState<string[]>([]);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [analyzingLabel, setAnalyzingLabel] = useState("reading your voice...");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const addInterval = useCallback((id: ReturnType<typeof setInterval>) => {
    intervals.current.push(id);
    return id;
  }, []);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  }, []);

  const typeText = useCallback(
    (text: string, setter: (v: string) => void, speed: number, onDone: () => void) => {
      setter("");
      setIsTyping(true);
      let i = 0;
      const id = addInterval(
        setInterval(() => {
          if (i < text.length) {
            setter(text.slice(0, i + 1));
            i++;
          } else {
            clearInterval(id);
            setIsTyping(false);
            onDone();
          }
        }, speed)
      );
    },
    [addInterval]
  );

  const runSample = useCallback(
    (idx: number, done: string[]) => {
      schedule(() => {
        typeText(SAMPLES[idx], setCurrentInput, 20, () => {
          schedule(() => {
            const next = [...done, SAMPLES[idx]];
            setCompletedSamples(next);
            setCurrentInput("");
            if (idx < SAMPLES.length - 1) {
              schedule(() => runSample(idx + 1, next), 450);
            } else {
              schedule(() => setStage("analyzing"), 600);
            }
          }, 350);
        });
      }, 350);
    },
    [schedule, typeText]
  );

  useEffect(() => {
    schedule(() => runSample(0, []), 700);
    return clearAll;
  }, []);

  useEffect(() => {
    if (stage !== "analyzing") return;
    setAnalyzeProgress(0);
    const labels = [
      "reading your voice...",
      "mapping tone patterns...",
      "analyzing rhythm...",
      "building your profile...",
    ];
    let labelIdx = 0;
    setAnalyzingLabel(labels[0]);
    const labelId = addInterval(
      setInterval(() => {
        labelIdx = Math.min(labelIdx + 1, labels.length - 1);
        setAnalyzingLabel(labels[labelIdx]);
      }, 600)
    );
    let prog = 0;
    const progId = addInterval(
      setInterval(() => {
        prog += 1.6;
        setAnalyzeProgress(Math.min(prog, 100));
        if (prog >= 100) {
          clearInterval(progId);
          clearInterval(labelId);
          schedule(() => setStage("sidebar-in"), 300);
        }
      }, 28)
    );
  }, [stage]);

  useEffect(() => {
    if (stage !== "sidebar-in") return;
    setSidebarVisible(true);
    schedule(() => setStage("prompt-input"), 950);
  }, [stage]);

  useEffect(() => {
    if (stage !== "prompt-input") return;
    setPromptText("");
    schedule(() => {
      typeText(PROMPT, setPromptText, 34, () => {
        schedule(() => {
          setUserMessage(PROMPT);
          setOutputText("");
          setShowBadge(false);
          setStage("generating");
        }, 500);
      });
    }, 400);
  }, [stage]);

  useEffect(() => {
    if (stage !== "generating") return;
    schedule(() => {
      let i = 0;
      const id = addInterval(
        setInterval(() => {
          if (i < OUTPUT.length) {
            setOutputText(OUTPUT.slice(0, i + 1));
            i++;
          } else {
            clearInterval(id);
            schedule(() => setShowBadge(true), 350);
            schedule(() => setStage("pause"), 4200);
          }
        }, 15)
      );
    }, 800);
  }, [stage]);

  useEffect(() => {
    if (stage !== "pause") return;
    schedule(() => {
      clearAll();
      setCurrentInput("");
      setCompletedSamples([]);
      setAnalyzeProgress(0);
      setAnalyzingLabel("reading your voice...");
      setSidebarVisible(false);
      setPromptText("");
      setOutputText("");
      setShowBadge(false);
      setUserMessage("");
      setStage("sample-input");
      schedule(() => runSample(0, []), 600);
    }, 3500);
  }, [stage]);

  const isSampleStage = stage === "sample-input";
  const isAnalyzeStage = stage === "analyzing";
  const isPostAnalyze = ["sidebar-in", "prompt-input", "generating", "pause"].includes(stage);

  // The inner box is always 760×400 — we just scale the outer wrapper
  return (
    <div
      style={{
        width: `${760 * scale}px`,
        height: `${400 * scale}px`,
        flexShrink: 0,
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden select-none font-body"
        style={{
          width: "760px",
          height: "400px",
          background: "#EAE6FC",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <div className="absolute inset-0 flex">

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarVisible && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 190, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                style={{ overflow: "hidden", flexShrink: 0, padding: "14px 0 14px 14px" }}
              >
                <div style={{ width: "176px", height: "100%", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)", borderRadius: "14px", padding: "14px", boxShadow: "0 4px 20px rgba(79,70,229,0.10)", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#1A1A1A" }}>
                    scribe
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>
                      Your Samples
                    </span>
                    {SAMPLES.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        style={{ fontSize: "9px", color: "#6B7280", background: "#F5F3FF", borderRadius: "6px", padding: "4px 7px", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {s.slice(0, 54)}...
                      </motion.div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>
                      Voice Profile
                    </span>
                    {STATS.map((stat, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "8.5px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</span>
                          <span style={{ fontSize: "8.5px", color: "#4F46E5", fontFamily: "'DM Sans', sans-serif" }}>{stat.value}%</span>
                        </div>
                        <div style={{ height: "3px", background: "#E5E7EB", borderRadius: "99px", overflow: "hidden" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 + i * 0.08 }} style={{ height: "100%", background: stat.color, borderRadius: "99px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main area */}
          <div className="flex flex-col flex-1 relative" style={{ padding: "14px" }}>

            {/* SAMPLE INPUT */}
            <AnimatePresence>
              {isSampleStage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                  className="absolute inset-0 flex flex-col justify-center items-center"
                  style={{ padding: "20px 28px" }}
                >
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "7px", marginBottom: completedSamples.length > 0 ? "12px" : "0" }}>
                    <AnimatePresence>
                      {completedSamples.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 0.5, y: 0, scale: 1 }} transition={{ duration: 0.3 }} style={{ background: "rgba(255,255,255,0.55)", borderRadius: "10px", padding: "8px 13px", fontSize: "11px", color: "#4B5563", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
                          {s}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div style={{ position: "relative", width: "100%", background: "rgba(255,255,255,0.84)", borderRadius: "14px", padding: "12px 16px", boxShadow: "0 4px 24px rgba(79,70,229,0.13)", border: "1.5px solid rgba(79,70,229,0.22)", backdropFilter: "blur(8px)", minHeight: "46px", overflow: "hidden" }}>
                    {completedSamples.length === 0 && currentInput === "" && (
                      <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Paste a sample of your writing...</span>
                    )}
                    <span style={{ fontSize: "12px", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {currentInput}<Cursor visible={isTyping} />
                    </span>
                    {completedSamples.length > 0 && (
                      <div style={{ position: "absolute", top: "8px", right: "10px", fontSize: "9px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>
                        sample {completedSamples.length + 1} of {SAMPLES.length}
                      </div>
                    )}
                  </div>
                  {completedSamples.length === 0 && (
                    <p style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif", marginTop: "8px" }}>
                      Add 3–5 writing samples to build your voice profile
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ANALYZING */}
            <AnimatePresence>
              {isAnalyzeStage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-center items-center gap-6"
                >
                  <div style={{ position: "relative", width: "64px", height: "64px" }}>
                    <motion.div animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.12, 0.25] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", inset: "-14px", background: "radial-gradient(circle, #4F46E5, transparent 70%)", borderRadius: "50%" }} />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2.5px solid transparent", borderTopColor: "#4F46E5", borderRightColor: "#7C3AED" }} />
                    <div style={{ position: "absolute", inset: "9px", background: "rgba(255,255,255,0.92)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✦</div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p key={analyzingLabel} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }} style={{ fontSize: "13px", color: "#4F46E5", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                      {analyzingLabel}
                    </motion.p>
                  </AnimatePresence>
                  <div style={{ width: "200px", height: "4px", background: "rgba(255,255,255,0.5)", borderRadius: "99px", overflow: "hidden" }}>
                    <motion.div style={{ height: "100%", background: "linear-gradient(to right, #4F46E5, #7C3AED)", borderRadius: "99px", width: `${analyzeProgress}%` }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PROMPT + CHAT */}
            <AnimatePresence>
              {isPostAnalyze && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{ padding: "12px" }}
                >
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "8px", overflow: "hidden", marginBottom: "8px" }}>
                    <AnimatePresence>
                      {userMessage && (
                        <motion.div initial={{ opacity: 0, x: 16, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.3 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ background: "#4F46E5", color: "white", borderRadius: "14px 14px 4px 14px", padding: "8px 12px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", maxWidth: "76%", lineHeight: 1.5, display: "flex", alignItems: "center", gap: "7px" }}>
                            <span style={{ fontSize: "9px", background: "rgba(255,255,255,0.2)", borderRadius: "99px", padding: "1px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>LinkedIn Post</span>
                            {userMessage}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {stage === "generating" && !outputText && (
                        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: "4px", alignItems: "center", paddingLeft: "4px" }}>
                          {[0, 1, 2].map((i) => (
                            <motion.div key={i} animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4F46E5" }} />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {outputText && (
                        <motion.div initial={{ opacity: 0, x: -16, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.3 }} style={{ display: "flex", flexDirection: "column", gap: "5px", maxWidth: "80%" }}>
                          <AnimatePresence>
                            {showBadge && (
                              <motion.div initial={{ opacity: 0, scale: 0.75, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3, type: "spring", stiffness: 320 }} style={{ display: "inline-flex", alignSelf: "flex-start", background: "#4F46E5", color: "white", fontSize: "9px", fontWeight: 600, borderRadius: "99px", padding: "2px 9px", fontFamily: "'DM Sans', sans-serif" }}>
                                ✦ 97% voice match
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div style={{ background: "rgba(255,255,255,0.88)", borderRadius: "4px 14px 14px 14px", padding: "10px 13px", fontSize: "10.5px", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, whiteSpace: "pre-line", boxShadow: "0 2px 14px rgba(79,70,229,0.1)" }}>
                            {outputText}
                            {stage === "generating" && <Cursor visible={true} />}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Prompt input bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ position: "relative", background: "rgba(255,255,255,0.86)", borderRadius: "14px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(79,70,229,0.1)", border: "1.5px solid rgba(79,70,229,0.18)", backdropFilter: "blur(8px)", overflow: "hidden" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "#EEECFD", borderRadius: "8px", padding: "3px 8px", flexShrink: 0 }}>
                      <span style={{ fontSize: "10px", color: "#4F46E5", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>LinkedIn Post</span>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3L4 5L6 3" stroke="#4F46E5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ flex: 1, fontSize: "11px", color: promptText ? "#1A1A1A" : "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>
                      {promptText || "What do you want to write about?"}
                      {stage === "prompt-input" && <Cursor visible={isTyping} />}
                    </span>
                    <motion.div
                      animate={stage === "generating" && !outputText ? { scale: [1, 0.88, 1] } : {}}
                      transition={{ duration: 0.18 }}
                      style={{ width: "28px", height: "28px", background: promptText ? "#4F46E5" : "rgba(79,70,229,0.18)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.25s" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "80px",
            background: `linear-gradient(to top, #FAFAF8 0%, rgba(250,250,248,0.88) 8%, rgba(250,250,248,0.45) 38%, rgba(250,250,248,0.12) 82%, rgba(250,250,248,0) 100%)`,
          }}
        />
      </div>
    </div>
  );
}