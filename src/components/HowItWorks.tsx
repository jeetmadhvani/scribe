import { motion } from "framer-motion";
import { Pen, Sparkles, Upload } from "lucide-react";

const HowItWorks = () => {
    

    const cards = [
        {
            title: "Share your writing",
            content: "Paste in 3-5 samples of your existing content blog posts, tweets, emails, anything you've written before.",
            icon: <Upload size={20} />,
            delay: 0.2
        },
        {
            title: "Scribe learns your voice",
            content: "Our AI analyzes your tone, vocabulary, sentence structure and personality to build your unique voice profile.",
            icon: <Sparkles size={20} />,
            delay: 0.4
        },
        {
            title: "Generate in your style",
            content: "Give Scribe a topic or rough notes and get back content that genuinely sounds like you wrote it.",
            icon: <Pen size={20} />,
            delay: 0.6
        }
    ]

  return (
    <div className="px-40 w-full flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <p className="text-muted bg-subheading-bg text-sm rounded-full px-3 font-body py-1 w-fit font-medium">
          ✦ How it Works
        </p>
        <h3 className="text-primary font-heading text-5xl font-semibold">
          Three Steps to your Perfect Voice
        </h3>
      </div>
      <div className="flex gap-6">
        {cards.map((card, idx) => (
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: card.delay }}
            key={idx}
             className="relative flex flex-col gap-2">
                <div className="p-2 bg-subheading-bg rounded-xl w-fit text-muted">
                    {card.icon}
                </div>
                <div className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4">
                    <span className="absolute right-5 -top-1 font-medium text-accent text-7xl opacity-20 font-sans">{idx+1}</span>
                    <p className="text-primary text-lg font-body font-bold">{card.title}</p>
                    <span className="text-muted text-xl font-body font-medium">{card.content}</span>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
