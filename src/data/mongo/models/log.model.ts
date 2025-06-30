import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
        default: 'low'
    },
    message: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export const LogModel = mongoose.model('Log', LogSchema);
