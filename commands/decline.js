const { Client, Message } = require('discord.js')
const task = require('../schemas/task')

module.exports = {
    name: 'decline',
    description: 'Decline to finish a task',
    permission: {
        user: [],
        bot: []
    },
    dmChannel: true,
    isOwner: false,
    min_args: 1,
    args: [],
    aliases: [],
    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
     run: async(client, message, args) => {
        try
        {
            let id = args[0]
            let doc = await task.findOne({
                task_id: id,
                accept: {"$nin": message.author.id},
                decline: {"$nin": message.author.id},
                archive: {"$nin": message.author.id}
            })
            doc.decline.push(message.author.id)
            let upd = await task.findOneAndUpdate({task_id: doc.task_id}, doc, {new: true, upsert: true})
            if (upd) message.channel.send(`Berhasil mengabaikan tugas.`)
            else message.channel.send(`Gagal mengabaikan tugas.`)
        }
        catch (err)
        {
            console.trace(err)
            message.channel.send(err).catch(() => {})
        }
    }
}