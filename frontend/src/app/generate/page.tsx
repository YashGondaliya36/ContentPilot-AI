'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Sparkles, Loader2, Download, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateContent } from '@/lib/api';

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
        <main className="min-h-screen bg-background flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {/* Back Button - Top Left */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Home
                    </Link>
                </div>

                {/* Title - Centered */}
                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text">Generate Content</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary transition-all duration-300 border-2 border-transparent">
                            <label className="block text-sm font-semibold text-slate-200 mb-4">
                                Content Topics <span className="text-accent">*</span>
                            </label>
                            <input type="text" required placeholder="AI Writing, SEO Tips (comma separated)"
                                value={formData.content_topics}
                                onChange={(e) => setFormData({ ...formData, content_topics: e.target.value })}
                                className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-600 transition-all duration-300"
                            />
                            <p className="text-xs text-slate-500 mt-3">Separate with commas</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-1 hover:border-secondary transition-all duration-300 border-2 border-transparent">
                            <label className="block text-sm font-semibold text-slate-200 mb-4">
                                Business Goals <span className="text-accent">*</span>
                            </label>
                            <input type="text" required placeholder="Increase awareness"
                                value={formData.business_goals}
                                onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                                className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary hover:border-slate-600 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 hover:border-accent transition-all duration-300 border-2 border-transparent">
                            <label className="block text-sm font-semibold text-slate-200 mb-4">
                                Target Audience <span className="text-accent">*</span>
                            </label>
                            <input type="text" required placeholder="Digital marketers aged 25-45"
                                value={formData.target_audience}
                                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent hover:border-slate-600 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="glass-card p-8 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary transition-all duration-300 border-2 border-transparent">
                                <label className="block text-sm font-semibold text-slate-200 mb-4">
                                    Timeline <span className="text-accent">*</span>
                                </label>
                                <input type="text" required placeholder="Weekly"
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-600 transition-all duration-300"
                                />
                            </div>

                            <div className="glass-card p-8 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-1 hover:border-secondary transition-all duration-300 border-2 border-transparent">
                                <label className="block text-sm font-semibold text-slate-200 mb-4">
                                    Content Types <span className="text-accent">*</span>
                                </label>
                                <input type="text" required placeholder="Blog posts"
                                    value={formData.content_types}
                                    onChange={(e) => setFormData({ ...formData, content_types: e.target.value })}
                                    className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary hover:border-slate-600 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 hover:border-accent transition-all duration-300 border-2 border-transparent">
                            <label className="block text-sm font-semibold text-slate-200 mb-4">
                                Brand Voice <span className="text-accent">*</span>
                            </label>
                            <input type="text" required placeholder="Professional"
                                value={formData.brand_voice}
                                onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                                className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent hover:border-slate-600 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary transition-all duration-300 border-2 border-transparent">
                            <label className="block text-sm font-semibold text-slate-200 mb-4">
                                Additional Notes <span className="text-slate-500 font-normal">(Optional)</span>
                            </label>
                            <textarea rows={3} placeholder="Any requirements..."
                                value={formData.additional_notes}
                                onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                                className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-600 transition-all duration-300 resize-none"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div className="glass-card p-8 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 hover:border-accent transition-all duration-300 border-2 border-transparent">
                            <label className="flex items-start gap-4 cursor-pointer">
                                <input type="checkbox" checked={formData.send_email}
                                    onChange={(e) => setFormData({ ...formData, send_email: e.target.checked })}
                                    className="w-6 h-6 mt-0.5 rounded-lg border-2 border-slate-600 bg-surface text-primary focus:ring-2 focus:ring-primary"
                                />
                                <div>
                                    <span className="text-base font-semibold text-slate-200 block">📧 Auto-send via email</span>
                                    <span className="text-sm text-slate-500 mt-1 block">Send with HTML formatting</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {formData.send_email && (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <div className="glass-card p-8 border-l-4 border-primary hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                                    <label className="block text-sm font-semibold text-slate-200 mb-4">
                                        Recipient Email <span className="text-accent">*</span>
                                    </label>
                                    <input type="email" required placeholder="client@example.com"
                                        value={formData.recipient_email}
                                        onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                        className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-600 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <div className="glass-card p-8 border-l-4 border-primary hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                                    <label className="block text-sm font-semibold text-slate-200 mb-4">
                                        Email Subject <span className="text-slate-500 font-normal">(Optional)</span>
                                    </label>
                                    <input type="text" placeholder="Custom Subject"
                                        value={formData.email_subject}
                                        onChange={(e) => setFormData({ ...formData, email_subject: e.target.value })}
                                        className="w-full px-5 py-4 bg-surface/80 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-slate-600 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" disabled={loading}
                        className="btn-primary w-full py-5 text-xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
                        {loading ? (<><Loader2 className="w-6 h-6 animate-spin" />Generating...</>) : (<><Sparkles className="w-6 h-6" />Generate Content</>)}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 glass-card p-6 border-l-4 border-red-500">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <div>
                                <h3 className="font-semibold text-red-400">Error</h3>
                                <p className="text-slate-300 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="mt-8 glass-card p-8 space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                                <h2 className="text-2xl font-bold gradient-text">Generated Content</h2>
                            </div>
                            <button onClick={handleDownload} className="btn-secondary flex items-center gap-2 px-4 py-2">
                                <Download className="w-4 h-4" />Download
                            </button>
                        </div>

                        {result.email_sent !== null && (
                            <div className={`p-4 rounded-lg border ${result.email_sent ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'}`}>
                                <div className="flex gap-3">
                                    <Mail className={`w-5 h-5 ${result.email_sent ? 'text-green-400' : 'text-red-400'}`} />
                                    <div>
                                        <p className={`font-semibold ${result.email_sent ? 'text-green-400' : 'text-red-400'}`}>
                                            {result.email_sent ? '✓ Email Sent' : '✗ Email Failed'}
                                        </p>
                                        <p className="text-sm text-slate-300 mt-1">{result.email_status}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-headings:gradient-text prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:underline prose-strong:text-slate-100 prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:marker:text-primary prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface prose-pre:border prose-pre:border-slate-700 prose-blockquote:border-l-primary prose-blockquote:text-slate-400">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.content}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
