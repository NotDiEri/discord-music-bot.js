const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skip the song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            const currentSong = current 

            queue.skip()
            await interaction.editReply({
                embeds: [
                    new MessageEmbed().setDescription(`${currentSong.title} skipped!`).setThumbnail(currentSong.thumbnail)
                ]
            })
    },

}
