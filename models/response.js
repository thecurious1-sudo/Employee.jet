const mongoose = require(`mongoose`);

const responseSchema = new mongoose.Schema({
    byEmpObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    },
    response: {
        type: String,
        required: true
    }
}, {
    // Keep the created and updated time
    timestamps: true
}
);

module.exports = mongoose.model(`Response`, responseSchema);
