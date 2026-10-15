import mongoose from 'mongoose'
const { Schema } = mongoose;

const refreshSessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true,
    },
    familyId: {
        type: Schema.Types.ObjectId,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    },
    revokedAt:{
        type:Date,
    }
},{
    timestamps:true,
});

export const RefreshSession = mongoose.model('RefreshSession',refreshSessionSchema);