import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const {
        track,
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        seekSong,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        isShuffle,
        toggleShuffle,
        repeatMode,
        toggleRepeat,
        favorites,
        toggleFavorite,
        isFavorite,
        getTrackId,
        isQueueOpen,
        setIsQueueOpen
    } = useContext(PlayerContext);

    if (!track) return null;

    const trackId = getTrackId(track);
    const favorited = isFavorite(trackId);

    const formatNum = (num) => String(num || 0).padStart(2, '0');

    return (
        <div className='w-full aura-glass rounded-2xl px-4 sm:px-6 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] border border-white/10 flex items-center justify-between gap-4 backdrop-blur-3xl select-none'>
            {/* Left: Track Information */}
            <div className='flex items-center gap-3.5 min-w-[200px] max-w-[280px]'>
                <div className='relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-purple-900/30 flex-shrink-0 group'>
                    <img
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                            playStatus ? 'scale-105' : ''
                        }`}
                        src={track.image}
                        alt={track.name}
                    />
                    <div className='absolute inset-0 ring-1 ring-white/15 rounded-xl pointer-events-none' />
                </div>

                <div className='min-w-0 flex-1'>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold text-sm text-white truncate hover:underline cursor-pointer'>
                            {track.name}
                        </p>
                        <span className='hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30'>
                            FLAC
                        </span>
                    </div>
                    <p className='text-xs text-slate-400 truncate mt-0.5'>
                        {track.desc || 'Studio Master Track'}
                    </p>
                </div>

                {/* Heart Button */}
                <button
                    onClick={() => toggleFavorite(trackId)}
                    className={`p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer flex-shrink-0 ${
                        favorited ? 'text-rose-500' : 'text-slate-400 hover:text-white'
                    }`}
                    title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                >
                    <svg className='w-4 h-4 fill-current' viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>

            {/* Center: Playback Controls & Progress Bar */}
            <div className='flex-1 max-w-xl flex flex-col items-center gap-1.5'>
                {/* Control Buttons */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    {/* Shuffle */}
                    <button
                        onClick={toggleShuffle}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isShuffle
                                ? 'text-cyan-400 bg-cyan-500/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        title="Shuffle playback"
                    >
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H4m0 0l3-3m-3 3l3 3m12-10h4m0 0l-3-3m3 3l-3 3M4 8h4l6 8h6M16 8l2-2.5" />
                        </svg>
                    </button>

                    {/* Previous */}
                    <button
                        onClick={previous}
                        className='p-1.5 text-slate-300 hover:text-white hover:scale-110 transition cursor-pointer'
                        title="Previous track"
                    >
                        <svg className='w-5 h-5 fill-current' viewBox="0 0 24 24">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                    </button>

                    {/* Main Play / Pause */}
                    <button
                        onClick={playStatus ? pause : play}
                        className='aura-glow-btn w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition'
                        title={playStatus ? 'Pause' : 'Play'}
                    >
                        {playStatus ? (
                            <svg className='w-5 h-5 fill-current' viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                        ) : (
                            <svg className='w-5 h-5 fill-current ml-0.5' viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        )}
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        className='p-1.5 text-slate-300 hover:text-white hover:scale-110 transition cursor-pointer'
                        title="Next track"
                    >
                        <svg className='w-5 h-5 fill-current' viewBox="0 0 24 24">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                    </button>

                    {/* Repeat */}
                    <button
                        onClick={toggleRepeat}
                        className={`p-1.5 rounded-lg transition relative cursor-pointer ${
                            repeatMode !== 'off'
                                ? 'text-pink-400 bg-pink-500/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        title={`Repeat mode: ${repeatMode}`}
                    >
                        <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {repeatMode === 'one' && (
                            <span className='absolute -top-1 -right-1 text-[9px] font-bold bg-pink-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center'>
                                1
                            </span>
                        )}
                    </button>
                </div>

                {/* Progress Timeline */}
                <div className='w-full flex items-center gap-3 text-[11px] font-mono text-slate-400'>
                    <span className='w-9 text-right'>
                        {formatNum(time.currentTime.minute)}:{formatNum(time.currentTime.second)}
                    </span>

                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className='flex-1 h-1.5 hover:h-2 bg-white/10 hover:bg-white/15 rounded-full cursor-pointer relative group transition-all overflow-hidden'
                    >
                        <div
                            ref={seekBar}
                            className='h-full w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full relative'
                        />
                    </div>

                    <span className='w-9'>
                        {formatNum(time.totalTime.minute)}:{formatNum(time.totalTime.second)}
                    </span>
                </div>
            </div>

            {/* Right: Audio Visualizer, Volume, & Queue */}
            <div className='hidden md:flex items-center gap-4 min-w-[200px] justify-end'>
                {/* Live Animated Equalizer bars */}
                {playStatus ? (
                    <div className='flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/5' title="Spatial Audio Visualizer">
                        <span className='w-1 h-3 bg-purple-400 rounded-full animate-wave-1'></span>
                        <span className='w-1 h-5 bg-pink-400 rounded-full animate-wave-2'></span>
                        <span className='w-1 h-2 bg-cyan-400 rounded-full animate-wave-3'></span>
                        <span className='w-1 h-4 bg-purple-400 rounded-full animate-wave-4'></span>
                    </div>
                ) : (
                    <div className='flex items-center gap-1 px-2 py-1 opacity-40' title="Paused">
                        <span className='w-1 h-1.5 bg-slate-500 rounded-full'></span>
                        <span className='w-1 h-2.5 bg-slate-500 rounded-full'></span>
                        <span className='w-1 h-1.5 bg-slate-500 rounded-full'></span>
                        <span className='w-1 h-2 bg-slate-500 rounded-full'></span>
                    </div>
                )}

                {/* Volume Slider with Mute Toggle */}
                <div className='flex items-center gap-2'>
                    <button
                        onClick={toggleMute}
                        className='text-slate-400 hover:text-white transition cursor-pointer'
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted || volume === 0 ? (
                            <svg className='w-4 h-4 text-rose-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : volume < 0.5 ? (
                            <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        ) : (
                            <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>

                    <input
                        type='range'
                        min='0'
                        max='1'
                        step='0.02'
                        value={isMuted ? 0 : volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className='w-18 h-1 accent-purple-500 cursor-pointer'
                        title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                    />
                </div>

                {/* Queue Toggle Button */}
                <button
                    onClick={() => setIsQueueOpen(!isQueueOpen)}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                        isQueueOpen
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'hover:bg-white/10 text-slate-400 hover:text-white'
                    }`}
                    title="Playback Queue"
                >
                    <svg className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Player;
