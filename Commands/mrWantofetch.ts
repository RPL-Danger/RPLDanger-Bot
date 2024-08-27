import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
          .setName("mrwantofetch")
          .setDescription("Cek post terbaru Mr. Wanto"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const ig = interaction.client.instagram
        const res = await ig.fetchUserPostsV2("wantoariwibowo")
        console.log(res.edges[0])
        const latestPost = res.edges[0].node
        const postUrl: string = `https://instagram.com/p/${res.edges[0].node.shortcode}`
        await interaction.reply(postUrl)
        await interaction.followUp(latestPost.display_url)
    }
}