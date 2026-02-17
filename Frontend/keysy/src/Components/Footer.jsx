import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-10 px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 
    bg-black/30 backdrop-blur-md shadow-lg">

      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <img
          className="h-14 w-14 rounded-full border border-white/40"
          src="logo.png"
          alt="Logo"
        />
        <h2 className="text-white text-xl font-semibold">
          Keysy
        </h2>
      </div>

      {/* Footer Text */}
      <div className="text-white text-sm md:text-lg font-medium text-center">
        <p className="hover:text-cyan-300 transition duration-300">
          Created by <span className="font-bold">Harmeet Singh</span> 
        </p>
        <p className="text-white/70 text-xs mt-1">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>

      {/* Links */}
      <div className="flex gap-5 text-white text-sm">
        <a href="#" className="hover:text-cyan-300 transition">
          Privacy
        </a>
        <a href="#" className="hover:text-cyan-300 transition">
          Terms
        </a>
        <a href="#" className="hover:text-cyan-300 transition">
          Contact
        </a>
      </div>

    </footer>
  );
};

export default Footer;
