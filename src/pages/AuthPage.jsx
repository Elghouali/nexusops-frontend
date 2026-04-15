import React, { useState } from 'react';

export default function AuthPage({ onAuthSuccess, onBack }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agencyName, setAgencyName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set the correct Spring Boot endpoint
        const endpoint = isLogin
            ? 'http://localhost:8080/api/auth/login'
            : 'http://localhost:8080/api/auth/register';

        // Build the payload
        const payload = isLogin
            ? { email, password }
            : { email, password, agencyName };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();

                // Save the JWT token to the browser's local storage
                localStorage.setItem('nexusops_jwt', data.token);

                // Trigger the App.jsx router to show the Dashboard
                onAuthSuccess();
            } else {
                // Handle 401 Unauthorized or 403 Forbidden without triggering unused variable warnings
                try {
                    const errorData = await response.json();
                    alert(errorData?.message || "Authentication failed. Please check your credentials.");
                } catch {
                    alert("Authentication failed. Please check your credentials.");
                }
            }
        } catch {
            // THE FIX: Optional Catch Binding completely removes the 'err' variable from memory
            console.error("Network Error: Could not connect to the backend server.");
            alert("Could not connect to the backend server. Is Spring Boot running?");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center cursor-pointer" onClick={onBack}>
                    <h1 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        NEXUS<span className="text-gray-900 dark:text-white">OPS</span>
                    </h1>
                </div>
                <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
                    {isLogin ? 'Sign in to your account' : 'Create your agency account'}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Agency Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={agencyName}
                                        onChange={(e) => setAgencyName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                            >
                                {isLogin ? 'Sign in' : 'Create account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition focus:outline-none"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}