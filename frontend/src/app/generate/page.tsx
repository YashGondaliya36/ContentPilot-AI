'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Sparkles, Loader2, Download, Mail, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { generateContent } from '@/lib/api';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

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

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2 mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Content Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Provide the details below and let our AI agents craft perfect content for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-10 items-start">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:sticky lg:top-24"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <FormItem label="Content Topics *" delay={0.1}>
                                    <Input
                                        placeholder="e.g. AI Trends, SEO Strategies"
                                        value={formData.content_topics}
                                        onChange={(e) => setFormData({ ...formData, content_topics: e.target.value })}
                                        required
                                        className="bg-background/50 border-white/10"
                                    />
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Comma Separated</p>
                                </FormItem>

                                <FormItem label="Business Goals *" delay={0.2}>
                                    <Input
                                        placeholder="e.g. Drive Traffic, Brand Awareness"
                                        value={formData.business_goals}
                                        onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                                        required
                                        className="bg-background/50 border-white/10"
                                    />
                                </FormItem>

                                <FormItem label="Target Audience *" delay={0.3}>
                                    <Input
                                        placeholder="e.g. SMB Owners, Tech Enthusiasts"
                                        value={formData.target_audience}
                                        onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                        required
                                        className="bg-background/50 border-white/10"
                                    />
                                </FormItem>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormItem label="Timeline *" delay={0.4}>
                                        <Input
                                            placeholder="e.g. 2 Weeks"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            required
                                            className="bg-background/50 border-white/10"
                                        />
                                    </FormItem>
                                    <FormItem label="Type *" delay={0.4}>
                                        <Input
                                            placeholder="e.g. Blog Post"
                                            value={formData.content_types}
                                            onChange={(e) => setFormData({ ...formData, content_types: e.target.value })}
                                            required
                                            className="bg-background/50 border-white/10"
                                        />
                                    </FormItem>
                                </div>

                                <FormItem label="Brand Voice *" delay={0.5}>
                                    <Input
                                        placeholder="e.g. Professional, Witty"
                                        value={formData.brand_voice}
                                        onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                                        required
                                        className="bg-background/50 border-white/10"
                                    />
                                </FormItem>

                                <FormItem label="Additional Notes" delay={0.6}>
                                    <Textarea
                                        placeholder="Specific keywords to include..."
                                        value={formData.additional_notes}
                                        onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                        className="bg-background/50 border-white/10 min-h-[100px]"
                                    />
                                </FormItem>

                                <div className="pt-4 border-t border-white/10">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.send_email}
                                            onChange={(e) => setFormData({ ...formData, send_email: e.target.checked })}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-indigo-500 transition-colors"
                                        />
                                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Email Results</span>
                                    </label>

                                    {formData.send_email && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="mt-4 space-y-4 overflow-hidden"
                                        >
                                            <Input
                                                type="email"
                                                placeholder="Recipient Email"
                                                value={formData.recipient_email}
                                                onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                                required
                                                className="bg-background/50 border-white/10"
                                            />
                                            <Input
                                                placeholder="Subject Line (Optional)"
                                                value={formData.email_subject}
                                                onChange={(e) => setFormData({ ...formData, email_subject: e.target.value })}
                                                className="bg-background/50 border-white/10"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                size="lg"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Agents...</>
                                ) : (
                                    <><Sparkles className="w-4 h-4 mr-2" /> Start Campaign</>
                                )}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold">Generation Failed</h3>
                                    <p className="text-sm opacity-90">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        {!result && !loading && (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-2xl bg-white/5">
                                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                                <p>Generated content will appear here</p>
                            </div>
                        )}

                        {loading && (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4 border border-white/10 rounded-2xl bg-white/5">
                                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                <div className="text-center space-y-1">
                                    <p className="text-white font-medium">Orchestrating AI Agents...</p>
                                    <p className="text-sm text-slate-400">Researching topics • Analyzing trends • Drafting content</p>
                                </div>
                            </div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card border border-white/10 rounded-2xl overflow-hidden"
                            >
                                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="font-medium">Success</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={handleDownload} className="text-slate-300 hover:text-white">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Markdown
                                    </Button>
                                </div>

                                {result.email_sent !== null && (
                                    <div className={`px-4 py-2 text-sm flex items-center gap-2 ${result.email_sent ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        <Mail className="w-4 h-4" />
                                        {result.email_sent ? 'Email delivered successfully' : 'Email delivery failed'}
                                    </div>
                                )}

                                <div className="p-6 prose prose-invert prose-slate max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {result.content}
                                    </ReactMarkdown>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
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
            className="space-y-2"
        >
            <Label className="text-slate-300 font-medium ml-1">{label}</Label>
            {children}
        </motion.div>
    );
}
