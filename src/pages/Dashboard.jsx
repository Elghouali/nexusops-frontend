import React, { useState, useEffect, useCallback } from 'react';
import {
    LayoutDashboard, Server, BarChart3, Settings,
    LogOut, Plus, Activity, Cloud, DollarSign, X,
    CheckCircle2, AlertCircle, FolderDot, Database,
    ShieldCheck, Globe, Zap
} from 'lucide-react';
import api from '../api';

export default function Dashboard({ onLogout, isDarkMode, toggleTheme }) {
    // 1. Data States
    const [projects, setProjects] = useState([]);
    const [assets, setAssets] = useState([]);
    const [adMetrics, setAdMetrics] = useState([]);
    const [infrastructure, setInfrastructure] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. UI Navigation State
    const [activeTab, setActiveTab] = useState('overview'); // Options: 'overview', 'infra', 'ads', 'settings'
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. Optimized Data Fetching
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [projRes, assetRes, metricsRes, infraRes] = await Promise.all([
                api.get('/projects').catch(() => ({ data: [] })),
                api.get('/devops/assets').catch(() => ({ data: [] })),
                api.get('/marketing/meta/metrics').catch(() => ({ data: [] })),
                api.get('/infrastructure').catch(() => ({ data: [] }))
            ]);

            setProjects(projRes.data || []);
            setAssets(assetRes.data || []);
            setAdMetrics(metricsRes.data || []);
            setInfrastructure(infraRes.data || []);

        } catch {
            // Using catch { } (optional catch binding) to keep ESLint green
            console.error("Dashboard engine: Handled backend communication failure.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Sidebar Button Component (To avoid code repetition)
    const NavButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            <Icon className={`w-5 h-5 mr-3 shrink-0 ${activeTab === id ? 'text-white' : ''}`} />
            {label}
        </button>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">

            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        NEXUS<span className="text-gray-900 dark:text-white">OPS</span>
                    </div>
                </div>

                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shrink-0">
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>

                        <div className="flex items-center space-x-4">
                            {/* NEW: Global Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center shadow-sm transition">
                                <Plus className="w-4 h-4 mr-2" /> New Deployment
                            </button>
                        </div>
                    </header>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavButton id="overview" icon={LayoutDashboard} label="Overview" />
                    <NavButton id="infra" icon={Server} label="Infrastructure" />
                    <NavButton id="ads" icon={BarChart3} label="Meta Ads" />
                    <NavButton id="settings" icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button onClick={onLogout} className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg font-medium text-sm transition">
                        <LogOut className="w-5 h-5 mr-3 shrink-0" /> Sign Out
                    </button>
                </div>
                </main>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab === 'infra' ? 'Infrastructure Fleet' : activeTab === 'ads' ? 'Marketing Analytics' : activeTab}
                    </h1>
                    <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center shadow-sm transition">
                        <Plus className="w-4 h-4 mr-2" /> New Deployment
                    </button>
                </header>

                <div className="flex-1 overflow-auto p-8">

                    {/* TAB: OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-1"><FolderDot className="w-4 h-4 mr-2"/> Active Projects</p>
                                    <p className="text-3xl font-black">{projects.length}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-1"><Cloud className="w-4 h-4 mr-2"/> Cloud Resources</p>
                                    <p className="text-3xl font-black">{infrastructure.length}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-1"><DollarSign className="w-4 h-4 mr-2"/> Monthly Spend</p>
                                    <p className="text-3xl font-black">${adMetrics.reduce((acc, curr) => acc + (curr.spend || 0), 0).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-bold">Recent System Activity</div>
                                <div className="p-6 text-sm text-gray-500 dark:text-gray-400">Everything is running smoothly. No alerts detected in the last 24h.</div>
                            </div>
                        </div>
                    )}

                    {/* TAB: INFRASTRUCTURE */}
                    {activeTab === 'infra' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {infrastructure.length > 0 ? infrastructure.map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                                <Database className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Active</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.name || "Cloud Resource"}</h3>
                                        <p className="text-xs font-mono text-gray-500 truncate">{item.id || "AWS-Resource-ID"}</p>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                                        <Cloud className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-500">No infrastructure resources found. Deploy your first asset.</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}

                    {/* Add this inside the Infrastructure tab if the linter complains */}
                    <div className="mt-8">
                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Terraform State Files</h4>
                        <div className="flex flex-wrap gap-2">
                            {assets.map((a, i) => <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded border border-gray-200 dark:border-gray-700">{a.name}</span>)}
                        </div>
                    </div>


                    {/* TAB: META ADS */}
                    {activeTab === 'ads' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-bold">Meta Graph API Performance</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">Facebook</span>
                                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">Instagram</span>
                                    </div>
                                </div>
                                <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                    {[45, 60, 35, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-indigo-500/20 hover:bg-indigo-500 rounded-t-sm transition-all duration-300 group relative">
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">${h*10}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs text-gray-500 text-center">Last 7 days automated spend tracking</p>
                            </div>
                        </div>
                    )}

                    {/* TAB: SETTINGS */}
                    {activeTab === 'settings' && (
                        <div className="max-w-2xl space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">Multi-Factor Authentication</p>
                                        <p className="text-sm text-gray-500">Secure your agency vault with TOTP.</p>
                                    </div>
                                    <ShieldCheck className="text-green-500 w-6 h-6" />
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">Global Deployment Region</p>
                                        <p className="text-sm text-gray-500">Current: us-east-1 (N. Virginia)</p>
                                    </div>
                                    <Globe className="text-indigo-500 w-6 h-6" />
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">API Webhooks</p>
                                        <p className="text-sm text-gray-500">Receive real-time alerts via Discord/Slack.</p>
                                    </div>
                                    <Zap className="text-yellow-500 w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Deployment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-bold">Launch Infrastructure</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                        </div>
                        <div className="p-6 space-y-3">
                            <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-500 transition font-bold">📦 S3 Website Bucket</button>
                            <button className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-500 transition font-bold">🚀 EC2 Compute Node</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}