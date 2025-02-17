import express from 'express';
import pdfjs from 'pdfjs-dist'; 
import Process_Transcript from '../utils/transcript.js'

const router = express.Router();

// Package Imports
import multer from 'multer';

// Multer Storage Setup (Temporary Storage Until Database)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/Images")
    },
    filename: function(req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage})


router.post('/', upload.single('file'), async (req, res) => {
    // Send a response back to the client
    res.json({ message: 'File uploaded'});
    const filePath = req.file.path;
  
    try {
      const document = await pdfjs.getDocument(filePath).promise; 
      let results = await Process_Transcript(document);
  
      console.log("Total quarters: ");
      console.log(results);
      
    } catch (error) {
      console.error("error: ", error);
    }
});

export default router