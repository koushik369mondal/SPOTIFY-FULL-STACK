import express from 'express';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js';
import upload from '../middleware/multer.js';
