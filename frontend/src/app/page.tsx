'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 md:space-y-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass rounded-full">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EC4899]" />
              <span className="text-xs sm:text-sm text-slate-300 font-medium">AI-Powered Content Generation</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight px-4">
                <span className="gradient-text block">ContentPilot AI</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-100 px-4">
                Your AI Content Team
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
              Generate high-quality content in seconds with our intelligent AI agents.
              Research, plan, and create - all automated.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 pt-2 sm:pt-4">
              <Link href="/generate" className="w-full sm:w-auto max-w-xs">
                <button className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full">
                  Start Creating
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 pt-12 sm:pt-16 md:pt-20 max-w-3xl mx-auto w-full px-4">
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">3</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-400">AI Agents</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">10x</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-400">Faster</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">100%</div>
                <div className="text-xs sm:text-sm md:text-base text-slate-400">Quality</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
