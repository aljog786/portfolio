import { FaArrowUp } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="py-5 px-4 bg-card relative border-border bg-gray-800/60 backdrop-blur-md shadow-md flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        {"<ALJO/>"} &copy; {new Date().getFullYear()}
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <FaArrowUp size={20} />
      </a>
    </footer>
  );
};
