const mongoose = require("mongoose");

const enterpriseSchema = new mongoose.Schema({
    _externalID: {
        type: mongoose.Schema.Types.UUID,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    CreatedAte: {
        type: Date,
        default: Date.now
    },
    Blocked: {
        type: Boolean,
        default: false
    },
    Users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

module.exports = Enterprise;