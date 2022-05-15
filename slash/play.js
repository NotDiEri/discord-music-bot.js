const { SlashCommandBuilder } = require("@discordjs/builders") 
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("loads songs from youtube")
    .addSubcommand((subcommand)=>
        subcommand.setName("song")
            .setDescription("loads a single song from a URL")
            .addStringOption((option)=> option.setName("url").setDescription("the songs URL").setRequired(true))
    )
    .addSubcommand((subcommand)=>
        subcommand
            .setName("playlist")
            .setDescription("loads a playlist of songs from a URL")
            .addStringOption((option) => option.setName("url").setDescription("the playlist URL").setRequired(true)))
    .addSubcommand((subcommand) => 
        subcommand.setName("search")
            .setDescription("Searches for song based on provided keywords")
            .addStringOption((option) => 
                option.setName("searchterms").setDescription("the search keywords").setRequired(true)
            )
        ),
        run: async ({ client, interaction }) => {
            if (!interaction.member.voice.channel)
                return interaction.editReply("You need to be in a voice channel to use this command")
            
            const queue = await client.player.createQueue(interaction.guild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "song"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.lenght === 0)
                    return interaction.editReply("No results found")

                const song = result.tracks[0]
                await queue.adTrack(song)
                embed 
                    .setDescription(`**[${song.title}](${song.url})** has been add to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})

        } else if (interaction.options.getSubcommand() === "playlist"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if (result.tracks.lenght === 0)
                    return interaction.editReply("No results found")

                const playlist = result.playlist
                await queue.adTracks(result.tracks)
                embed 
                    .setDescription(`**${result.tracks.lenght} songs from [${playlist.title}](${playlist.url})** have been add to the queue`)
                    .setThumbnail(playlist.thumbnail)

        } else if (interaction.options.getSubcommand() === "search"){
                let url = interaction.options.getString("searchterms")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                if (result.tracks.lenght === 0)
                    return interaction.editReply("No results found")

                const song = result.tracks[0]
                await queue.adTracks(song)
                embed 
                    .setDescription(`**[${song.title}](${song.url})** has been add to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    },
}
