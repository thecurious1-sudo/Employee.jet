const mongoose = require(`mongoose`);

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum :['binary','rating']
    },
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Response`
        }
    ],
}, {
    // Keep the created and updated time
    timestamps: true
}
);

module.exports = mongoose.model(`Question`, questionSchema);