import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onBack, onGoToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('nexusops_jwt', data.token);
                onLoginSuccess();
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch {
            // Optional catch binding (no 'err' variable) keeps ESLint green
            console.error("Auth Server Offline: Check Spring Boot status.");
            alert("Backend unreachable. Ensure your Java server is running on port 8080.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-6 font-sans transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center cursor-pointer" onClick={onBack}>
                    <h1 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        NEXUS<span className="text-gray-900 dark:text-white">OPS</span>
                    </h1>
                </div>
                <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-10 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                placeholder="admin@nexusops.io"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={onGoToRegister}
                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
                        >
                            Don't have an account? Create one
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}