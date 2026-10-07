import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, desc, id }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/album/${id}`)}
            className='aura-glass-card p-3 rounded-2xl cursor-pointer group relative flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40'
        >
            {/* Album Cover */}
            <div className='relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-slate-900 shadow-md'>
                <img
                    className='w-full h-full object-cover group-hover:scale-108 transition-transform duration-500'
                    src={image}
                    alt={name}
                    loading='lazy'
                />

                {/* Dark gradient overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Top Badge */}
                <div className='absolute top-2 left-2'>
                    <span className='px-1.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10'>
                        ALBUM
                    </span>
                </div>

                {/* Hover Play Button */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[2px] shadow-xl shadow-cyan-500/40 transform group-hover:scale-100 scale-75 transition-transform'>
                        <div className='w-full h-full bg-[#090d16] rounded-full flex items-center justify-center text-white'>
                            <svg className='w-5 h-5 text-cyan-300 ml-0.5' fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Album Details */}
            <div>
                <p className='font-semibold text-sm text-white truncate group-hover:text-cyan-300 transition-colors'>
                    {name}
                </p>
                <p className='text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed'>
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default AlbumItem;
