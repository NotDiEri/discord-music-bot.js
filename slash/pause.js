const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pause the song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            queue.setPause(true)
            await interaction.editReply("Music is now paused. Use /resume to keep playing")
    },

}
