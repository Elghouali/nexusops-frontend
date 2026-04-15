import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function UptimeBadge({ assetId }) {
    const [latestRecord, setLatestRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const response = await api.get(`/telemetry/asset/${assetId}`);
                // The backend returns the top 50, we just want the most recent one (index 0)
                if (response.data && response.data.length > 0) {
                    setLatestRecord(response.data[0]);
                }
            } catch (err) {
                console.error("Telemetry fetch failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTelemetry();
        // Auto-refresh the ping every 60 seconds
        const interval = setInterval(fetchTelemetry, 60000);
        return () => clearInterval(interval);
    }, [assetId]);

    if (loading || !latestRecord) return <span className="text-xs text-gray-400">Checking status...</span>;

    const isUp = latestRecord.status === 'UP';

    return (
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 w-fit mt-3">
      <span className="relative flex h-3 w-3">
        {isUp && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </span>
            <span className={`text-xs font-bold ${isUp ? 'text-green-700' : 'text-red-700'}`}>
        {isUp ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
      </span>
            {isUp && (
                <span className="text-xs text-gray-500 font-mono pl-2 border-l border-gray-300 ml-2">
          {latestRecord.responseTimeMs}ms
        </span>
            )}
        </div>
    );
}