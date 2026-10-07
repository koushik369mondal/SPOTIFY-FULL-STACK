import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const QueueDrawer = () => {
    const { isQueueOpen, setIsQueueOpen, songsData, track, playWithId, getTrackId, playStatus } = useContext(PlayerContext);

    if (!isQueueOpen) return null;

    const currentId = getTrackId(track);

    return (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:max-w-md aura-glass border-l border-white/10 shadow-2xl p-6 flex flex-col backdrop-blur-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-base tracking-wide">Playing Queue</h3>
                        <p className="text-xs text-slate-400">{songsData.length} tracks available</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsQueueOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Currently Playing Card */}
            {track && (
                <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                    <img src={track.image} alt={track.name} className="w-12 h-12 rounded-lg object-cover shadow" />
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Now Playing</span>
                        <h4 className="text-sm font-semibold text-white truncate">{track.name}</h4>
                        <p className="text-xs text-slate-400 truncate">{track.desc || "Studio Audio"}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-1 h-3 bg-purple-400 rounded-full animate-wave-1"></span>
                        <span className="w-1 h-4 bg-purple-400 rounded-full animate-wave-2"></span>
                        <span className="w-1 h-2 bg-purple-400 rounded-full animate-wave-3"></span>
                    </div>
                </div>
            )}

            {/* Next in Queue List */}
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-5 mb-2">Up Next</h4>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {songsData.map((item, index) => {
                    const itemId = getTrackId(item);
                    const isCurrent = currentId === itemId;
                    return (
                        <div
                            key={index}
                            onClick={() => playWithId(itemId)}
                            className={`flex items-center justify-between p-2.5 rounded-xl transition cursor-pointer ${
                                isCurrent
                                    ? 'bg-white/10 border border-purple-500/30 text-white'
                                    : 'hover:bg-white/5 text-slate-300 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xs text-slate-500 w-4 text-center">{index + 1}</span>
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                                <div className="truncate">
                                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-purple-300' : ''}`}>
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">{item.desc || "Aura Original"}</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 ml-2 font-mono">{item.duration || "2:45"}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QueueDrawer;
