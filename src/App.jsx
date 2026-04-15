import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    // 1. Theme State (managed at the root)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('nexusops-theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // 2. View State
    const [currentView, setCurrentView] = useState(() => {
        const token = localStorage.getItem('nexusops_jwt');
        return token ? 'dashboard' : 'landing';
    });

    // 3. Effect to apply the theme globally
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('nexusops-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('nexusops-theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // --- Router Logic ---

    if (currentView === 'dashboard') {
        return (
            <Dashboard
                onLogout={() => setCurrentView('landing')}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />
        );
    }

    if (currentView === 'login') {
        return (
            <Login
                onLoginSuccess={() => setCurrentView('dashboard')}
                onBack={() => setCurrentView('landing')}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />
        );
    }

    return (
        <LandingPage
            onLoginClick={() => setCurrentView('login')}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
        />
    );
}

export default App;