const { Client, Message } = require('discord.js')
const task = require('../schemas/task')

module.exports = {
    name: 'showtask',
    description: 'Get the list of the server task',
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
            let kode_matkul = ""
            if (args.length > 0) kode_matkul = args[0]
            if (kode_matkul.length == 0) {
                let doc = await task.find({
                    server_id: message.guild.id,
                    archive: {"$nin": message.author.id}
                })
                let arr = []
                doc.forEach(d => {
                    let status = ':clock12:'
                    if (d.accept.includes(message.author.id)) status = ':white_check_mark:'
                    else if (d.decline.includes(message.author.id)) status = ':x:'
                    let str = `${status} \`ID: ${d.task_id}\` \`${d.kode_matkul}\` ${d.description}`
                    arr.push(str)
                })
                arr.sort()
                arr.length = Math.min(arr.length, 30)
                let reallen = arr.length
                if (arr.length == 0) arr.push(`Tidak ada.`)
                let embed = {
                    description: arr.join('\n'),
                    footer: {
                        text: `Menampilkan ${reallen} tugas`
                    }
                }
                message.channel.send(`<@${message.author.id}>, berikut adalah daftar tugas milik anda`, {embed})
            } 
            if (kode_matkul != "")
            {
                let doc = await task.find({
                    server_id: message.guild.id,
                    kode_matkul: kode_matkul,
                    archive: {"$nin": message.author.id}
                })
                let arr = []
                doc.forEach(d => {
                    let status = ':clock12:'
                    if (d.accept.includes(message.author.id)) status = ':white_check_mark:'
                    else if (d.decline.includes(message.author.id)) status = ':x:'
                    let str = `${status} \`ID: ${d.task_id}\` ${d.description}`
                    arr.push(str)
                })
                arr.sort()
                arr.length = Math.min(arr.length, 30)
                let reallen = arr.length
                if (arr.length == 0) arr.push(`Tidak ada.`)
                let embed = {
                    description: arr.join('\n'),
                    footer: {
                        text: `Menampilkan ${reallen} tugas`
                    }
                }
                message.channel.send(`<@${message.author.id}>, berikut adalah daftar tugas milik anda`, {embed})
            }
        }
        catch (err)
        {
            console.trace(err)
            message.channel.send(err).catch(() => {})
        }
    },
}