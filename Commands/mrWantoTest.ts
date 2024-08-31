import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";
import channels from "../Models/MrWantoIGSubscribe";

export default {
    data: new SlashCommandBuilder()
          .setName("mrwantotest")
          .setDescription("Test Announcement Mr Wanto")
          .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const channelsArr = await channels.find({}).exec()
        const client = interaction.client
        const ig = client.instagram
        for(const channelInfo of channelsArr){
            const guild = await client.guilds.cache.get(channelInfo.guildId)
            const channel = await guild?.channels.cache.get(channelInfo.channelId) as TextChannel
            const newPosts = await ig.getLatestPost(ig.mrWantoId)
            for(const latestPost of [newPosts]){
                const post = latestPost.data
                const postUrl: string = `https://instagram.com/p/${post.code}`
                const embed = ig.createEmbed(post)
                await channel.send({content: `${channelInfo.customMessage!}\n${postUrl}`, embeds: [embed]})
            }
            await interaction.reply(`Sukses menjalankan test.`)
        }
    }
}