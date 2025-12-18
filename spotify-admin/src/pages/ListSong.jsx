import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {

    const [data, setData] = useState([]);
    const [editingSong, setEditingSong] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        desc: '',
        album: ''
    });

    const fetchSongs = async () => {

        try {

            const response = await axios.get(`${url}/api/song/list`);

            if (response.data.success) {
                setData(response.data.songs);
            }

        } catch (error) {
            toast.error("Error Occurred while fetching songs")
        }

    }

    const removeSong = async (id) => {
        try {

            const response = await axios.post(`${url}/api/song/remove`, { id });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchSongs();
            }

        } catch (error) {
            toast.error("Error occurred")
        }
    }

    const startEdit = (song) => {
        setEditingSong(song._id);
        setEditForm({
            name: song.name,
            desc: song.desc,
            album: song.album
        });
    }

    const cancelEdit = () => {
        setEditingSong(null);
        setEditForm({ name: '', desc: '', album: '' });
    }

    const updateSong = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/api/song/update`, {
                id: editingSong,
                ...editForm
            });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchSongs();
                cancelEdit();
            } else {
                toast.error(response.data.message || "Update failed");
            }

        } catch (error) {
            toast.error("Error occurred while updating song");
        }
    }

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <div>
            <p>All Songs List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Edit</b>
                    <b>Delete</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <button
                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors'
                                onClick={() => startEdit(item)}
                            >
                                Edit
                            </button>
                            <p className='cursor-pointer text-red-600 font-bold hover:text-red-800' onClick={() => removeSong(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>

            {/* Edit Modal */}
            {editingSong && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
                        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Edit Song</h2>
                        <form onSubmit={updateSong}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Song Name
                                </label>
                                <input
                                    type='text'
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Description
                                </label>
                                <input
                                    type='text'
                                    value={editForm.desc}
                                    onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Album
                                </label>
                                <input
                                    type='text'
                                    value={editForm.album}
                                    onChange={(e) => setEditForm({ ...editForm, album: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                    required
                                />
                            </div>
                            <div className='flex gap-3 justify-end'>
                                <button
                                    type='button'
                                    onClick={cancelEdit}
                                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListSong
