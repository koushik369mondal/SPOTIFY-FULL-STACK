import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

    const [data, setData] = useState([]);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        desc: '',
        bgColor: ''
    });
    const [newImage, setNewImage] = useState(null);

    const fetchAlbums = async () => {
        try {

            const response = await axios.get(`${url}/api/album/list`);

            if (response.data.success) {
                setData(response.data.albums);
            }

        } catch (error) {
            toast.error("Error occurred");
        }
    }

    const removeAlbum = async (id) => {
        try {

            const response = await axios.post(`${url}/api/album/remove`, { id });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums();
            }

        } catch (error) {
            toast.error("Error occurred");
        }
    }

    const startEdit = (album) => {
        setEditingAlbum(album._id);
        setEditForm({
            name: album.name,
            desc: album.desc,
            bgColor: album.bgColor
        });
    }

    const cancelEdit = () => {
        setEditingAlbum(null);
        setEditForm({ name: '', desc: '', bgColor: '' });
        setNewImage(null);
    }

    const updateAlbum = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('id', editingAlbum);
            formData.append('name', editForm.name);
            formData.append('desc', editForm.desc);
            formData.append('bgColor', editForm.bgColor);

            if (newImage) {
                formData.append('image', newImage);
            }

            const response = await axios.post(`${url}/api/album/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums();
                cancelEdit();
            } else {
                toast.error(response.data.message || "Update failed");
            }

        } catch (error) {
            toast.error("Error occurred while updating album");
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, [])

    return (
        <div>
            <p>All Albums List</p>
            <br />
            <div>

                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Color</b>
                    <b>Edit</b>
                    <b>Delete</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColor} readOnly />
                            <button
                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors'
                                onClick={() => startEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors'
                                onClick={() => removeAlbum(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Edit Modal */}
            {editingAlbum && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
                        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Edit Album</h2>
                        <form onSubmit={updateAlbum}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Album Name
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
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Background Color
                                </label>
                                <input
                                    type='color'
                                    value={editForm.bgColor}
                                    onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })}
                                    className='w-full h-10 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Update Album Image (Optional)
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

export default ListAlbum
