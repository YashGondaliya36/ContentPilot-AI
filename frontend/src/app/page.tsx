'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Zap, CheckCircle2 } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background overflow-hidden relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium text-indigo-300">New: AI Agent V2 is live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6"
          >
            Master Content Creation <br />
            <span className="text-indigo-500">with Autonomous Agents</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto mb-10"
          >
            ContentPilot deploys a team of specialized AI agents to research, write, and optimize
            your content 24/7. 10x your output without sacrificing quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/generate">
              <Button size="lg" variant="premium" className="group text-lg px-8 h-12 rounded-full">
                Start Generating
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12 rounded-full border-white/10 hover:bg-white/5">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-indigo-500" />}
              title="Autonomous Agents"
              description="Deploy specialized agents for research, drafting, and SEO optimization working in parallel."
              delay={0.1}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-purple-500" />}
              title="Lightning Fast"
              description="Generate comprehensive articles, blog posts, and reports in seconds, not hours."
              delay={0.2}
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-8 h-8 text-pink-500" />}
              title="Quality Assurance"
              description="Built-in fact checking and plagiarism detection ensures enterprise-grade content quality."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 hover:bg-indigo-500/10 transition-colors duration-500 w-full h-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
    >
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
