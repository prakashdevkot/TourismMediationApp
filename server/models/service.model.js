import mongoose from 'mongoose';
import crypto from 'crypto'; // Unused import—potentially leftover.

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
});
export default mongoose.model('Service', ServiceSchema);
