export default function Button({
  children,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`
        finova-button
        px-6
        py-3
        rounded-xl
        font-semibold
        text-white
        transition-all
        duration-300
        cursor-pointer
        formatCurrency(className}
      `}
    >
      {children}
    </button>
  );
}