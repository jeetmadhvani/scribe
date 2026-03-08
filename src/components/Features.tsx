import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="px-40 min-h-[60vh] w-full flex flex-col gap-20 mb-20">
      <div className="flex flex-col gap-4">
        <p className="text-muted bg-subheading-bg text-sm rounded-full px-3 font-body py-1 w-fit font-medium">
          ✦ Features
        </p>
        <h3 className="text-primary font-heading text-5xl font-semibold">
          Everything you need to write like you
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 h-80 w-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 h-80 w-full"
          ></motion.div>
        </div>
        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 h-80 w-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 h-80 w-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="px-4 py-6 bg-card-bg rounded-2xl shadow-xl/4 h-80 w-full"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
