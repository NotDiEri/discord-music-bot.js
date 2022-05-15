const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("stops the bot and clear the entire queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            queue.destroy()
            await interaction.editReply("I'm leaving, see ya!")
    },

}
