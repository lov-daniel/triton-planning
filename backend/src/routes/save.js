    
import express from 'express';
import Graph from '../models/graphSchema.js';

const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        const { userID, nodes, edges } = req.body;

        await Graph.findOneAndUpdate(
            { userID },  // Find by userID
            { nodes, edges }, // Update fields
            { upsert: true, new: true } // Create if not exists
        );

        res.json({ message: 'Graph saved successfully' });
    } catch (error) {

        console.error('Error saving graph:', error);
        res.status(500).json({ message: 'Error saving graph' });
    }
});

router.get('/load/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        const graph = await Graph.findOne({ userID });

        if (!graph) {
            return res.status(404).json({ message: "No graph found" });
        }

        res.json(graph);
    } catch (error) {
        console.error("Error loading graph:", error);
        res.status(500).json({ message: "Error loading graph" });
    }
});

export default router;