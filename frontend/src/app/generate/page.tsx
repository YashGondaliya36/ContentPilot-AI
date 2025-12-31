'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Send, Loader2, Download, Mail } from 'lucide-react';
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
            // Convert topics string to array
            const topics = formData.content_topics
                .split(',')
                .map(t => t.trim())
                .filter(t => t);

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
        <main className="min-h-screen w-full overflow-x-hidden bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Generate Content</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Fill in the details below and our AI agents will create high-quality content for you
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 md:p-10 space-y-6">
                    {/* Topics */}
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Content Topics <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="AI Writing, SEO Tips, Content Marketing (comma separated)"
                            value={formData.content_topics}
                            onChange={(e) => setFormData({ ...formData, content_topics: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Business Goals */}
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Business Goals <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Increase brand awareness and drive more bookings"
                            value={formData.business_goals}
                            onChange={(e) => setFormData({ ...formData, business_goals: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Target Audience <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Digital marketers and content creators aged 25-45"
                            value={formData.target_audience}
                            onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Grid for Timeline and Content Types */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Timeline <span className="text-accent">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Weekly for one month"
                                value={formData.timeline}
                                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Content Types <span className="text-accent">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Blog posts, Social media posts"
                                value={formData.content_types}
                                onChange={(e) => setFormData({ ...formData, content_types: e.target.value })}
                                className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Brand Voice */}
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Brand Voice <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Professional and informative"
                            value={formData.brand_voice}
                            onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-2">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Any specific requirements or preferences..."
                            value={formData.additional_notes}
                            onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                    </div>

                    {/* Email Toggle */}
                    <div className="border-t border-slate-700 pt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <input
                                type="checkbox"
                                id="send_email"
                                checked={formData.send_email}
                                onChange={(e) => setFormData({ ...formData, send_email: e.target.checked })}
                                className="w-5 h-5 rounded border-slate-700 bg-surface text-primary focus:ring-2 focus:ring-primary"
                            />
                            <label htmlFor="send_email" className="text-sm font-medium text-slate-200 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent" />
                                Auto-send via Email
                            </label>
                        </div>

                        {formData.send_email && (
                            <div className="space-y-4 ml-8">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Recipient Email <span className="text-accent">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required={formData.send_email}
                                        placeholder="client@example.com"
                                        value={formData.recipient_email}
                                        onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                        className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email Subject (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Custom Content Subject"
                                        value={formData.email_subject}
                                        onChange={(e) => setFormData({ ...formData, email_subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-surface border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Content...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Content
                            </>
                        )}
                    </button>
                </form>

                {/* Error */}
                {error && (
                    <div className="mt-6 glass-card p-4 border-l-4 border-red-500">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="mt-8 glass-card p-6 sm:p-8 md:p-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold gradient-text">Generated Content</h2>
                            <button
                                onClick={handleDownload}
                                className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>

                        {result.email_sent !== null && (
                            <div className={`p-4 rounded-lg border ${result.email_sent ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'}`}>
                                <p className={result.email_sent ? 'text-green-400' : 'text-red-400'}>
                                    {result.email_status}
                                </p>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none">
                            <pre className="bg-surface p-6 rounded-lg overflow-x-auto text-sm text-slate-300 whitespace-pre-wrap">
                                {result.content}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
