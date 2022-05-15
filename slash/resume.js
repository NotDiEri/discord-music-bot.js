const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resume the song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            queue.setPause(false)
            await interaction.editReply("let's start over")
    },

}
