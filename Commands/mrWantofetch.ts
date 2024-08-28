import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
          .setName("mrwantofetch")
          .setDescription("Cek post terbaru Mr. Wanto"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const ig = interaction.client.instagram
        const latestPost = await ig.getLatestPost(ig.mrWantoId)
        const postUrl: string = `https://instagram.com/p/${latestPost.code}`
        await interaction.reply(postUrl)
    }
}