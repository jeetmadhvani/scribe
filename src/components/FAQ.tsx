import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What makes Scribe different from ChatGPT?",
    answer: "ChatGPT generates generic content for everyone. Scribe is trained specifically on your writing samples — so every output reflects your unique tone, vocabulary and style. Not anyone else's.",
  },
  {
    question: "How many writing samples do I need to get started?",
    answer: "Just 3-5 samples is enough to build your initial voice profile. The more content you add over time, the more accurate Scribe becomes.",
  },
  {
    question: "What types of content can Scribe generate?",
    answer: "LinkedIn posts, blog intros, tweet threads, email newsletters, product descriptions, bios, case studies and more. New content types are added every month.",
  },
  {
    question: "Is my writing data safe?",
    answer: "Absolutely. Your writing samples are encrypted, stored securely, and never shared with third parties or used to train any AI models.",
  },
  {
    question: "Can I use Scribe for my team or clients?",
    answer: "Yes — the Team plan lets you add up to 10 members and create shared voice profiles for consistent brand voice across your whole team.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, no contracts, no commitments. Cancel anytime directly from your dashboard in one click.",
  },
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-muted/50"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 px-2 text-left cursor-pointer group"
      >
        <span className="text-primary font-body font-medium text-xl group-hover:text-accent transition-colors duration-300">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent shrink-0 ml-4"
        >
          <Plus size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pr-60 pl-2"
          >
            <p className="text-muted font-body text-lg leading-relaxed pb-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <div className="px-40 flex flex-col gap-12 mb-20">
      <div className="flex flex-col gap-4">
        <p className="text-muted bg-subheading-bg text-sm rounded-full px-3 font-body py-1 w-fit font-medium">
          ✦ FAQ
        </p>
        <h2 className="text-primary font-heading text-5xl font-semibold">
          Questions? We've got answers.
        </h2>
      </div>

      <div className="flex flex-col">
        {faqs.map((faq, i) => (
          <FAQItem key={faq.question} faq={faq} index={i} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;