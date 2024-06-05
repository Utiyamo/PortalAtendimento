const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    externalID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    createdAte: {
        type: Date,
        default: new Date()
    },
    conclusion: {
        type: Date
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enterprise"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    signedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Open"
    },
    requirement: {
        type: String,
        required: true
    },
    comments: [{
        comment: {
            date: {
                type: Date,
                default: new Date()
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                required: true
            }
        }
    }]
});


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;