import { ArrowUpRight } from "lucide-react";
const Navbar = () => {
  return (
    <div className="font-body flex justify-between w-full items-center py-6 px-12">
      <h1 className="font-heading text-primary text-4xl font-semibold">
        scribe
      </h1>
      <div className="text-muted text-lg font-light flex gap-12">
        <h1 className="hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
          Home
        </h1>
        <h1 className="hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
          Product
        </h1>
        <h1 className="hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
          Case Studies
        </h1>
        <h1 className="hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
          Support
        </h1>
      </div>
      <button
        className="relative flex bg-linear-to-t from-light-accent to-accent rounded-full gap-2 px-4 py-2 text-white text-lg items-center font-light overflow-hidden
      group hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <div
          className="left-0 h-full w-full bg-linear-to-t from-accent to-light-accent
         absolute opacity-0 group-hover:opacity-100 transition-all duration-400"
        ></div>
        <h1 className="z-50">Get Started</h1>
        <ArrowUpRight className="z-50" />
      </button>
    </div>
  );
};

export default Navbar;
