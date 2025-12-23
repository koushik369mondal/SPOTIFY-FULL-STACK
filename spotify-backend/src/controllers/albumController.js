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

const updateAlbum = async (req, res) => {
    try {
        const { id, name, desc, bgColor } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Album ID is required"
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (desc) updateData.desc = desc;
        if (bgColor) updateData.bgColor = bgColor;

        // Handle image upload if provided
        if (req.file) {
            const imageFile = req.file;

            if (fs.existsSync(imageFile.path)) {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: "image",
                    folder: "albums",
                });
                updateData.image = imageUpload.secure_url;

                // Clean up uploaded file
                try {
                    fs.unlinkSync(imageFile.path);
                } catch (cleanupError) {
                    console.error('Error cleaning up image file:', cleanupError);
                }
            }
        }

        const updatedAlbum = await albumModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedAlbum) {
            return res.status(404).json({
                success: false,
                message: "Album not found"
            });
        }

        res.json({
            success: true,
            message: "Album updated successfully",
            album: updatedAlbum
        });
    } catch (error) {
        console.error("Error updating album:", error);

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
            message: error.message || "Failed to update album"
        });
    }
};

export { addAlbum, listAlbum, removeAlbum, updateAlbum };