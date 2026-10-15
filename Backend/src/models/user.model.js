import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    googleSub: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatarUrl:{
        type:String,
    }

}, {
    timestamps: true
});

export const User = mongoose.model('User',userSchema);
