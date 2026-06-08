"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      <div>
        
        <div className="h-10 w-72 bg-white/10 rounded-xl mb-3" />

        <div className="h-5 w-96 bg-white/5 rounded-xl" />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="glass rounded-3xl p-8 h-40"
          >
            
            <div className="h-5 w-24 bg-white/10 rounded-lg mb-5" />

            <div className="h-10 w-40 bg-white/10 rounded-xl" />

          </div>
        ))}

      </div>

      <div className="glass rounded-3xl h-[350px]" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <div className="glass rounded-3xl h-[300px]" />

        <div className="glass rounded-3xl h-[300px]" />

      </div>

    </div>
  );
}