import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-10 py-4 flex justify-between items-center bg-blue-400 backdrop-blur-md shadow-lg">
      
      {/* Left Logo */}
      <div className="left-nav flex items-center gap-3">
        <img
          className="h-24  w-24 rounded-full"
          src="logo.png"
          alt="Logo"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-white text-2xl font-bold tracking-wide font-mono">
          Keysy
        </h1>
        <p className="text-white text-1xl font-bold tracking-wide font-mono"> Smart security for modern life.</p>
        </div>
      </div>

      {/* Right Menu */}
      <div className="right-nav flex items-center gap-8 text-lg text-white font-medium">
        
        <a href="#" className="hover:text-cyan-300 transition">
          Home
        </a>

        <a href="#" className="hover:text-cyan-300 transition">
          Manager
        </a>

        <a href="#" className="hover:text-cyan-300 transition">
          About
        </a>

        <a href="#" className="hover:text-cyan-300 transition">
          Contact
        </a>

        {/* Button */}
        <button className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold shadow-md">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
