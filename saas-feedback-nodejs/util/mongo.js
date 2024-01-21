const mongoose = require('mongoose')
require('dotenv').config()

module.exports.readDB = mongoose.createConnection(process.env.MONGO_READ_DB, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to Read DB')
})
module.exports.writeDB = mongoose.createConnection(process.env.MONGO_WRITE_DB, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to Write DB')
})

module.exports.isConnected = () => {
    return module.exports.readDB.readyState === 1 &&  module.exports.writeDB.readyState === 1
}
