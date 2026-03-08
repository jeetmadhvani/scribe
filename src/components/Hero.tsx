import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    label: "LinkedIn Post",
    labelColor: "bg-indigo-600",
    content:
      "Excited to share that after 3 months of building in public, we just hit 1,000 users. Here's what I learned...",
    match: "✦ 97% voice match",
    floatY: [0, -10, 0],
    floatDuration: 3,
    entranceDelay: 0.6,
    floatDelay: 1.2,
  },
  {
    label: "Blog Post",
    labelColor: "bg-purple-600",
    content:
      "I've always believed that great writing isn't about sounding smart. It's about sounding real and human.",
    match: "✦ 94% voice match",
    floatY: [0, -8, 0],
    floatDuration: 3.5,
    entranceDelay: 0.8,
    floatDelay: 1.4,
  },
  {
    label: "X Post",
    labelColor: "bg-pink-500",
    content:
      "hot take: most AI content fails because it sounds like everyone else. your voice is your moat.",
    match: "✦ 99% voice match",
    floatY: [0, -12, 0],
    floatDuration: 4,
    entranceDelay: 1.0,
    floatDelay: 1.6,
  },
];

const Hero = () => {
  return (
    <div className="min-h-[20vw] w-full flex mt-10 px-40 items-start">
      <div className="flex flex-col flex-1 gap-2 z-10 justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted font-body text-sm"
        >
          ✦ Trusted by 12,000+ creators
        </motion.p>

        <div className="flex flex-col flex-1 gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary font-heading text-8xl w-2xl font-semibold"
          >
            Write more. <br /> Sound like you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted font-body text-lg"
          >
            Scribe learns your tone, your style, and your voice then writes
            content that actually sounds like you wrote it. Not a robot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3"
          >
            {/* Primary button */}
            <button className="relative group hover:scale-105 transition-all duration-200 cursor-pointer flex bg-linear-to-t from-light-accent to-accent rounded-full gap-2 px-4 py-2 text-white text-lg items-center font-light shadow-xl/6 overflow-hidden">
              <div className="left-0 h-full w-full bg-linear-to-t from-accent to-light-accent absolute opacity-0 group-hover:opacity-100 transition-all duration-400" />
              <span className="z-50">Start Writing</span>
              <ArrowUpRight className="z-50" />
            </button>

            {/* Secondary button — outlined */}
            <button className="relative group hover:scale-105 transition-all duration-200 cursor-pointer flex bg-linear-to-t from-light-accent to-accent rounded-full gap-2 px-4 py-2 text-white text-lg items-center font-light shadow-xl/6 overflow-hidden">
              <div className="left-0 h-full w-full bg-linear-to-t from-accent to-light-accent absolute opacity-0 group-hover:opacity-100 transition-all duration-400" />
              <span className="z-50">See How It Works</span>
              <ArrowUpRight className="z-50" />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center items-center z-20">
        {cards.map((card) => (

          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: card.entranceDelay }}
          >

            <motion.div
              animate={{ y: card.floatY }}
              transition={{
                duration: card.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.floatDelay,
              }}
              className="flex flex-col gap-2 bg-white rounded-2xl px-6 py-3 max-w-sm shadow-card"
            >
              <div
                className={`${card.labelColor} text-white px-3 py-1 rounded-full w-fit text-xs`}
              >
                <span>{card.label}</span>
              </div>
              <p className="text-muted font-body font-semibold text-sm">
                {card.content}
              </p>
              <p className="text-xs text-indigo-600 font-light">{card.match}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div 
  animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  className="absolute right-0 top-1/2 -translate-y-1/2 bg-accent blur-3xl w-150 opacity-15 h-150 rounded-full -z-10"
/>
    </div>
  );
};

export default Hero;
