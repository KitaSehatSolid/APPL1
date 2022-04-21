const { Client, Message } = require('discord.js')
const task = require('../schemas/task')


module.exports = {
    name: 'deletetask',
    description: 'Delete task from list',
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
            let task_id = args[0]

            let data = {
                server_id: message.guild.id,
                task_id : task_id 
            }

            task.deleteOne(data,(err, result) => {
                if (result.deletedCount == 1)
                {
                    message.channel.send(`Task berhasil dihapus`)
                }
                else {
                    message.channel.send(`Task tidak berhasil untuk dihapus`)
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
