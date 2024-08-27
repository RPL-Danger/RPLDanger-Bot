import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import generateKhodam from "../Utils/generateKhodam";
export default {
    data: new SlashCommandBuilder()
          .setName("khodam")
          .setDescription("Cek khodam kamu!"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        interaction.reply(`Khodam kamu **${generateKhodam()}**`)
    }
}