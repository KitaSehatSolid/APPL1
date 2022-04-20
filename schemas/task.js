const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    server_id: String,
    task_id: String,
    kode_matkul: String,
    description: String,
    accept: Array,
    decline: Array,
    archive: Array
}, {versionKey: false})

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema)