"use client";

import Link from "next/link";

import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      
      <Navbar />

      <section className="relative pt-40 pb-28 px-6">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8">
                🚀 AI-Powered Finance Platform
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
                Smart Finance
                <span className="gradient-text block">
                  Powered by AI
                </span>
              </h1>

              <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-2xl">
                Track expenses, analyze spending habits, manage budgets, and receive AI-driven financial insights — all in one intelligent fintech platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                
                <Link href="/register">
                  <button className="finova-button px-8 py-4 rounded-2xl font-semibold text-lg">
                    Get Started
                  </button>
                </Link>

                <Link href="/dashboard">
                  <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 transition-all font-semibold text-lg">
                    View Dashboard
                  </button>
                </Link>

              </div>

            </div>

            <div className="relative">
              
              <div className="glass rounded-[32px] p-8">
                
                <div className="flex items-center justify-between mb-8">
                  
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Total Balance
                    </p>

                    <h2 className="text-5xl font-bold mt-2">
                      $24,580
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-3xl">
                    💳
                  </div>

                </div>

                <div className="space-y-5">
                  
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                    
                    <div>
                      <h3 className="font-semibold">
                        AI Savings Insight
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        Increase monthly savings by 12%
                      </p>
                    </div>

                    <span className="text-cyan-400 font-bold">
                      +12%
                    </span>

                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                    
                    <div>
                      <h3 className="font-semibold">
                        Monthly Expenses
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        Entertainment spending reduced
                      </p>
                    </div>

                    <span className="text-green-400 font-bold">
                      -18%
                    </span>

                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                    
                    <div>
                      <h3 className="font-semibold">
                        Budget Health
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        Financial stability improving
                      </p>
                    </div>

                    <span className="text-cyan-400 font-bold">
                      82/100
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="px-6 pb-28">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            
            <h2 className="text-5xl font-bold mb-6">
              Everything You Need
            </h2>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
              Finova AI combines intelligent analytics, AI recommendations, and modern financial management into one powerful platform.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            
            <div className="glass rounded-3xl p-8">
              
              <div className="text-5xl mb-6">
                📊
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Analytics
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                Visualize financial performance with intelligent charts and spending analysis.
              </p>

            </div>

            <div className="glass rounded-3xl p-8">
              
              <div className="text-5xl mb-6">
                🧠
              </div>

              <h3 className="text-2xl font-bold mb-4">
                AI Insights
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                Receive AI-generated financial recommendations and savings strategies.
              </p>

            </div>

            <div className="glass rounded-3xl p-8">
              
              <div className="text-5xl mb-6">
                💰
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Budgeting
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                Track spending limits and manage financial goals efficiently.
              </p>

            </div>

            <div className="glass rounded-3xl p-8">
              
              <div className="text-5xl mb-6">
                🔒
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Secure
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                JWT authentication and protected APIs ensure enterprise-grade security.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}