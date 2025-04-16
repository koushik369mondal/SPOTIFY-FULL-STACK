import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App';

const ListSong = () => {

    const [data, setData] = useState([]);

    const fetchSongs = async () => {

        try {

            const response = await axios.get(`${url}/api/song/list`);
            console.log(response.data);

        } catch (error) {
            
        }

    }

    useEffect(() => {
        fetchSongs();
    },[])

    return (
        <div>
            
        </div>
    )
}

export default ListSong
