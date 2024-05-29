const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    _externalID: {
        type: mongoose.Schema.Types.UUID,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: 
    { 
        type: String, 
        required: true 
    },
    CreatedAte: {
        type: Date,
        default: Date.now
    },
    blocked: {
        type: Boolean,
        default: false
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    enterprises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise'
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;