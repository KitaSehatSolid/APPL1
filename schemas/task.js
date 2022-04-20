const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    server_id: String,
    kode_matkul: String,
    description: String
}, {versionKey: false})

module.exports = mongoose.models.Config || mongoose.model('Task', TaskSchema)