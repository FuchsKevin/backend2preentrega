// src/models/User.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role: { type: String, default: 'user' }
});

export const User = mongoose.model('User', userSchema);