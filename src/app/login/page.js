"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import toast from "react-hot-toast";

import api from "../../services/api";

export default function LoginPage() {
  const router =
    useRouter();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success(
        "Login successful"
      );

      router.push(
        "/dashboard"
      );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
      
      <div className="glass w-full max-w-md rounded-[32px] p-10">
        
        <div className="mb-8 text-center">
          
          <h1 className="text-5xl font-bold mb-3">
            
            <span className="gradient-text">
              Finova AI
            </span>

          </h1>

          <p className="text-zinc-400">
            AI-powered fintech platform
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          <div>
            
            <label className="block mb-3 text-zinc-400">
              Email
            </label>

            <input
              type="email"
              required
              value={
                formData.email
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10"
              placeholder="Enter email"
            />

          </div>

          <div>
            
            <label className="block mb-3 text-zinc-400">
              Password
            </label>

            <input
              type="password"
              required
              value={
                formData.password
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full glass rounded-2xl px-5 py-4 outline-none border border-white/10"
              placeholder="Enter password"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="finova-button w-full py-4 rounded-2xl font-semibold disabled:opacity-50"
          >
            
            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        <p className="text-center text-zinc-400 mt-8">
          
          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}