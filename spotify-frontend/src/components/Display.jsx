import React, { useContext, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
    const { albumsData } = useContext(PlayerContext);
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";

    const currentAlbum = albumsData && albumsData.length > 0
        ? albumsData.find((x) => {
            const currentId = x._id !== undefined ? x._id : x.id;
            return String(currentId) === String(albumId);
        })
        : null;

    return (
        <div
            ref={displayRef}
            className='flex-1 h-full aura-glass rounded-2xl overflow-y-auto px-4 sm:px-8 pt-4 pb-20 relative'
        >
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbum album={currentAlbum} />} />
            </Routes>
        </div>
    );
};

export default Display;
