var mongoose = require('mongoose')
const { readDB, writeDB } = require('../../util/mongo')
var actionSchema = new mongoose.Schema({
    feedbackTitle: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        unique: true
    },
    feedbackDetail: {
        type: String,
        required: true
    },
    feedbackStatus: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        required: true
    },
    lastModifiedOn: {
        type: Date,
        required: true
    }
})


exports.readfeedback = readDB.model('feedback', actionSchema, 'feedback')
exports.writefeedback = writeDB.model('feedback', actionSchema, 'feedback')