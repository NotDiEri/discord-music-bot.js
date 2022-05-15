const { SlashCommandBuilder } = require("@discordjs/builders") 
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("info about the current playing song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            let bar = queue.createProgressBar({
                queue: false,
                length: 19
            })

            const song = queue.current 

            await interaction.editReply({
                embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently playing [${song.title}](${song.url})\n\n` + bar)
            ],
        })
    },

}
