import { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } from "discord.js"
import channels from "../Models/MrWantoIGSubscribe"
export default {
    data: new SlashCommandBuilder()
              .setName("setmrwantochannel")
              .setDescription("Set Mr Wanto Subscribe Channel.")
              .addChannelOption(option => option
                .setName("subscribe")
                .setDescription("text channel")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)    
            )
            .addStringOption(option => option
                .setName("custom-message")
                .setDescription("Custom Message")
                .setRequired(false)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const guild = await channels.findOne({guildId: interaction.guildId}).exec()
        if(guild) return await interaction.reply(`Sorry, Server Ini Sudah Ada Di Database. Silakan Hapus Terlebih Dahulu Menggunakan command /removeMrWantoChannel`)
        await channels.create({
            guildId: interaction.guildId,
            channelId: interaction.options.getChannel('subscribe')?.id,
            customMessage: interaction.options.getString("custom-message") ? interaction.options.getString("custom-message") : "@everyone Ada Posts Baru Nih Dari Mr. Wanto!"
        })
        await interaction.reply(`Berhasil. Sekarang Posts Baru Mr. Wanto Akan Di Umumkan Di <#${interaction.options.getChannel("subscribe")?.id}>`)
    }   
}