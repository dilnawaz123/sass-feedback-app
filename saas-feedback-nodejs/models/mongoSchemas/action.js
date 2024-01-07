var mongoose = require('mongoose')
const { readDB, writeDB } = require('../../util/mongo')
var actionSchema = new mongoose.Schema({
    actionName: {
        type: String,
        required: true,
        unique: true
    },
    actionShortName: {
        type: String,
        required: true,
        unique: true
    },
    actionDescription: {
        type: String,
        required: true
    },
    actionUrl: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: false
    },
    // moduleId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'module',
    //     required: false
    // },
    // roleId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'roles',
    //     required: false
    // },
    // denyroleId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'roles',
    //     required: false
    // },
    createdOn: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    lastModifiedOn: {
        type: Date,
        required: true
    },
    lastModifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

// var Actions = mongoose.model('action', actionSchema, 'actions')
// module.exports = Actions
exports.readAction = readDB.model('action', actionSchema, 'actions')
exports.writeAction = writeDB.model('action', actionSchema, 'actions')