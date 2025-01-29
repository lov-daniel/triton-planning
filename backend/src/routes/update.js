import express from 'express';
const router = express.Router();

// Script Imports
import Load_Classes from '../utils/classes.js';


router.get('/', async (req, res) => {
    try {
        let scrapped = await Load_Classes();
        res.json(scrapped);
      } catch (error) {
        console.error("Error while scrapping: " + error);
      }
});

export default router;