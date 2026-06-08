"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Loader from "../ui/Loader";

export default function ProtectedRoute({
  children,
}) {
  const router =
    useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      router.push("/login");

      return;
    }

    setAuthorized(true);

    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  if (!authorized) {
    return null;
  }

  return children;
}