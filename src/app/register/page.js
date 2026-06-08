"use client";

import { useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

import AuthLayout from "../../components/layout/AuthLayout";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all fields");

      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {
      const data = await registerUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      toast.success(
        "Account created successfully"
      );

      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your AI-powered finance journey"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full"
        >
          Create Account
        </Button>

        <p className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}