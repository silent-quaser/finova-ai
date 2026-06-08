import "./globals.css";

import { Inter } from "next/font/google";

import {
  Toaster,
} from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Finova AI",
  description:
    "AI-powered fintech platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      
      <body
        className={inter.className}
      >
        
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background:
                "rgba(15, 23, 42, 0.95)",
              color: "#fff",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(18px)",
              borderRadius:
                "18px",
              padding:
                "16px 18px",
            },

            success: {
              iconTheme: {
                primary:
                  "#06b6d4",
                secondary:
                  "#fff",
              },
            },

            error: {
              iconTheme: {
                primary:
                  "#ef4444",
                secondary:
                  "#fff",
              },
            },
          }}
        />

      </body>

    </html>
  );
}