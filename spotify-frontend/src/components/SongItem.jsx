import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SongItem = ({ name, image, desc, id, duration }) => {
    const { playWithId, track, playStatus, getTrackId, isFavorite, toggleFavorite } = useContext(PlayerContext);

    const currentTrackId = getTrackId(track);
    const isPlayingThis = (currentTrackId === id || String(currentTrackId) === String(id));
    const favorited = isFavorite(id);

    return (
        <div
            onClick={() => playWithId(id)}
            className={`aura-glass-card p-3 rounded-2xl cursor-pointer group relative flex flex-col justify-between transition-all duration-300 ${
                isPlayingThis ? 'border-purple-500/50 bg-purple-500/[0.08] shadow-[0_8px_30px_rgba(168,85,247,0.2)]' : ''
            }`}
        >
            {/* Artwork Container */}
            <div className='relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-slate-900 shadow-md'>
                <img
                    className='w-full h-full object-cover group-hover:scale-108 transition-transform duration-500'
                    src={image}
                    alt={name}
                    loading='lazy'
                />

                {/* Ambient vignette on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Top Badges */}
                <div className='absolute top-2 left-2 flex items-center gap-1.5'>
                    <span className='px-1.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-black/60 backdrop-blur-md text-purple-300 border border-white/10'>
                        HI-RES
                    </span>
                </div>

                {/* Heart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        favorited
                            ? 'bg-rose-500/80 text-white opacity-100 scale-105'
                            : 'bg-black/50 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 hover:scale-110'
                    }`}
                    title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                >
                    <svg className='w-3.5 h-3.5 fill-current' viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>

                {/* Floating Play Button */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-xl shadow-purple-600/40 transform group-hover:scale-100 scale-75 transition-transform'>
                        <div className='w-full h-full bg-[#090d16] rounded-full flex items-center justify-center text-white'>
                            {isPlayingThis && playStatus ? (
                                <svg className='w-5 h-5 text-purple-300' fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                </svg>
                            ) : (
                                <svg className='w-5 h-5 text-white ml-0.5' fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                {/* Animated Equalizer when actively playing */}
                {isPlayingThis && playStatus && (
                    <div className='absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md flex items-center gap-1 border border-purple-500/40'>
                        <span className='w-1 h-3 bg-purple-400 rounded-full animate-wave-1'></span>
                        <span className='w-1 h-4 bg-pink-400 rounded-full animate-wave-2'></span>
                        <span className='w-1 h-2 bg-cyan-400 rounded-full animate-wave-3'></span>
                        <span className='w-1 h-3.5 bg-purple-400 rounded-full animate-wave-4'></span>
                    </div>
                )}
            </div>

            {/* Song Meta */}
            <div>
                <p className={`font-semibold text-sm truncate ${isPlayingThis ? 'text-purple-300' : 'text-white'}`}>
                    {name}
                </p>
                <div className='flex items-center justify-between text-xs text-slate-400 mt-1'>
                    <span className='truncate flex-1 pr-2'>{desc}</span>
                    {duration && <span className='font-mono text-[11px] text-slate-500'>{duration}</span>}
                </div>
            </div>
        </div>
    );
};

export default SongItem;
