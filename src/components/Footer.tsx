import { motion } from "framer-motion";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Blog", "Case Studies", "Documentation", "API"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-[#1a1a1a]">
      <div className="px-40 py-16 flex justify-between gap-20">

        {/* Left — logo + tagline + socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 max-w-xs"
        >
          <h2 className="font-heading text-white text-3xl font-semibold">
            scribe
          </h2>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            AI that writes in your voice, not its voice.
          </p>
          <div className="flex gap-4 mt-2">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <motion.button
                key={social}
                
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-light-accent transition-all duration-200 font-body text-sm cursor-pointer"
              >
                {social}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right — link columns */}
        <div className="flex gap-16">
          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (colIndex + 2) }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-white font-body font-semibold text-sm">
                {category}
              </h4>
              <div className="flex flex-col gap-3 ">
                {links.map((link, linkIndex) => (
                  <motion.a
                    key={link}
                    href="#"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * (colIndex + 2) + linkIndex * 0.05,
                    }}
                    className="text-gray-400 hover:text-light-accent transition-all duration-200 font-body text-sm cursor-pointer"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-40 py-6 border-t border-gray-800 flex justify-between items-center"
      >
        <p className="text-gray-600 font-body text-xs">
          © 2026 Scribe. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;