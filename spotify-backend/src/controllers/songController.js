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

        const audioFile = req.files.audio?.[0];
        const imageFile = req.files.image?.[0];

        if (!audioFile || !imageFile) {
            return res.json({ success: false, message: "Audio or image file is missing" });
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
        fs.unlinkSync(audioFile.path);
        fs.unlinkSync(imageFile.path);

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

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
        res.json({ success: false, message: "Upload failed" });
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
