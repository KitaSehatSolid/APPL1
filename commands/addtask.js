const { Client, Message } = require('discord.js')
const task = require('../schemas/task')


module.exports = {
    name: 'addtask',
    description: 'Add a new task',
    permission: {
        user: [],
        bot: []
    },
    dmChannel: false,
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
            let kode_matkul = args[0]
            let description = args.join(' ').slice(kode_matkul.length + 1)

            let data = {
                server_id: message.guild.id,
                task_id: Math.random().toString(36).substr(2, 6),
                kode_matkul: kode_matkul,
                description: description,
                accept: [],
                decline: [],
                archive: []
            }

            let doc = new task (data)
            doc.save().then(result => {
                if (result)
                {
                    message.channel.send(`Task berhasil ditambahkan`)
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
