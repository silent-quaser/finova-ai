"use client";

import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  description,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02]"
    >
      <p className="text-zinc-400 text-sm mb-3">
        {title}
      </p>

      <h2 className="text-3xl font-bold mb-2">
        {value}
      </h2>

      <p className="text-zinc-500 text-sm">
        {description}
      </p>
    </motion.div>
  );
}