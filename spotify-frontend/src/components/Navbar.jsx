import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm, activeCategory, setActiveCategory } = useContext(PlayerContext);

    const categories = [
        { id: 'all', label: '✦ All Sound' },
        { id: 'trending', label: '⚡ Trending Hits' },
        { id: 'spatial', label: '🌌 Spatial Masters' },
        { id: 'chill', label: '🎧 Chill Beats' },
        { id: 'favorites', label: '💖 Your Vault' },
    ];

    return (
        <div className='w-full flex flex-col gap-3 pb-2 select-none sticky top-0 z-30 pt-1'>
            {/* Top Bar: Nav Arrows, Search, & VIP Profile */}
            <div className='w-full flex justify-between items-center gap-3'>
                {/* Back / Forward Controls */}
                <div className='flex items-center gap-1.5'>
                    <button
                        onClick={() => navigate(-1)}
                        className='w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer'
                        title="Back"
                    >
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        className='w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer'
                        title="Forward"
                    >
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Instant Real-Time Search Bar */}
                <div className='flex-1 max-w-md relative'>
                    <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search songs, artists, high-res albums...'
                        className='w-full pl-10 pr-9 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] focus:bg-[#0f1422] border border-white/10 focus:border-purple-500/60 text-sm text-white placeholder-slate-400 outline-none transition'
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer'
                        >
                            <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Right Action Items */}
                <div className='flex items-center gap-2.5'>
                    <button className='hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 text-xs font-semibold hover:border-purple-400/60 transition cursor-pointer shadow-sm shadow-purple-500/20'>
                        <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping' />
                        <span>Hi-Fi Pass</span>
                    </button>

                    <button className='w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition relative cursor-pointer'>
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className='absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-pink-500' />
                    </button>

                    <div className='flex items-center gap-2 pl-1 cursor-pointer group'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1.5px] shadow-lg shadow-purple-500/25'>
                            <div className='w-full h-full bg-[#0a0d16] rounded-[10px] flex items-center justify-center font-bold text-xs text-purple-300 group-hover:text-white transition'>
                                AU
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className='flex items-center gap-2 overflow-x-auto py-1 scrollbar-none'>
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30 font-bold'
                                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/5'
                            }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;
