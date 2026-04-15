import UptimeBadge from './UptimeBadge';

export default function ProjectCard({ project, asset, onDeploy }) {
    const isDeployed = !!asset;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${isDeployed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {isDeployed ? 'LIVE' : 'PENDING'}
          </span>
                </div>

                {isDeployed && (
                    <div className="mb-4">
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex flex-col">
                            <span className="text-[10px] text-indigo-400 font-bold mb-1 uppercase">AWS Endpoint</span>
                            <a href={`http://${asset.resourceId}`} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 font-medium break-all hover:underline mb-2">
                                {asset.resourceId} ↗
                            </a>
                        </div>

                        {/* HERE IS THE NEW RADAR BADGE! */}
                        <UptimeBadge assetId={asset.id} />
                    </div>
                )}
            </div>

            <button
                onClick={() => onDeploy(project)}
                disabled={isDeployed}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition ${isDeployed ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 shadow-lg'}`}
            >
                {isDeployed ? 'Infrastructure Ready' : 'Launch to AWS'}
            </button>
        </div>
    );
}