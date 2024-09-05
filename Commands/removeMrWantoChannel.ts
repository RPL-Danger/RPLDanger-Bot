import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js"
import channels from "../Models/MrWantoIGSubscribe"
import { enable as isMrWantoEnable } from "../Features/mrWantoIgSubcribe"
import { enable as isMongoEnable } from "../Features/mongoDatabase"

export default {
    enable: isMrWantoEnable && isMongoEnable,
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