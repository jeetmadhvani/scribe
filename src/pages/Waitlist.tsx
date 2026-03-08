import { ArrowRight } from "lucide-react";
import DemoBox from "../waitlist/components/DemoBox";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
//   const [count, setCount] = useState<number | null>(null);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!emailRegex.test(email)) { setError("Please enter a valid email."); return; }

    setError("");
    setLoading(true);

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setError("You're already on the list!");
      } else {
        setError("Something went wrong. Try again.");
      }
      return;
    }

    setSubmitted(true);
  };

//   useEffect(() => {
//     const fetchCount = async () => {
//       const { count } = await supabase
//         .from("waitlist")
//         .select("*", { count: "exact", head: true });
//       setCount(count);
//     };
//     fetchCount();
//   }, []);

  return (
    <div className="relative min-h-screen w-full bg-main-bg flex flex-col overflow-clip">

      {/* Blobs */}
      <motion.div
        animate={{ y: [0, 5, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "600px", height: "600px" }}
        className="absolute -left-40 top-1/3 -translate-y-1/2 bg-accent blur-3xl opacity-[0.04] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "600px", height: "600px" }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 bg-accent blur-3xl opacity-[0.04] rounded-full pointer-events-none"
      />

      {/* Navbar */}
      <div className="py-6 px-8 md:px-12 font-heading text-primary text-3xl md:text-4xl font-semibold">
        scribe
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center w-full flex-1 justify-center px-4">

        {/* DemoBox scales itself via CSS transform */}
        <DemoBox />

        <div className="flex flex-col items-center gap-6 md:gap-8 -mt-2 z-10 w-full max-w-2xl">

          {/* Headline */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-primary font-heading font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-6xl leading-tight">
              Write more. Sound like you.
            </h1>
            <p className="text-muted font-body text-base md:text-lg max-w-xl px-2">
              AI that learns your voice and writes content that actually sounds
              like you, not like everyone else's AI.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-2 w-full items-center">
            {!submitted ? (
              <>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="youremail@gmail.com"
                    className={`bg-white rounded-3xl shadow-xl/4 flex-1 px-6 py-3 outline-none font-body text-primary transition-all duration-200 ${error ? "ring-2 ring-red-300" : "focus:ring-1 focus:ring-accent"}`}
                    type="email"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="disabled:opacity-70 disabled:cursor-not-allowed relative group hover:scale-105 transition-all duration-200 cursor-pointer flex bg-linear-to-t from-light-accent to-accent rounded-full gap-2 px-6 py-3 text-white text-base md:text-lg items-center justify-center font-light shadow-xl/6 overflow-hidden whitespace-nowrap"
                  >
                    <div className="left-0 h-full w-full bg-linear-to-t from-accent to-light-accent absolute opacity-0 group-hover:opacity-100 transition-all duration-400" />
                    <span className="z-50">{loading ? "Joining..." : "Join Waitlist"}</span>
                    {!loading && <ArrowRight className="z-50" size={18} />}
                  </button>
                </div>
                {error ? (
                  <p className="font-body text-sm text-red-400 px-2">{error}</p>
                ) : (
                  <p className="font-body text-sm text-muted px-2">
                    ✦ Early access. Free to join.
                  </p>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="font-body text-primary text-base font-medium">✦ You're on the list.</p>
                <p className="font-body text-muted text-sm text-center">
                  We'll email you at <span className="text-primary">{email}</span> when Scribe launches.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-gray-400 font-body text-xs">
          © 2026 Scribe. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Waitlist;