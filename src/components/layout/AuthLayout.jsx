export default function AuthLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          glass
          w-full
          max-w-md
          rounded-3xl
          p-8
        "
      >
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold gradient-text mb-3">
            {title}
          </h1>

          <p className="text-zinc-400">
            {subtitle}
          </p>

        </div>

        {children}

      </div>
    </main>
  );
}