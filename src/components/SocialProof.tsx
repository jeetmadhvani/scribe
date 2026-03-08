import beehiiv from "/public/brand-logos/id-ptfOISf_logos.svg";
import mailchimp from "/public/brand-logos/id-GhpqWpt_1772563840271.svg";
import later from "/public/brand-logos/Logo (1).svg";
import patreon from "/public/brand-logos/idS6af1NE3_1772564616161.svg";
import buffer from "/public/brand-logos/id7kKj2o40_1772563893413.svg";
import kajabi from "/public/brand-logos/Logo (2).svg";
import hootsuite from "/public/brand-logos/idDwei_Bxl_logos.svg";
import teachable from "/public/brand-logos/idKiIjqOUb_1772564594833.svg";
import gumroad from "/public/brand-logos/idrI7kdZer_1772564079201.svg";
import medium from "/public/brand-logos/Logo.svg";
import { motion } from "framer-motion";

const SocialProof = () => {
  const logos = [
    { name: "beehiiv", src: beehiiv },
    { name: "mailchimp", src: mailchimp },
    { name: "later", src: later },
    { name: "patreon", src: patreon },
    { name: "buffer", src: buffer },
    { name: "kajabi", src: kajabi },
    { name: "hootsuite", src: hootsuite },
    { name: "teachable", src: teachable },
    { name: "gumroad", src: gumroad },
    { name: "medium", src: medium },
  ];

  return (
    <div className="h-full relative flex flex-col gap-8 w-full py-12 mt-10 justify-center items-center">
      <p className="text-light text-center font-body">
        trusted by leading teams
      </p>

        <div className="w-full overflow-x-hidden">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="marquee-track flex gap-16 items-center w-max"
        >
          {[...logos, ...logos].map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-7 w-auto object-contain opacity-50 grayscale"
            />
          ))}
        </motion.div>
        </div>


      <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-main-bg to-transparent z-10 pointer-events-non" />
      <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-main-bg to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default SocialProof;
