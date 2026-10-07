import React, { useContext, useMemo } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
    const { songsData, albumsData, searchTerm, activeCategory, playWithId, getTrackId, favorites } = useContext(PlayerContext);

    // Filter songs based on search and category
    const filteredSongs = useMemo(() => {
        let result = songsData || [];

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            result = result.filter(
                (song) =>
                    song.name.toLowerCase().includes(query) ||
                    (song.desc && song.desc.toLowerCase().includes(query)) ||
                    (song.album && song.album.toLowerCase().includes(query))
            );
        }

        if (activeCategory === 'favorites') {
            result = result.filter((song) => favorites.includes(getTrackId(song)));
        } else if (activeCategory === 'trending') {
            result = result.slice(0, 6);
        } else if (activeCategory === 'spatial') {
            result = result.filter((_, idx) => idx % 2 === 0);
        } else if (activeCategory === 'chill') {
            result = result.filter((_, idx) => idx % 2 !== 0);
        }

        return result;
    }, [songsData, searchTerm, activeCategory, favorites, getTrackId]);

    // Filter albums based on search
    const filteredAlbums = useMemo(() => {
        let result = albumsData || [];

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            result = result.filter(
                (album) =>
                    album.name.toLowerCase().includes(query) ||
                    (album.desc && album.desc.toLowerCase().includes(query))
            );
        }

        return result;
    }, [albumsData, searchTerm]);

    // Hero Spotlight item
    const heroTrack = songsData && songsData.length > 0 ? songsData[0] : null;

    return (
        <div className='flex flex-col gap-6 pb-20'>
            <Navbar />

            {/* If not searching and on 'all' or 'trending', show Cinematic Hero Banner */}
            {!searchTerm && (activeCategory === 'all' || activeCategory === 'trending') && heroTrack && (
                <div className='relative rounded-3xl overflow-hidden p-6 sm:p-10 aura-glass border border-white/10 shadow-2xl'>
                    {/* Background glow and subtle artwork backdrop */}
                    <div
                        className='absolute inset-0 bg-cover bg-center opacity-25 filter blur-2xl scale-125 pointer-events-none'
                        style={{ backgroundImage: `url(${heroTrack.image})` }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#06080e] via-[#06080e]/80 to-transparent pointer-events-none' />

                    {/* Banner Content */}
                    <div className='relative z-10 max-w-xl flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <span className='px-2.5 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30'>
                                ✦ AURA PREMIERE
                            </span>
                            <span className='px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'>
                                FLAC 24-BIT / 96KHZ
                            </span>
                        </div>

                        <h2 className='text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight'>
                            Immerse in Pure <span className='aura-gradient-text'>Spatial Sound</span>
                        </h2>

                        <p className='text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg'>
                            Stream studio master quality without compression. Featuring exclusive high-definition tracks and spatial acoustics.
                        </p>

                        <div className='flex items-center gap-3 pt-2'>
                            <button
                                onClick={() => playWithId(getTrackId(heroTrack))}
                                className='aura-glow-btn px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2.5 cursor-pointer'
                            >
                                <svg className='w-5 h-5 fill-current' viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                <span>Play Spotlight: {heroTrack.name}</span>
                            </button>

                            <div className='hidden sm:flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300'>
                                <span className='w-2 h-2 rounded-full bg-cyan-400 animate-ping' />
                                <span>Lossless Audio Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search or Category Header if active */}
            {searchTerm && (
                <div className='flex items-center justify-between pb-2 border-b border-white/10'>
                    <div>
                        <h2 className='text-lg font-bold text-white'>
                            Search results for <span className='text-purple-400'>"{searchTerm}"</span>
                        </h2>
                        <p className='text-xs text-slate-400'>
                            Found {filteredSongs.length} tracks and {filteredAlbums.length} collections
                        </p>
                    </div>
                </div>
            )}

            {activeCategory === 'favorites' && !searchTerm && (
                <div className='flex items-center justify-between pb-2 border-b border-white/10'>
                    <div>
                        <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
                            <span className='text-rose-500'>♥</span> Your Favorite Vault
                        </h2>
                        <p className='text-xs text-slate-400'>
                            {filteredSongs.length} loved tracks ready to stream
                        </p>
                    </div>
                </div>
            )}

            {/* Featured Albums Section */}
            {activeCategory !== 'favorites' && filteredAlbums.length > 0 && (
                <div>
                    <div className='flex items-center justify-between mb-4'>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-extrabold text-white tracking-tight'>
                                Curated Collections
                            </h3>
                            <p className='text-xs text-slate-400 mt-0.5'>Studio master albums and global charts</p>
                        </div>
                        <span className='text-xs font-semibold text-purple-400 hover:text-purple-300 cursor-pointer'>
                            View All ({filteredAlbums.length})
                        </span>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                        {filteredAlbums.map((item, index) => {
                            const albumId = item._id !== undefined ? item._id : item.id;
                            return (
                                <AlbumItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={albumId}
                                    image={item.image}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Featured Songs Section */}
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <div>
                        <h3 className='text-xl sm:text-2xl font-extrabold text-white tracking-tight'>
                            {activeCategory === 'favorites'
                                ? 'Vault Audio Stream'
                                : activeCategory === 'trending'
                                ? 'Trending Right Now'
                                : 'Master Audio Streams'}
                        </h3>
                        <p className='text-xs text-slate-400 mt-0.5'>
                            {filteredSongs.length} high-resolution tracks available
                        </p>
                    </div>
                </div>

                {filteredSongs.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                        {filteredSongs.map((item, index) => {
                            const songId = getTrackId(item);
                            return (
                                <SongItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={songId}
                                    image={item.image}
                                    duration={item.duration}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className='py-16 text-center aura-glass rounded-2xl border border-white/5'>
                        <div className='w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-400 mb-3'>
                            <svg className='w-6 h-6' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className='text-base font-semibold text-slate-300'>No tracks found</p>
                        <p className='text-xs text-slate-500 mt-1'>Try refining your search or exploring other categories</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayHome;
