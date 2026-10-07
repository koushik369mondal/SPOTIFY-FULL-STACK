import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { songsData as localSongsData, albumsData as localAlbumsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Initialize with fallback demo data so the app always renders cleanly even if offline/backend down
    const [songsData, setSongsData] = useState(localSongsData);
    const [albumsData, setAlbumsData] = useState(localAlbumsData);
    const [track, setTrack] = useState(localSongsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolumeState] = useState(0.85);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState("off"); // 'off' | 'all' | 'one'
    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    // Persisted favorites
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("aura_favorites");
            return saved ? JSON.parse(saved) : [localSongsData[0]?.id ?? 0, localSongsData[2]?.id ?? 2];
        } catch {
            return [0, 2];
        }
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const exists = prev.includes(id);
            const nextFavs = exists ? prev.filter((item) => item !== id) : [...prev, id];
            try {
                localStorage.setItem("aura_favorites", JSON.stringify(nextFavs));
            } catch (e) {
                console.error(e);
            }
            return nextFavs;
        });
    };

    const isFavorite = (id) => favorites.includes(id);

    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setPlayStatus(true);
            }).catch((err) => {
                console.warn("Autoplay / audio play handled:", err);
            });
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const getTrackId = (item) => {
        if (!item) return null;
        return item._id !== undefined ? item._id : item.id;
    };

    const playWithId = async (id) => {
        const found = songsData.find((item) => getTrackId(item) === id || String(getTrackId(item)) === String(id));
        if (found) {
            setTrack(found);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => {
                        setPlayStatus(true);
                    }).catch(console.warn);
                }
            }, 50);
        }
    };

    const previous = async () => {
        if (!songsData.length || !track) return;
        const currentIdx = songsData.findIndex((item) => getTrackId(item) === getTrackId(track));
        if (currentIdx > 0) {
            setTrack(songsData[currentIdx - 1]);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => setPlayStatus(true)).catch(console.warn);
                }
            }, 50);
        } else {
            // Loop back to last song if on first song
            setTrack(songsData[songsData.length - 1]);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => setPlayStatus(true)).catch(console.warn);
                }
            }, 50);
        }
    };

    const next = async () => {
        if (!songsData.length || !track) return;
        if (isShuffle) {
            const randomIdx = Math.floor(Math.random() * songsData.length);
            setTrack(songsData[randomIdx]);
        } else {
            const currentIdx = songsData.findIndex((item) => getTrackId(item) === getTrackId(track));
            if (currentIdx < songsData.length - 1) {
                setTrack(songsData[currentIdx + 1]);
            } else {
                setTrack(songsData[0]); // loop to start
            }
        }
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().then(() => setPlayStatus(true)).catch(console.warn);
            }
        }, 50);
    };

    const seekSong = async (e) => {
        if (!audioRef.current || !seekBg.current || !audioRef.current.duration) return;
        const rect = seekBg.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    const setVolume = (val) => {
        const parsed = Math.max(0, Math.min(1, parseFloat(val)));
        setVolumeState(parsed);
        if (audioRef.current) {
            audioRef.current.volume = parsed;
        }
        if (parsed > 0) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        if (isMuted) {
            audioRef.current.volume = volume || 0.8;
            setIsMuted(false);
        } else {
            audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const toggleShuffle = () => {
        setIsShuffle((prev) => !prev);
    };

    const toggleRepeat = () => {
        setRepeatMode((prev) => {
            if (prev === "off") return "all";
            if (prev === "all") return "one";
            return "off";
        });
    };

    // When song ends, handle repeat / next
    const handleSongEnded = () => {
        if (repeatMode === "one") {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(console.warn);
            }
        } else {
            next();
        }
    };

    const getSongData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`, { timeout: 3000 });
            if (response.data.success && response.data.songs && response.data.songs.length > 0) {
                setSongsData(response.data.songs);
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.log('Backend API unreachable, utilizing built-in Hi-Res audio tracks.');
            setSongsData(localSongsData);
            setTrack(localSongsData[0]);
        }
    };

    const getAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`, { timeout: 3000 });
            if (response.data.success && response.data.albums && response.data.albums.length > 0) {
                setAlbumsData(response.data.albums);
            }
        } catch (error) {
            console.log('Backend API unreachable, utilizing built-in curated albums.');
            setAlbumsData(localAlbumsData);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateHandler = () => {
            if (seekBar.current && audio.duration) {
                const progressPct = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = `${progressPct}%`;
            }
            setTime({
                currentTime: {
                    second: Math.floor(audio.currentTime % 60),
                    minute: Math.floor(audio.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor((audio.duration || 0) % 60),
                    minute: Math.floor((audio.duration || 0) / 60)
                }
            });
        };

        audio.addEventListener('timeupdate', updateHandler);
        audio.addEventListener('ended', handleSongEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateHandler);
            audio.removeEventListener('ended', handleSongEnded);
        };
    }, [track, repeatMode, isShuffle, songsData]);

    useEffect(() => {
        getSongData();
        getAlbumData();
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData,
        albumsData,
        volume, setVolume,
        isMuted, toggleMute,
        isShuffle, toggleShuffle,
        repeatMode, toggleRepeat,
        favorites, toggleFavorite, isFavorite,
        searchTerm, setSearchTerm,
        activeCategory, setActiveCategory,
        isQueueOpen, setIsQueueOpen,
        getTrackId
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
