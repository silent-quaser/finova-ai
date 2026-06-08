export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        glass
        rounded-3xl
        p-6
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:border-cyan-400/20
        formatCurrency(className}
      `}
    >
      {children}
    </div>
  );
}