import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
}, { timestamps: true });

export const Registration = mongoose.model("Registration", registrationSchema);