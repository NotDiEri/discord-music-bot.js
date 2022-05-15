const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            queue.shuffle()
            await interaction.editReply("The queue of songs is now shuffled")
    },

}
