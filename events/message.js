require('dotenv').config()
const { Client, Message } = require("discord.js")

module.exports = {
    name: 'message',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async(client, message) => {
        if (message.author.bot) return
        if (!message.content.startsWith(client.prefix)) return
        let [cmd, ...args] = message.content.slice(client.prefix.length).trim().split(/ +/g)
        let command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()))
        if (!command) return
        if (command.min_args > args.length) return message.channel.send(`Command tidak lengkap, periksa kembali argumen yang diperlukannya!`)
        if (
            command.permission.user.length == 0 ||
            command.permission.bot.length == 0 ||
            message.member.hasPermission(command.permission.user) ||
            message.guild.me.hasPermission(command.permission.bot) 
        )
        {
            if (!command.isOwner ||
                (command.isOwner && message.author.id == message.guild.ownerID || message.author.id == process.env.DEVELOPER_ID))
            {
                if (!command.dmChannel && message.channel.type == 'dm') return message.channel.send(`Hanya bisa dieksekusi pada channel server, bukan dm!`)
                else return command.run(client, message, args)
            }
            else return message.channel.send(`Hanya bisa dieksekusi oleh owner saja!`)
        }
        else return message.channel.send(`Anda tidak punya akses untuk menjalankannya!`)
      }
}