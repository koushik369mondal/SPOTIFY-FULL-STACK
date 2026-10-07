import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { track, playStatus, favorites, setActiveCategory, activeCategory } = useContext(PlayerContext);

    const isHome = location.pathname === '/';

    return (
        <div className='w-64 lg:w-72 h-full aura-glass rounded-2xl flex-col justify-between p-4 hidden md:flex text-slate-300 select-none'>
            <div className='flex flex-col gap-6 overflow-y-auto pr-1'>
                {/* Brand Header */}
                <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer group px-2'>
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform'>
                        <div className='w-full h-full bg-[#0a0d16] rounded-[10px] flex items-center justify-center'>
                            <svg className='w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors' viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-1.5'>
                            <span className='font-extrabold text-xl tracking-tight text-white'>AURA</span>
                            <span className='text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30'>Hi-Fi</span>
                        </div>
                        <p className='text-[11px] text-slate-400 font-medium'>Spatial Audio Platform</p>
                    </div>
                </div>

                {/* Primary Navigation */}
                <div className='flex flex-col gap-1'>
                    <p className='text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1'>Explore</p>
                    
                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('all');
                        }}
                        className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'all'
                                ? 'bg-gradient-to-r from-purple-500/20 to-transparent text-white border-l-2 border-purple-500'
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <svg className='w-5 h-5 text-purple-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Discover</span>
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('trending');
                        }}
                        className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'trending'
                                ? 'bg-gradient-to-r from-purple-500/20 to-transparent text-white border-l-2 border-purple-500'
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <svg className='w-5 h-5 text-pink-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>Trending Hits</span>
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('spatial');
                        }}
                        className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'spatial'
                                ? 'bg-gradient-to-r from-purple-500/20 to-transparent text-white border-l-2 border-purple-500'
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <svg className='w-5 h-5 text-cyan-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <span>Spatial Audio</span>
                    </button>
                </div>

                {/* Library / Vault Navigation */}
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between px-3 mb-1'>
                        <p className='text-[11px] font-bold uppercase tracking-wider text-slate-500'>Your Vault</p>
                        <span className='text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300 font-mono'>{favorites.length} Liked</span>
                    </div>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('favorites');
                        }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer w-full text-left ${
                            activeCategory === 'favorites'
                                ? 'bg-gradient-to-r from-pink-500/20 to-transparent text-white border-l-2 border-pink-500'
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <div className='flex items-center gap-3.5'>
                            <svg className='w-5 h-5 text-rose-500' fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>Liked Songs</span>
                        </div>
                        <span className='text-xs font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full'>{favorites.length}</span>
                    </button>

                    <div className='flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition cursor-pointer'>
                        <svg className='w-5 h-5 text-amber-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>Saved Playlists</span>
                    </div>

                    <div className='flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition cursor-pointer'>
                        <svg className='w-5 h-5 text-indigo-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Recent Mixes</span>
                    </div>
                </div>
            </div>

            {/* Bottom Card: Lossless Studio Engine Info */}
            <div className='mt-4 p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 relative overflow-hidden'>
                <div className='absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl pointer-events-none' />
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-1.5'>
                        <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                        <span className='text-[11px] font-bold uppercase tracking-wider text-emerald-400'>Studio Master</span>
                    </div>
                    <span className='text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300'>FLAC 24/96</span>
                </div>
                <p className='text-xs text-slate-300 font-medium'>Aura Dynamic Acoustic Engine</p>
                <div className='flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] text-slate-400'>
                    <span>Spatial Rendering</span>
                    <span className='text-purple-400 font-semibold'>Ultra HD</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
