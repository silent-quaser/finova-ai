export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div>
          <h2 className="text-2xl font-bold gradient-text">
            Finova AI
          </h2>

          <p className="text-zinc-500 text-sm mt-2">
            AI-powered fintech SaaS platform
          </p>
        </div>

        <div className="text-zinc-500 text-sm text-center md:text-right">
          
          <p>
            Built with Next.js, MongoDB & AI
          </p>

          <p className="mt-1">
            © 2026 Finova AI
          </p>

        </div>

      </div>

    </footer>
  );
}