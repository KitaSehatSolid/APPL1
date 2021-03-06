const { Client, Message } = require('discord.js')
const config = require('../schemas/config')

module.exports = {
    name: 'spawn',
    description: 'Spawn an embed to toggle giving notification roles',
    permission: {
        user: [],
        bot: []
    },
    dmChannel: false,
    isOwner: false,
    min_args: 0,
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
            let proj = await config.findOne({server_id: message.guild.id})
            if (!proj) return message.channel.send(`!`)

            const embed = {
                description: `Pilih role berikut untuk mendapatkan notifikasi terkait dengan presensi pada web akademik polban.\nš¢ <@&${proj.role_id}>`
            }
            let msg = await message.channel.send(`__**Notifikasi Presensi**__`, {embed})
            await msg.react('š¢')
            await config.findOneAndUpdate({server_id: message.guild.id}, {message_id: msg.id})
        }
        catch (err)
        {
            console.trace(err)
            message.channel.send(err).catch(() => {})
        }
    }
}