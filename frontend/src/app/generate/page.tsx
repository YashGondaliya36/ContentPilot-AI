'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Sparkles, Loader2, Download, Mail, CheckCircle2, AlertCircle, Copy, RefreshCw, ChevronLeft, Share2 } from 'lucide-react';
import { generateContent } from '@/lib/api';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

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
            setError(err.response?.data?.detail || err.message || 'Failed to generate content');
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

    // Render Logic
    return (
        <main className="min-h-screen bg-[#020617] text-slate-100 pb-20 selection:bg-indigo-500/30">
            <Navbar />

            <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex flex-col">

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back
                            </Link>

                            <div className="text-center mb-10 space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Create Magic Content
                                </h1>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                    Brief our AI agents on your goals, and we'll handle the strategy, researching, and writing.
                                </p>
                            </div>

                            <div className="bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                {/* Decorational Gradients */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -z-10" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -z-10" />

                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    {/* Primary Inputs */}
                                    <div className="space-y-6">
                                        <FormSection title="Campaign Basics">
                                            <FormItem label="Topic or Theme" delay={0.1}>
                                                <Input
                                                    placeholder="e.g. AI Trends, Coffee Shop Marketing"
                                                    value={formData.content_topics}
                                                    onChange={(e) => setFormData({ ...formData, content_topics: e.target.value })}
                                                    required
                                                    className="bg-black/20 border-white/10 h-12 text-lg focus:border-indigo-500/50 transition-colors"
                                                />
                                            </FormItem>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormItem label="Target Audience" delay={0.2}>
                                                    <Input
                                                        placeholder="e.g. SMB Owners"
                                                        value={formData.target_audience}
                                                        onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                                        required
                                                        className="bg-black/20 border-white/10 h-11"
                                                    />
                                                </FormItem>
                                                <FormItem label="Business Goal" delay={0.2}>
                                                    <Input
                                                        placeholder="e.g. Lead Generation"
                                                        value={formData.business_goals}
                                                        onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                                                        required
                                                        className="bg-black/20 border-white/10 h-11"
                                                    />
                                                </FormItem>
                                            </div>
                                        </FormSection>

                                        <FormSection title="Content Details">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormItem label="Brand Voice" delay={0.3}>
                                                    <Input
                                                        placeholder="e.g. Professional, Witty"
                                                        value={formData.brand_voice}
                                                        onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                                                        required
                                                        className="bg-black/20 border-white/10 h-11"
                                                    />
                                                </FormItem>
                                                <FormItem label="Platform / Type" delay={0.3}>
                                                    <Input
                                                        placeholder="e.g. LinkedIn Post, Blog"
                                                        value={formData.content_types}
                                                        onChange={(e) => setFormData({ ...formData, content_types: e.target.value })}
                                                        required
                                                        className="bg-black/20 border-white/10 h-11"
                                                    />
                                                </FormItem>
                                            </div>
                                            <FormItem label="Keywords / Notes" delay={0.4}>
                                                <Textarea
                                                    placeholder="Any specific keywords or context..."
                                                    value={formData.additional_notes}
                                                    onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                                    className="bg-black/20 border-white/10 min-h-[80px]"
                                                />
                                            </FormItem>
                                            <FormItem label="Timeline" delay={0.2}>
                                                <Input
                                                    placeholder="e.g. 2 Posts"
                                                    value={formData.timeline}
                                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                    required
                                                    className="bg-black/20 border-white/10 h-11"
                                                />
                                            </FormItem>
                                        </FormSection>

                                        {/* Delivery Options */}
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.send_email}
                                                    onChange={(e) => setFormData({ ...formData, send_email: e.target.checked })}
                                                    className="w-5 h-5 rounded border-white/20 bg-black/40 checked:bg-indigo-500 transition-colors accent-indigo-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-sm font-medium text-slate-200 block group-hover:text-white transition-colors">Email me the results</span>
                                                </div>
                                            </label>

                                            <AnimatePresence>
                                                {formData.send_email && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        className="overflow-hidden space-y-3"
                                                    >
                                                        <Input
                                                            type="email"
                                                            placeholder="your@email.com"
                                                            value={formData.recipient_email}
                                                            onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                                            required
                                                            className="bg-black/20 border-white/10"
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 py-7 text-lg rounded-xl font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-3">
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Deploying AI Agents...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="w-5 h-5 fill-white/20" />
                                                <span>Generate Campaign</span>
                                            </div>
                                        )}
                                    </Button>

                                    {loading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center text-sm text-slate-400"
                                        >
                                            Tip: This usually takes 30-60 seconds for deep research.
                                        </motion.div>
                                    )}

                                    {error && (
                                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-5xl mx-auto w-full h-full"
                        >
                            {/* Result Header */}
                            <div className="flex items-center justify-between mb-8">
                                <Button variant="ghost" onClick={resetSelection} className="text-slate-400 hover:text-white gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Edit Request
                                </Button>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleDownload} className="border-white/10 hover:bg-white/5 gap-2">
                                        <Download className="w-4 h-4" /> Export
                                    </Button>
                                    <Button variant="default" onClick={resetSelection} className="bg-indigo-600 hover:bg-indigo-500 gap-2">
                                        <RefreshCw className="w-4 h-4" /> New
                                    </Button>
                                    <Button variant="secondary" onClick={handleCopy} className="gap-2 min-w-[100px]">
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>

                            {/* Main Content Card */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                                <div className="relative bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden min-h-[60vh]">

                                    {/* Status Bar */}
                                    <div className="border-b border-white/5 bg-white/[0.02] p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            <span className="text-sm font-medium text-slate-300">Generation Complete</span>
                                        </div>
                                        {result.email_sent && (
                                            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                                                Email Sent Successfully
                                            </span>
                                        )}
                                    </div>

                                    {/* Document Content */}
                                    <div className="p-8 md:p-16 overflow-y-auto max-h-[80vh] custom-scrollbar">
                                        <div className="prose prose-invert prose-lg max-w-none mx-auto
                                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                                            prose-h1:text-4xl prose-h1:mb-8 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:bg-gradient-to-br prose-h1:from-white prose-h1:to-slate-400
                                            prose-h2:text-2xl prose-h2:text-indigo-300 prose-h2:mt-12 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                                            prose-h3:text-xl prose-h3:text-purple-300
                                            prose-p:leading-relaxed prose-p:text-slate-300
                                            prose-strong:text-white prose-strong:font-semibold
                                            prose-ul:my-6 prose-li:text-slate-300 prose-li:marker:text-indigo-500
                                            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                                            prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-indigo-300
                                        ">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {result.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>

                                    {/* Footer Watermark */}
                                    <div className="absolute bottom-0 right-0 p-6 opacity-10 pointer-events-none">
                                        <Sparkles className="w-24 h-24 text-white" />
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

function FormSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white/90 border-l-4 border-indigo-500 pl-3">{title}</h3>
            {children}
        </div>
    );
}

function FormItem({ label, children, delay }: { label: string, children: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="space-y-1.5"
        >
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-semibold ml-1">{label}</Label>
            {children}
        </motion.div>
    );
}
