import React, { useState } from "react";
import axios from "axios";
import { LockKeyhole, Mail, UserPlus } from "lucide-react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use Vite environment variable for the API base URL
  // Fallback to localhost:5001 for local development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Updated to use dynamic API_BASE_URL
      await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        email,
        password,
      });
      alert(
        "Registration successful! Please log in with your new credentials.",
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="grid grid-rows-[100px_1fr_100px] w-screen h-screen overflow-hidden bg-[#FDFDFD] font-sans">
      <header className="bg-slate-800 flex items-center justify-center px-8 border-b border-slate-700">
        <div className="flex items-center justify-center w-full max-w-[1200px] text-white">
          <Header />
        </div>
      </header>

      <main className="bg-white flex items-center justify-center p-6">
        <section className="w-full max-w-[420px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center"
          >
            <div className="mb-6 p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <UserPlus size={32} />
            </div>

            <h1 className="text-3xl font-serif font-black tracking-tighter text-slate-900 uppercase mb-8 border-b-4 border-blue-600 pb-2 text-center">
              Create Account
            </h1>

            <div className="w-full space-y-4">
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                  size={18}
                />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative group">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                  size={18}
                />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full mt-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                type="submit"
              >
                Register Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </section>
      </main>

      <footer className="bg-slate-900 flex items-center justify-center border-t border-slate-800">
        <Footer />
      </footer>
    </div>
  );
}
