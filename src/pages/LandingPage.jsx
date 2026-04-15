import React, { useState, useEffect } from 'react';
import {
    Sun, Moon, Cloud, TrendingUp, Activity,
    Lock, Settings, Database, Shield, Check, Star
} from 'lucide-react';

export default function LandingPage({ onLoginClick }) {
    // 1. Initialize state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('nexusops-theme');
            if (savedTheme === 'dark') return true;
            if (savedTheme === 'light') return false;
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // 2. NEW: Force the class onto the <html> tag every time the state changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('nexusops-theme', !isDarkMode ? 'dark' : 'light');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBookDemo = () => {
        alert("In production, this will open a Calendly scheduler for your agency!");
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">

                {/* Navigation Bar */}
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        NEXUS<span className="text-gray-900 dark:text-white">OPS</span>
                    </div>
                    <div className="space-x-6 flex items-center">
                        <div className="hidden md:flex space-x-6 items-center">
                            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">How it Works</button>
                            <button onClick={() => scrollToSection('architecture')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Architecture</button>
                            <button onClick={() => scrollToSection('pricing')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing</button>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            aria-label="Toggle Dark Mode"
                        >
                            {/* UPGRADED: Sun and Moon Icons */}
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={onLoginClick}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-md transition transform hover:-translate-y-0.5 text-sm"
                        >
                            Client Login
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-6 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-indigo-100 dark:border-indigo-800">
                        <Activity className="w-4 h-4 mr-2" /> The Ultimate B2B Agency Operating System
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Ship Infrastructure. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
              Track Marketing Spend.
            </span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                        Stop jumping between AWS consoles and Facebook Ad managers. NexusOps unifies your cloud fleet deployment and digital marketing analytics into one single, powerful dashboard.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onLoginClick}
                            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 shadow-xl transition transform hover:scale-105"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={handleBookDemo}
                            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Book a Demo
                        </button>
                    </div>
                </section>

                {/* Premium Integration Marquee */}
                <section className="py-10 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black overflow-hidden">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">
                            Engineered to orchestrate the modern stack
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition duration-500">
                            <div className="text-2xl font-black text-gray-800 dark:text-white">aws</div>
                            <div className="text-2xl font-black text-gray-800 dark:text-white">Terraform</div>
                            <div className="text-2xl font-black text-gray-800 dark:text-white">Docker</div>
                            <div className="text-2xl font-black text-gray-800 dark:text-white">Meta <span className="font-light text-sm">Graph API</span></div>
                            <div className="text-2xl font-black text-gray-800 dark:text-white">PostgreSQL</div>
                        </div>
                    </div>
                </section>

                {/* Security & Trust Banner */}
                <section className="bg-gray-900 dark:bg-black py-12 border-y border-gray-800 dark:border-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-800">
                            <div>
                                <div className="text-3xl font-black text-white mb-1">99.9%</div>
                                <div className="text-sm font-medium text-gray-400">Uptime SLA</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">SOC 2</div>
                                <div className="text-sm font-medium text-gray-400">Compliant Architecture</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">OAuth 2.0</div>
                                <div className="text-sm font-medium text-gray-400">Encrypted Token Vault</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">Multi-Tenant</div>
                                <div className="text-sm font-medium text-gray-400">Isolated Data Security</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section & Terminal */}
                <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900 scroll-mt-16">
                    <div className="container mx-auto px-6 mb-24">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold mb-4">From zero to deployed in minutes.</h2>
                            <p className="text-gray-500 dark:text-gray-400">A seamless pipeline engineered for non-technical marketing teams.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 relative">
                            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>

                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 border-4 border-indigo-50 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-sm">1</div>
                                <h3 className="text-xl font-bold mb-2">Connect Your Fleet</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Link your GitHub repository and input your Meta Ad Account ID into our secure vault.</p>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 border-4 border-indigo-50 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-sm">2</div>
                                <h3 className="text-xl font-bold mb-2">Automated Provisioning</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Our Dockerized Terraform engine spins up your AWS infrastructure automatically.</p>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 border-4 border-indigo-50 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-sm">3</div>
                                <h3 className="text-xl font-bold mb-2">Command & Control</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Monitor live uptime telemetry and track daily marketing spend from a single unified dashboard.</p>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                                    Infrastructure as Code, <br/>
                                    <span className="text-indigo-600 dark:text-indigo-400">without writing the code.</span>
                                </h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                                    NexusOps dynamically generates HashiCorp configuration files on the fly.
                                    Our pipeline mounts your specific tenant context into a secure Docker container,
                                    executing the build process with zero-touch automation.
                                </p>
                                <ul className="space-y-4 font-medium text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center">
                                        {/* UPGRADED: Check Icon */}
                                        <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Automated State Management
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Stateless Authentication
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Instant S3 Bucket Provisioning
                                    </li>
                                </ul>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-700">
                                    <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="mx-auto text-xs font-mono text-gray-400">bash — nexusops-cli</div>
                                    </div>
                                    <div className="p-6 text-sm font-mono text-gray-300 overflow-x-auto">
                                        <p className="mb-2"><span className="text-green-400">nexusops@admin:~$</span> ./deploy --tenant "ClientAlpha"</p>
                                        <p className="text-gray-500 mb-2">[NexusOps] Initializing secure workspace...</p>
                                        <p className="text-gray-500 mb-2">[Terraform] Generating main.tf configuration...</p>
                                        <p className="text-yellow-400 mb-2">Initializing the backend...</p>
                                        <p className="text-yellow-400 mb-4">Initializing provider plugins...</p>
                                        <p className="text-white mb-2">aws_s3_bucket.site: Creating...</p>
                                        <p className="text-white mb-2">aws_s3_bucket_website_configuration: Creating...</p>
                                        <p className="text-green-400 font-bold mt-4">Apply complete! Resources: 2 added, 0 changed, 0 destroyed.</p>
                                        <p className="text-blue-400 mt-2">Live URL: https://clientalpha-nexusops.s3-website-us-east-1.amazonaws.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enterprise Architecture Deep Dive */}
                <section id="architecture" className="bg-gray-50 dark:bg-gray-800/50 py-24 border-t border-gray-100 dark:border-gray-800 scroll-mt-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Engineered for scale and security.</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                                We don't just build dashboards. We build robust pipelines capable of handling massive data ingestion and multi-tenant isolation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="flex gap-6">
                                <div className="shrink-0 w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shadow-sm border border-indigo-200 dark:border-indigo-800">
                                    {/* UPGRADED: Lock Icon */}
                                    <Lock className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Multi-Tenant Security Architecture</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        Every client's OAuth tokens and cloud credentials are cryptographically isolated within the Vault. Our stateless backend guarantees that Client Alpha's data can never bleed into Client Beta's environment.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="shrink-0 w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-sm border border-blue-200 dark:border-blue-800">
                                    {/* UPGRADED: Settings Icon */}
                                    <Settings className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Scalable Distributed Systems</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        Deployed as a containerized stack, NexusOps is built to scale horizontally. Whether managing 10 deployments or 10,000, the Docker orchestration ensures your infrastructure never skips a beat.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="shrink-0 w-14 h-14 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center shadow-sm border border-green-200 dark:border-green-800">
                                    {/* UPGRADED: Database Icon */}
                                    <Database className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">High-Velocity Data Ingestion</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        Our midnight cron workers interface directly with the Meta Graph API, processing high volumes of daily marketing metrics into our PostgreSQL ledger for instant, visual analytics.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="shrink-0 w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shadow-sm border border-purple-200 dark:border-purple-800">
                                    {/* UPGRADED: Shield Icon */}
                                    <Shield className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Cybersecurity Integration</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                        Infrastructure deployment includes rigorous automated checks. IAM policies and S3 bucket visibility are strictly enforced to prevent vulnerabilities from ever reaching production.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid with Font Icons */}
                <section className="bg-white dark:bg-gray-900 py-24 border-t border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold mb-4">Core Capabilities</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                                    {/* UPGRADED: Cloud Icon */}
                                    <Cloud className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">1-Click AWS Deployments</h3>
                                <p className="text-gray-500 dark:text-gray-400">Provision secure S3 buckets and static websites instantly using our automated Dockerized Terraform pipeline.</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-6">
                                    {/* UPGRADED: TrendingUp Icon */}
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Meta Ads Integration</h3>
                                <p className="text-gray-500 dark:text-gray-400">Securely sync your Facebook and Instagram ad accounts to visualize daily spend, clicks, and ROI alongside your infrastructure.</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-6">
                                    {/* UPGRADED: Activity Icon */}
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Live Telemetry Radar</h3>
                                <p className="text-gray-500 dark:text-gray-400">Monitor your entire fleet with automated midnight cron jobs and real-time health checks to ensure 99.9% uptime.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof / Testimonials */}
                <section className="py-24 bg-gray-50 dark:bg-black border-y border-gray-100 dark:border-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold mb-4">Trusted by modern agencies.</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex text-yellow-400 mb-4">
                                    {/* UPGRADED: Star Icons */}
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-6">"NexusOps completely eliminated our bottleneck. Our marketing team can now launch landing pages and track the Facebook ad traffic without submitting IT tickets."</p>
                                <div className="font-bold text-gray-900 dark:text-white">Sarah Jenkins</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Director of Growth, Alpha Media</div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex text-yellow-400 mb-4">
                                    {/* UPGRADED: Star Icons */}
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-6">"The automated Terraform pipeline is a lifesaver. We manage dozens of client environments, and the single-pane-of-glass dashboard makes infrastructure auditing effortless."</p>
                                <div className="font-bold text-gray-900 dark:text-white">Marcus Chen</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Lead DevOps, Velocity Digital</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="bg-white dark:bg-gray-900 py-24 scroll-mt-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold mb-4">Transparent pricing for growing agencies.</h2>
                            <p className="text-gray-500 dark:text-gray-400">Start for free, upgrade when your client roster demands it.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-lg transition flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Starter</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Perfect for small portfolios.</p>
                                <div className="text-4xl font-black mb-6">$0<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {/* UPGRADED: Check Icons in lists */}
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Up to 3 AWS Deployments</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> 1 Meta Ad Account Link</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> 24h Telemetry Pings</li>
                                </ul>
                                <button onClick={onLoginClick} className="w-full bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-white font-bold py-3 rounded-xl hover:bg-indigo-200 dark:hover:bg-gray-600 transition">Get Started</button>
                            </div>

                            <div className="bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-500 rounded-2xl p-8 shadow-xl relative flex flex-col transform md:-translate-y-4">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Agency Pro</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">For scaling client operations.</p>
                                <div className="text-4xl font-black mb-6">$49<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Unlimited AWS Deployments</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Unlimited Meta Ad Accounts</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> 1-Minute Live Telemetry</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-medium"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Custom Domain Support</li>
                                </ul>
                                <button onClick={onLoginClick} className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition">Start 14-Day Trial</button>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-lg transition flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Custom infrastructure logic.</p>
                                <div className="text-4xl font-black mb-6">Custom</div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Dedicated AWS Architecture</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Multi-Cloud (Azure/Oracle)</li>
                                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300"><Check className="w-4 h-4 mr-2 text-indigo-500 shrink-0" /> Dedicated Account Manager</li>
                                </ul>
                                <button onClick={handleBookDemo} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">Contact Sales</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black py-12 border-t border-gray-800 text-center">
                    <div className="text-2xl font-black text-white tracking-tighter mb-4">
                        NEXUS<span className="text-indigo-500 dark:text-indigo-400">OPS</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-600 font-medium">
                        © {new Date().getFullYear()} NexusOps Inc. Engineered for scale.
                    </div>
                </footer>

            </div>
        </div>
    );
}