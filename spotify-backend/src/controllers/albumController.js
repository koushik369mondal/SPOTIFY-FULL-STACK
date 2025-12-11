import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";
import fs from "fs";

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Image file is missing"
            });
        }

        // Validate file exists on disk
        if (!fs.existsSync(imageFile.path)) {
            return res.status(400).json({
                success: false,
                message: "Uploaded file not found"
            });
        }

        console.log("File received:", imageFile);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "albums"
        });

        // Clean up uploaded file from local storage
        try {
            if (fs.existsSync(imageFile.path)) fs.unlinkSync(imageFile.path);
        } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
        }

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        const album = albumModel(albumData);
        await album.save();

        res.json({ success: true, message: "Album added" })

    } catch (error) {
        console.error("Error in addAlbum:", error);

        // Clean up file if it exists
        try {
            if (req.file?.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        } catch (cleanupError) {
            console.error('Error cleaning up file after error:', cleanupError);
        }

        res.status(500).json({
            success: false,
            message: error.message || "Failed to add album. Please try again."
        });
    }
}

const listAlbum = async (req, res) => {

    try {

        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });

    } catch (error) {

        res.json({ success: false })

    }

}

const removeAlbum = async (req, res) => {

    try {

        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album removed" });

    } catch (error) {

        res.json({ success: false });

    }

}

export { addAlbum, listAlbum, removeAlbum };