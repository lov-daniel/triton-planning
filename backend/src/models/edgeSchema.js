import mongoose from 'mongoose';

const edgeSchema = new mongoose.Schema({
    id: String,
    source: String,
    target: String,
    type: String
});

export default edgeSchema;