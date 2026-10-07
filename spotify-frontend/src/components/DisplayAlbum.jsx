import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = ({ album }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [albumData, setAlbumData] = useState(album || null);
    const { playWithId, albumsData, songsData, track, playStatus, getTrackId, isFavorite, toggleFavorite } = useContext(PlayerContext);

    useEffect(() => {
        if (albumsData && albumsData.length > 0) {
            const found = albumsData.find((item) => {
                const itemId = item._id !== undefined ? item._id : item.id;
                return String(itemId) === String(id);
            });
            if (found) {
                setAlbumData(found);
            }
        }
    }, [id, albumsData]);

    const currentTrackId = getTrackId(track);

    // If album songs don't explicitly match album name, show tracks gracefully
    const albumSongs = React.useMemo(() => {
        if (!songsData || songsData.length === 0) return [];
        if (!albumData) return songsData;
        const filtered = songsData.filter((item) => item.album && item.album === albumData.name);
        return filtered.length > 0 ? filtered : songsData;
    }, [songsData, albumData]);

    if (!albumData) {
        return (
            <div className='flex flex-col gap-6 pb-20'>
                <Navbar />
                <div className='py-20 text-center'>
                    <p className='text-slate-400'>Loading collection...</p>
                </div>
            </div>
        );
    }

    const dynamicBg = albumData.bgColor || '#7928ca';

    return (
        <div className='flex flex-col gap-6 pb-20'>
            <Navbar />

            {/* Immersive Album Hero Banner */}
            <div className='relative rounded-3xl overflow-hidden p-6 sm:p-10 aura-glass border border-white/10 shadow-2xl'>
                {/* Dynamic Ambient Background Lighting */}
                <div
                    className='absolute inset-0 opacity-30 filter blur-3xl scale-125 pointer-events-none'
                    style={{ background: `radial-gradient(circle at 30% 30%, ${dynamicBg}, transparent 70%)` }}
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#06080e]/60 to-[#06080e] pointer-events-none' />

                {/* Banner Layout */}
                <div className='relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-end'>
                    {/* Album Art with Floating Glow */}
                    <div className='relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex-shrink-0 group'>
                        <img
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                            src={albumData.image}
                            alt={albumData.name}
                        />
                        <div className='absolute inset-0 ring-1 ring-white/15 rounded-2xl pointer-events-none' />
                    </div>

                    {/* Metadata & Actions */}
                    <div className='flex flex-col gap-3 text-center md:text-left flex-1'>
                        <div className='flex items-center justify-center md:justify-start gap-2'>
                            <span className='px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider bg-purple-500/25 text-purple-300 border border-purple-500/40'>
                                MASTER COLLECTION
                            </span>
                            <span className='px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-white/10 text-slate-300'>
                                24-BIT / 96KHZ
                            </span>
                        </div>

                        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight'>
                            {albumData.name}
                        </h1>

                        <p className='text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl'>
                            {albumData.desc}
                        </p>

                        <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-400 pt-1'>
                            <span className='font-bold text-white'>Aura Studio Records</span>
                            <span>•</span>
                            <span>{albumSongs.length} Tracks</span>
                            <span>•</span>
                            <span>Approx. 45 Mins</span>
                            <span>•</span>
                            <span className='text-cyan-400 font-semibold'>Dolby Atmos</span>
                        </div>

                        {/* Interactive Buttons */}
                        <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3'>
                            <button
                                onClick={() => albumSongs.length > 0 && playWithId(getTrackId(albumSongs[0]))}
                                className='aura-glow-btn px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 cursor-pointer'
                            >
                                <svg className='w-5 h-5 fill-current' viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                <span>Play All</span>
                            </button>

                            <button
                                onClick={() => {
                                    if (albumSongs.length > 0) {
                                        const rand = Math.floor(Math.random() * albumSongs.length);
                                        playWithId(getTrackId(albumSongs[rand]));
                                    }
                                }}
                                className='px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition flex items-center gap-2 cursor-pointer'
                            >
                                <svg className='w-4 h-4 text-slate-300' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Shuffle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tracklist Table */}
            <div className='flex flex-col gap-2'>
                {/* Table Header */}
                <div className='grid grid-cols-12 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-white/10'>
                    <div className='col-span-1 text-center'>#</div>
                    <div className='col-span-6 sm:col-span-5'>Title</div>
                    <div className='col-span-3 hidden sm:block'>Artist / Desc</div>
                    <div className='col-span-2 hidden md:block text-center'>Quality</div>
                    <div className='col-span-5 sm:col-span-3 md:col-span-1 text-right pr-2'>Duration</div>
                </div>

                {/* Song Rows */}
                <div className='space-y-1'>
                    {albumSongs.map((item, index) => {
                        const songId = getTrackId(item);
                        const isCurrent = (currentTrackId === songId || String(currentTrackId) === String(songId));
                        const favorited = isFavorite(songId);

                        return (
                            <div
                                key={index}
                                onClick={() => playWithId(songId)}
                                className={`grid grid-cols-12 px-4 py-3 rounded-xl items-center transition cursor-pointer group ${
                                    isCurrent
                                        ? 'bg-purple-500/15 border border-purple-500/30 text-white'
                                        : 'hover:bg-white/[0.06] text-slate-300 hover:text-white border border-transparent'
                                }`}
                            >
                                {/* Index or Play / Soundwave */}
                                <div className='col-span-1 flex items-center justify-center font-mono text-xs'>
                                    {isCurrent && playStatus ? (
                                        <div className='flex items-center gap-0.5'>
                                            <span className='w-0.5 h-3 bg-purple-400 animate-wave-1'></span>
                                            <span className='w-0.5 h-4 bg-pink-400 animate-wave-2'></span>
                                            <span className='w-0.5 h-2 bg-cyan-400 animate-wave-3'></span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className='group-hover:hidden text-slate-500'>{index + 1}</span>
                                            <svg className='w-3.5 h-3.5 fill-current hidden group-hover:block text-purple-400' viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </>
                                    )}
                                </div>

                                {/* Title & Thumbnail */}
                                <div className='col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2'>
                                    <img
                                        className='w-10 h-10 rounded-lg object-cover shadow flex-shrink-0'
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <div className='truncate'>
                                        <p className={`text-sm font-semibold truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>
                                            {item.name}
                                        </p>
                                        <p className='text-xs text-slate-400 truncate sm:hidden'>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Desc / Artist */}
                                <div className='col-span-3 hidden sm:block text-xs text-slate-400 truncate pr-2'>
                                    {item.desc || 'Aura Spatial Master'}
                                </div>

                                {/* Quality Badge */}
                                <div className='col-span-2 hidden md:flex justify-center'>
                                    <span className='px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/5 text-purple-300'>
                                        FLAC 24/96
                                    </span>
                                </div>

                                {/* Duration & Favorite */}
                                <div className='col-span-5 sm:col-span-3 md:col-span-1 flex items-center justify-end gap-3 pr-2 font-mono text-xs text-slate-400'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(songId);
                                        }}
                                        className={`transition cursor-pointer ${
                                            favorited
                                                ? 'text-rose-500'
                                                : 'text-slate-600 hover:text-slate-300'
                                        }`}
                                    >
                                        <svg className='w-4 h-4 fill-current' viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        </svg>
                                    </button>
                                    <span>{item.duration || '2:45'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DisplayAlbum;
