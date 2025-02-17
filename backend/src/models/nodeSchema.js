import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
    id: String,
    type: String,
    position: {
        x: Number,
        y: Number
    },
    data: {
        label: String,
        units: String,
        completed: Boolean
    }
});

export default nodeSchema