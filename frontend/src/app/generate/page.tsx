'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Sparkles, Loader2, Download, Mail, CheckCircle2, AlertCircle, Copy, RefreshCw, ChevronLeft, Zap, Search, PenTool, BarChart3 } from 'lucide-react';
import { generateContent } from '@/lib/api';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
    { icon: Search, text: "Scanning current trends..." },
    { icon: BarChart3, text: "Analyzing target audience..." },
    { icon: PenTool, text: "Crafting first draft..." },
    { icon: Sparkles, text: "Polishing and optimizing..." },
];

export default function GeneratePage() {
    const [formData, setFormData] = useState({
        content_topics: '',
        business_goals: '',
        target_audience: '',
        timeline: '',
        content_types: '',
        brand_voice: '',
        additional_notes: '',
        send_email: false,
        recipient_email: '',
        email_subject: '',
    });

    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    // Enhanced Loading Animation Logic
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
            }, 2000);
            return () => clearInterval(interval);
        } else {
            setLoadingStep(0);
        }
    }, [loading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const topics = formData.content_topics.split(',').map(t => t.trim()).filter(t => t);
            const payload = {
                content_topics: topics,
                business_goals: formData.business_goals,
                target_audience: formData.target_audience,
                timeline: formData.timeline,
                content_types: formData.content_types,
                brand_voice: formData.brand_voice,
                additional_notes: formData.additional_notes || undefined,
                send_email: formData.send_email,
                recipient_email: formData.send_email ? formData.recipient_email : undefined,
                email_subject: formData.send_email && formData.email_subject ? formData.email_subject : undefined,
            };
            const response = await generateContent(payload);
            setResult(response);
        } catch (err: any) {
            console.error(err);
            let errorMessage = 'Failed to generate content';
            if (err.response?.data?.detail) {
                if (typeof err.response.data.detail === 'string') {
                    errorMessage = err.response.data.detail;
                } else if (Array.isArray(err.response.data.detail)) {
                    errorMessage = err.response.data.detail.map((e: any) => e.msg).join(', ');
                } else if (typeof err.response.data.detail === 'object') {
                    errorMessage = JSON.stringify(err.response.data.detail);
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!result) return;
        const blob = new Blob([result.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `content-${Date.now()}.md`;
        a.click();
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetSelection = () => {
        setResult(null);
    };

    return (
        <main className="min-h-screen bg-[#020617] text-slate-100 pb-20 selection:bg-indigo-500/30 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-blob" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] animate-blob animation-delay-4000" />
            </div>

            <Navbar />

            <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex flex-col relative z-10">

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto w-full"
                        >
                            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Hub
                            </Link>

                            <div className="text-center mb-12 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-6">
                                        <Sparkles className="w-4 h-4" />
                                        Powered by Multi-Agent AI System
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-7xl font-bold tracking-tight"
                                >
                                    Turn Ideas Into <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
                                        Impactful Content
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                                >
                                    Stop staring at a blank page. Let our autonomous agents research, strategize, and write for you in seconds.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500"
                            >
                                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 text-lg font-semibold text-white border-b border-white/10 pb-4">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">1</div>
                                                Core Strategy
                                            </div>

                                            <FormItem label="What is the topic?" delay={0.1}>
                                                <Input
                                                    placeholder="e.g. Future of Remote Work, Sustainable Coffee"
                                                    value={formData.content_topics}
                                                    onChange={(e) => setFormData({ ...formData, content_topics: e.target.value })}
                                                    required
                                                    className="bg-black/40 border-white/10 h-14 text-lg focus:ring-indigo-500/50 transition-all hover:bg-black/60 focus:bg-black/80"
                                                />
                                            </FormItem>

                                            <FormItem label="Who is this for?" delay={0.2}>
                                                <Input
                                                    placeholder="e.g. HR Managers, Eco-conscious Millennials"
                                                    value={formData.target_audience}
                                                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                                    required
                                                    className="bg-black/40 border-white/10 h-12 hover:bg-black/60 focus:bg-black/80 transition-all"
                                                />
                                            </FormItem>

                                            <FormItem label="Key Goal" delay={0.2}>
                                                <Input
                                                    placeholder="e.g. Drive newsletter signups, Brand Awareness"
                                                    value={formData.business_goals}
                                                    onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                                                    required
                                                    className="bg-black/40 border-white/10 h-12 hover:bg-black/60 focus:bg-black/80 transition-all"
                                                />
                                            </FormItem>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 text-lg font-semibold text-white border-b border-white/10 pb-4">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">2</div>
                                                Style & Format
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormItem label="Format" delay={0.3}>
                                                    <Input
                                                        placeholder="e.g. Thread"
                                                        value={formData.content_types}
                                                        onChange={(e) => setFormData({ ...formData, content_types: e.target.value })}
                                                        required
                                                        className="bg-black/40 border-white/10 h-12 hover:bg-black/60 focus:bg-black/80 transition-all"
                                                    />
                                                </FormItem>
                                                <FormItem label="Timeline" delay={0.3}>
                                                    <Input
                                                        placeholder="e.g. 3 Posts"
                                                        value={formData.timeline}
                                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                        required
                                                        className="bg-black/40 border-white/10 h-12 hover:bg-black/60 focus:bg-black/80 transition-all"
                                                    />
                                                </FormItem>
                                            </div>

                                            <FormItem label="Tone of Voice" delay={0.3}>
                                                <Input
                                                    placeholder="e.g. Authoritative, Playful, Empathetic"
                                                    value={formData.brand_voice}
                                                    onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                                                    required
                                                    className="bg-black/40 border-white/10 h-12 hover:bg-black/60 focus:bg-black/80 transition-all"
                                                />
                                            </FormItem>

                                            <FormItem label="Extra Details" delay={0.4}>
                                                <Textarea
                                                    placeholder="Include specific keywords, calls to action, or constraints..."
                                                    value={formData.additional_notes}
                                                    onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                                    className="bg-black/40 border-white/10 min-h-[100px] hover:bg-black/60 focus:bg-black/80 transition-all resize-none"
                                                />
                                            </FormItem>
                                        </div>
                                    </div>

                                    {/* Advanced Options Toggle */}
                                    <div className="pt-6 border-t border-white/5">
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-colors">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.send_email}
                                                    onChange={(e) => setFormData({ ...formData, send_email: e.target.checked })}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-500 transition-all checked:border-indigo-500 checked:bg-indigo-500"
                                                />
                                                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="font-semibold text-slate-200">Email Delivery</span>
                                                <p className="text-sm text-slate-500">Send a copy of the results to your inbox</p>
                                            </div>
                                        </label>

                                        <AnimatePresence>
                                            {formData.send_email && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Input
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        value={formData.recipient_email}
                                                        onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                                        required
                                                        className="bg-black/40 border-white/10 h-12"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Action Area */}
                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-[100%_0] transition-all duration-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] py-8 text-xl font-bold rounded-2xl group"
                                        >
                                            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -ml-4 w-1/2" />
                                            {loading ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <Loader2 className="w-6 h-6 animate-spin" />
                                                        <span>{LOADING_STEPS[loadingStep].text}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[0, 1, 2, 3].map(i => (
                                                            <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-300 ${i === loadingStep ? 'bg-white' : 'bg-white/30'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <Zap className="w-6 h-6 fill-white" />
                                                    <span>Launch Campaign Generation</span>
                                                </div>
                                            )}
                                        </Button>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                                        >
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto w-full h-full"
                        >
                            {/* Result Header */}
                            <div className="flex items-center justify-between mb-8 sticky top-24 z-20 bg-[#020617]/80 backdrop-blur-md py-4 border-b border-white/5">
                                <Button variant="ghost" onClick={resetSelection} className="text-slate-400 hover:text-white gap-2 group">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    New Campaign
                                </Button>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleDownload} className="border-white/10 hover:bg-white/5 gap-2 transition-all hover:border-white/20">
                                        <Download className="w-4 h-4" /> Export MD
                                    </Button>
                                    <Button variant="secondary" onClick={handleCopy} className="gap-2 min-w-[120px] bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 border border-indigo-500/20">
                                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy Text'}
                                    </Button>
                                </div>
                            </div>

                            {/* Main Content Card */}
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl min-h-[60vh] flex flex-col">

                                    {/* Document Toolbar */}
                                    <div className="border-b border-white/5 bg-white/[0.02] p-4 flex items-center justify-between rounded-t-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                            </div>
                                            <div className="h-4 w-[1px] bg-white/10" />
                                            <span className="text-sm font-medium text-slate-400">Generated Content.md</span>
                                        </div>
                                        {result.email_sent && (
                                            <span className="text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> Email Sent
                                            </span>
                                        )}
                                    </div>

                                    {/* Document Content */}
                                    <div className="p-8 md:p-16">
                                        <div className="prose prose-invert prose-lg max-w-4xl mx-auto
                                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                                            prose-h1:text-5xl prose-h1:mb-12 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:bg-gradient-to-br prose-h1:from-white prose-h1:to-slate-400
                                            prose-h2:text-3xl prose-h2:text-indigo-300 prose-h2:mt-16 prose-h2:pb-6 prose-h2:border-b prose-h2:border-white/10
                                            prose-h3:text-xl prose-h3:text-purple-300 prose-h3:mt-8
                                            prose-p:leading-relaxed prose-p:text-slate-300 prose-p:mb-6
                                            prose-strong:text-white prose-strong:font-bold
                                            prose-ul:my-8 prose-li:text-slate-300 prose-li:marker:text-indigo-500 prose-li:mb-2
                                            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                                            prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-indigo-300 prose-code:border prose-code:border-white/10
                                            prose-hr:border-white/10 prose-hr:my-12
                                            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 hover:prose-a:underline
                                        ">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {result.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>

                                    {/* Footer Watermark */}
                                    <div className="absolute bottom-8 right-8 p-6 opacity-5 pointer-events-none select-none">
                                        <Sparkles className="w-32 h-32 text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

function FormItem({ label, children, delay }: { label: string, children: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="space-y-2 group"
        >
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold ml-1 group-hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2">
                {label}
                <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-indigo-500/20 transition-colors" />
            </Label>
            {children}
        </motion.div>
    );
}
