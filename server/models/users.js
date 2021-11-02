import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    givenName: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id:{ type: String },
    register_date: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('user',UserSchema);