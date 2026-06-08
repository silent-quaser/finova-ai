export default function Input({
  label,
  type = "text",
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-all"
      />
    </div>
  );
}