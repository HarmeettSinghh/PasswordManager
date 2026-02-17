import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Manager = () => {
  // Form State
  const [data, setData] = useState({
    sitename: "",
    username: "",
    password: "",
  });

  // Saved Passwords List
  const [passwords, setPasswords] = useState([]);
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        setPasswords(res.data)
      } catch (error) {
        console.log("Error Fetching Passwords", error)
      }
    };
    fetchPasswords();
  }, [])
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!data.sitename || !data.username || !data.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:3000/", {
        siteURL: data.sitename,
        userName: data.username,
        password: data.password,
      });
      toast.success("Password saved successfully!");

      const res = await axios.get("http://localhost:3000/");
      setPasswords(res.data);
      // Reset Form
      setData({
        sitename: "",
        username: "",
        password: "",
      });

    } catch (error) {
      console.log("Error saving password", error);
      toast.error("Failed to save password!")
    }

  };

  // Delete Password
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/", {
        data: { id: id },
      });
      toast.info("Entry Deleted!");


      const res = await axios.get("http://localhost:3000/");
      setPasswords(res.data);

    } catch (error) {
      console.log("Error Delelting passwords!");
      toast.error("Failed to delete")
    }
  }

  const handleCopy = (text)=>{
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!!")
  }
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      />

      {/* Card Container */}
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Password Manager
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="sitename"
            value={data.sitename}
            onChange={handleChange}
            placeholder="Enter Website Link"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Save Password
          </button>
        </form>

        {/* Table Section */}
        {passwords.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-cyan-500 text-white">
                  <th className="p-3 rounded-tl-xl">Site</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Password</th>
                  <th className="p-3 rounded-tr-xl">Actions</th>
                </tr>
              </thead>

              <tbody>
                {passwords.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-white/30 transition"
                  >
                    <td className="p-3">{item.siteURL}</td>
                    <td className="p-3" onClick={handleCopy}>{item.userName}</td>
                    <td className="p-3" onClick={handleCopy}>{item.password}</td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
