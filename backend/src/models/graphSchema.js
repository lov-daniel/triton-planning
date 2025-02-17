import mongoose from 'mongoose';

import nodeSchema from './nodeSchema.js';
import edgeSchema from './edgeSchema.js';

const graphSchema = new mongoose.Schema({
    userID: String,
    nodes: [nodeSchema],
    edges: [edgeSchema],
});

const Graph = mongoose.model('Graph', graphSchema);

export default Graph;