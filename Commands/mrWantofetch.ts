import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
          .setName("mrwantofetch")
          .setDescription("Cek post terbaru Mr. Wanto"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const ig = interaction.client.instagram
        const {data: latestPost} = await ig.getLatestPost(ig.mrWantoId)
        const postUrl: string = `https://instagram.com/p/${latestPost.code}`
        const mediaUrl = latestPost.image_versions2.candidates[0].url
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(latestPost.caption?.text ? latestPost.caption.text : "No Caption")
        .setAuthor({name:"@wantoariwibowo"})
        .addFields(
            { name: 'Likes', value: latestPost.like_count.toString() },
            { name: 'Comments', value: latestPost.comment_count.toString() },
        )
        .setImage(mediaUrl)
        interaction.reply({content: postUrl, embeds: [embed]})
    }
}