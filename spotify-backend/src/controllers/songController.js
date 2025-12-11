// backend/controllers/songController.js
import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import connectCloudinary from "../config/cloudinary.js";
import fs from "fs";

// Call config
connectCloudinary();

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "Audio or image file is missing"
            });
        }

        // Validate files exist on disk
        if (!fs.existsSync(audioFile.path) || !fs.existsSync(imageFile.path)) {
            return res.status(400).json({
                success: false,
                message: "Uploaded files not found"
            });
        }

        // Upload files to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video",
            folder: "songs",
        });

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "song-covers",
        });

        // Clean up uploaded files from local storage
        try {
            if (fs.existsSync(audioFile.path)) fs.unlinkSync(audioFile.path);
            if (fs.existsSync(imageFile.path)) fs.unlinkSync(imageFile.path);
        } catch (cleanupError) {
            console.error('Error cleaning up files:', cleanupError);
        }

        const duration = `${Math.floor(audioUpload.duration / 60)}:${String(Math.floor(audioUpload.duration % 60)).padStart(2, '0')}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        };

        const song = new songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song added successfully" });
    } catch (error) {
        console.error("Error adding song:", error);

        // Clean up files if they exist
        try {
            if (req.files?.audio?.[0]?.path && fs.existsSync(req.files.audio[0].path)) {
                fs.unlinkSync(req.files.audio[0].path);
            }
            if (req.files?.image?.[0]?.path && fs.existsSync(req.files.image[0].path)) {
                fs.unlinkSync(req.files.image[0].path);
            }
        } catch (cleanupError) {
            console.error('Error cleaning up files after error:', cleanupError);
        }

        res.status(500).json({
            success: false,
            message: error.message || "Upload failed. Please try again."
        });
    }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        console.error("Error listing songs:", error);
        res.json({ success: false });
    }
};

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song:", error);
        res.json({ success: false });
    }
};

export { addSong, listSong, removeSong };
