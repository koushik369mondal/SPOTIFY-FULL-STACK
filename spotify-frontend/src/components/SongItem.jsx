import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({ name, image, desc, id }) => {

    const { playWithId } = useContext(PlayerContext)

    return (
        <div onClick={() => playWithId(id)} className='p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-300 group'>
            <div className='relative w-full aspect-square mb-3 overflow-hidden rounded bg-gray-800'>
                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' src={image} alt={name} />
            </div>
            <p className='font-bold mt-2 mb-1 text-sm line-clamp-1'>{name}</p>
            <p className='text-slate-400 text-xs line-clamp-2'>{desc}</p>
        </div>
    )
}

export default SongItem
