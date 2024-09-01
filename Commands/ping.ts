import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from "discord.js"
export default {
    data: new SlashCommandBuilder()
              .setName("ping")
              .setDescription("Send a ping command!"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const client: Client = interaction.client
        await interaction.deferReply()
        const reply = await interaction.fetchReply()
        const ping: number = reply.createdTimestamp - interaction.createdTimestamp
        await interaction.editReply(`Pong!\nClient \`${ping}ms\` | Websocket: \`${client.ws.ping}ms\``)
    }
}