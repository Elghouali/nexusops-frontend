import { useState } from 'react';
import api from '../api/axios';

export default function NewProjectModal({ isOpen, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [githubRepoUrl, setGithubRepoUrl] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send the new project to the Java backend
            await api.post('/projects', {
                name: name,
                githubRepoUrl: githubRepoUrl,
                status: 'PENDING' // Initial status before AWS deployment
            });

            // Clear the form and close the modal
            setName('');
            setGithubRepoUrl('');
            onSuccess(); // Tells the dashboard to refresh the data
            onClose();   // Hides the modal
        } catch (err) {
            console.error("Failed to create project", err);
            alert("Error creating project. Check the console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900">New Project</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Healthcare Web Portal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">GitHub Repository URL</label>
                        <input
                            type="url"
                            placeholder="https://github.com/agency/repo"
                            value={githubRepoUrl}
                            onChange={(e) => setGithubRepoUrl(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            required
                        />
                    </div>

                    <div className="pt-4 flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
                        >
                            {loading ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}