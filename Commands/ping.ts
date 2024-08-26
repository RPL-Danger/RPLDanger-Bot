import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
              .setName("ping")
              .setDescription("Send a ping command!"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply("Pong!")
        await interaction.followUp("Hey There!")
    }
}