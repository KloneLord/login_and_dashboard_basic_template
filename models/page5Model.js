import mongoose from 'mongoose';

const page5Schema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    username: { type: String, required: true },
    entryDate: { type: Date, default: Date.now },
});

export default mongoose.model('Page5', page5Schema);