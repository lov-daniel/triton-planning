import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    department: { type: String, require: true },
    number: { type: Number, required: true },
    units: { type: Number, require: true },
    pre_req: {type: String}
});

const Course = mongoose.model('Course', classSchema);

export default Course;