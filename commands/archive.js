const { Client, Message } = require('discord.js')
const task = require('../schemas/task')

module.exports = {
    name: 'archive',
    description: 'Archive a task',
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
            let answer = ''
            const filter = (m) => message.author.id == m.author.id
            let confirm = await message.channel.send(`Tugas akan diarsipkan secara permanen. Apakah anda yakin ingin melanjutkan? [Y/N]`)
            const collector = message.channel.createMessageCollector(
                filter,
                {
                    max: 1,
                    time: 20_000
                }
            )
            collector.on('collect', async (m) => {
                if (m.content.toLowerCase() == 'y')
                {
                    let doc = await task.findOne({
                        task_id: id,
                        archive: {"$nin": message.author.id}
                    })
                    doc.archive.push(message.author.id)
                    let upd = await task.findOneAndUpdate({task_id: doc.task_id}, doc, {new: true, upsert: true})
                    if (upd) message.channel.send(`Berhasil mengarsipkan tugas.`)
                    else message.channel.send(`Gagal mengarsipkan tugas.`)
                    collector.stop("selesai")
                }
                else if (m.content.toLowerCase() == 'n') {
                    collector.stop("dibatalkan")
                }
            })
            collector.on('end', async (m, reason) => {
                if (reason == 'dibatalkan') {
                    message.channel.send(`Pengarsipan dibatalkan`)
                }
                else if (reason != 'selesai') {
                    message.channel.send(`Kesempatan untuk menjawab habis`)
                }
            })       
            
        }
        catch (err)
        {
            console.trace(err)
            message.channel.send(err).catch(() => {})
        }
    }
}