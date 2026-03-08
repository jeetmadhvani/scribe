import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Founder, Launchpad Studio",
      avatar: "AJ",
      avatarColor: "bg-orange-400",
      quote:
        "Scribe completely changed how I write LinkedIn content. It actually sounds like me — my team keeps asking if I wrote it myself.",
      delay: 0.2,
    },
    {
      name: "Priya Rajan",
      role: "Content Strategist, Growthly",
      avatar: "PR",
      avatarColor: "bg-purple-500",
      quote:
        "I was skeptical at first but after one week I was hooked. My newsletter open rates went up 34% because the writing finally felt authentic.",
      delay: 0.4,
    },
    {
      name: "Marcus Silva",
      role: "Indie Hacker & Blogger",
      avatar: "MS",
      avatarColor: "bg-green-500",
      quote:
        "Every other AI tool I tried made me sound like a robot. Scribe is the first one that actually gets my casual, no-BS writing style.",
      delay: 0.6,
    },
    {
      name: "Sara Kim",
      role: "Marketing Lead, Driftwave",
      avatar: "SK",
      avatarColor: "bg-indigo-500",
      quote:
        "We use Scribe across our entire content team now. Consistent brand voice across 5 writers — something we struggled with for years.",
      delay: 0.8,
    },
    {
      name: "Tom Nash",
      role: "YouTuber & Educator",
      avatar: "TN",
      avatarColor: "bg-pink-500",
      quote:
        "My script writing used to take 3 hours. Now it takes 20 minutes and honestly sounds better than before. Insane value.",
      delay: 1,
    },
    {
      name: "Rachel Lee",
      role: "Freelance Copywriter",
      avatar: "RL",
      avatarColor: "bg-teal-500",
      quote:
        "As a copywriter I was worried AI would replace me. Scribe actually makes me better — I use it to write faster in my clients' voices.",
      delay: 1.2,
    },
  ];

  return (
    <div className="pl-40 w-full flex flex-col gap-20 mb-20">
      <div className="flex gap-40">
        <div className="flex flex-col gap-4 min-w-50">
          <Quote
            className="rotate-180"
            fill="#6b7280"
            size={100}
            stroke="false"
            opacity={0.5}
          />
          <span className="font-heading text-3xl font-semibold text-muted">
            What creators worldwide are saying
          </span>
        </div>

        <div className="w-full overflow-x-hidden flex relative ">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className=" flex gap-4  marquee-track2 w-max "
          >
            {[...testimonials, ...testimonials].map((testimonial) => (
              <div className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 min-w-80 flex flex-col justify-between gap-4 ">
                <div className="flex items-center gap-3 ">
                  <div
                    className={`${testimonial.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-primary font-body font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-muted font-body text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="text-muted font-medium">
                  <p>{testimonial.quote}</p>
                </div>
                <p className="text-yellow-400 text-sm">★★★★★</p>
              </div>
            ))}
          </motion.div>
          <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-main-bg to-transparent z-10 pointer-events-non" />
      <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-main-bg to-transparent z-10 pointer-events-none" />
        </div>
      </div>
      
    </div>
  );
};

export default Testimonials;
