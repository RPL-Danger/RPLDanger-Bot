import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import mrWantoIgSubcribe from "../Features/mrWantoIgSubcribe"

export default {
    enable: mrWantoIgSubcribe.enable,
    data: new SlashCommandBuilder()
          .setName("mrwantofetch")
          .setDescription("Cek post terbaru Mr. Wanto")
          .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const ig = interaction.client.instagram
        const {data: latestPost} = await ig.getLatestPost(ig.mrWantoId)
        const postUrl: string = `https://instagram.com/p/${latestPost.code}`
        const embed = ig.createEmbed(latestPost)
        interaction.reply({content: postUrl, embeds: [embed]})
    }
}