import { useState } from 'react';
import api from '../api/axios';

export default function MetaIntegrationForm({ onSaveSuccess }) {
    const [adAccountId, setAdAccountId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/marketing/meta/config', {
                adAccountId,
                accessToken
            });
            setStatus('success');
            if (onSaveSuccess) onSaveSuccess();
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Connect Meta Ads</h3>
            <p className="text-sm text-gray-500 mb-6">Link your Facebook Ad Manager to track daily spend and performance.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Ad Account ID</label>
                    <input
                        type="text"
                        placeholder="e.g., 1234567890"
                        value={adAccountId}
                        onChange={(e) => setAdAccountId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Access Token</label>
                    <input
                        type="password"
                        placeholder="Paste your long-lived OAuth token..."
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition font-mono text-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
                >
                    {status === 'loading' ? 'Connecting...' : 'Securely Link Meta Account'}
                </button>

                {status === 'success' && <p className="text-sm text-green-600 font-medium text-center">Meta account linked successfully!</p>}
                {status === 'error' && <p className="text-sm text-red-600 font-medium text-center">Failed to link account. Check your keys.</p>}
            </form>
        </div>
    );
}