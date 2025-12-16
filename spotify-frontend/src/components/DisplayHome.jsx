import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'


const DisplayHome = () => {

    const { songsData, albumsData } = useContext(PlayerContext);

    return (
        <>
            <Navbar />
            <div className='mb-8'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                    {albumsData && albumsData.length > 0 ? (
                        albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))
                    ) : (
                        <p className='text-gray-500 col-span-full'>No albums available</p>
                    )}
                </div>
            </div>
            <div className='mb-8'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                    {songsData && songsData.length > 0 ? (
                        songsData.map((item, index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))
                    ) : (
                        <p className='text-gray-500 col-span-full'>No songs available</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default DisplayHome
