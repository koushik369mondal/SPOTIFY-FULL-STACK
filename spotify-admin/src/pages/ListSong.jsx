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
    const [newImage, setNewImage] = useState(null);
    const [newAudio, setNewAudio] = useState(null);

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
        setNewImage(null);
        setNewAudio(null);
    }

    const updateSong = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('id', editingSong);
            formData.append('name', editForm.name);
            formData.append('desc', editForm.desc);
            formData.append('album', editForm.album);

            if (newImage) {
                formData.append('image', newImage);
            }
            if (newAudio) {
                formData.append('audio', newAudio);
            }

            const response = await axios.post(`${url}/api/song/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
                            <button
                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors'
                                onClick={() => removeSong(item._id)}
                            >
                                Delete
                            </button>
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
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Update Poster Image (Optional)
                                </label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => setNewImage(e.target.files[0])}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                />
                                {newImage && (
                                    <p className='text-sm text-green-600 mt-1'>New image selected: {newImage.name}</p>
                                )}
                            </div>
                            <div className='mb-6'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Update Audio File (Optional)
                                </label>
                                <input
                                    type='file'
                                    accept='audio/*'
                                    onChange={(e) => setNewAudio(e.target.files[0])}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                />
                                {newAudio && (
                                    <p className='text-sm text-green-600 mt-1'>New audio selected: {newAudio.name}</p>
                                )}
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
