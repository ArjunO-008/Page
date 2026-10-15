import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        default: '',
    },
    revision: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

export const Note = mongoose.model('Note', noteSchema);