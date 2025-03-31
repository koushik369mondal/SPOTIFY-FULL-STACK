import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/frontend-assets/assets'
import AlbumItem from './AlbumItem'

const DisplayHome = () => {
    return (
        <>
        <Navbar/>
        <div className='mb-4'>
            {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
        </div>
        </>
    )
}

export default DisplayHome
