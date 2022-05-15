const { SlashCommandBuilder } = require("@discordjs/builders") 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("skip to a chosen song #")
        .addNumberOption((option) =>
            option.setName("tracknumber").setDescription("track to play").setMinValue(1).setRequired(true)),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildID)

        if (!queue)
            return await interaction.editReply("There are no songs at the queue")

            const trackNum = interaction.options.getNumber("tracknumber")

            if (trackNum > queue.tracks.length)
                return await interaction.editReply("theres no track number with that value")
            queue.skipTo(trackNum - 1)
            await interaction.editReply(`skipped to ${trackNum}`)
    },
}
