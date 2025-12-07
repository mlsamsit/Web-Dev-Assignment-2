import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    totalRegistrations: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);