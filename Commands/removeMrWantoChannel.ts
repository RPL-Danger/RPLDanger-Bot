import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js"
import channels from "../Models/MrWantoIGSubscribe"
export default {
    data: new SlashCommandBuilder()
              .setName("removemrwantochannel")
              .setDescription("Set Mr Wanto Subscribe Channel.")
              .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const guild = await channels.findOne({guildId: interaction.guildId}).exec()
        if(!guild) return await interaction.reply(`Sorry, Server Belom Ada Di Database`)
        const channelId = guild.channelId
        await channels.deleteOne({guildId: interaction.guildId})
        await interaction.reply(`Berhasil Menghapus Channel <#${channelId}>`)
    }   
}