export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      
      <div className="flex flex-col items-center gap-6">
        
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />

        <div className="text-center">
          
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Finova AI
          </h2>

          <p className="text-zinc-400">
            Loading your financial dashboard...
          </p>

        </div>

      </div>

    </div>
  );
}