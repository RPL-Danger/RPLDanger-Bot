import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AutoModerationRuleKeywordPresetType, APIActionRowComponent, APIButtonComponent, EmbedAssertions } from "discord.js";

const choices = [
    { name: "Batu", emoji: "🌑", beats: "Gunting" },
    { name: "Gunting", emoji: "✂", beats: "Kertas"},
    { name: "Kertas", emoji: "📄", beats: "Batu" }
]

export default {
    data: new SlashCommandBuilder()
          .setName("bgk")
          .setDescription("Batu Gunting Kertas")
          .addUserOption(option => option
            .setName("user")
            .setDescription("User Yang Ingin Kamu Tantang!")
            .setRequired(true)
          ),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const targetUser = interaction.options.getUser("user")
        if(interaction.user.id == targetUser?.id) return interaction.reply({
            content: `Kamu Gabisa Main Sama Diri Kamu Sendiri.`,
            ephemeral: true
        })
        if(targetUser?.bot) return interaction.reply({
            content: `Kamu Gabisa Main Sama Bot.`,
            ephemeral: true
        })
        const embed = new EmbedBuilder()
            .setTitle("Batu Gunting Kertas")
            .setDescription(`Sekarang Giliran ${targetUser}.`)
            .setColor("Yellow")
            .setTimestamp(new Date())
        
        const buttons = choices.map(choice => {
            return new ButtonBuilder()
                .setCustomId(choice.name)
                .setLabel(choice.name)
                .setEmoji(choice.emoji)
                .setStyle(ButtonStyle.Primary)
        })
        const row: APIActionRowComponent<APIButtonComponent> = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons).toJSON();

        const reply = await interaction.reply({
            content: `${targetUser}, kamu telah ditantang oleh ${interaction.user}. Untuk mulai bermain, tekan salah satu tombol dibawah.`,
            embeds: [embed],
            components: [row]
        })
        
        const targetUserInteraction = await reply.awaitMessageComponent({
            filter: i => i.user.id == targetUser?.id,
            time: 30_000,
        }).catch(async err => {
            embed.setDescription(`Game berakhir. ${targetUser} gak respon`)
            await reply.edit({embeds: [embed], components: []})
        })
        if(!targetUserInteraction) return
        const targetUserChoice = choices.find(choice => choice.name == targetUserInteraction.customId)
        await targetUserInteraction.reply({
            content: `Kamu memilih ${targetUserChoice?.name! + targetUserChoice?.emoji!}`,
            ephemeral: true
        })
        embed.setDescription(`Sekarang giliran ${interaction.user}.`)
        await reply.edit({
            content: `${interaction.user} sekarang giliran kamu.`,
            embeds: [embed]
        })
        const initialUserInteraction = await reply.awaitMessageComponent({
            filter: i => i.user.id == interaction.user.id,
            time: 30_000,
        }).catch(async err => {
            embed.setDescription(`Game berakhir. ${interaction.user} gak respon`)
            await reply.edit({embeds: [embed], components: []})
        })
        if(!initialUserInteraction) return
        const initialUserChoice = choices.find(choice => choice.name == initialUserInteraction.customId)
        let result;
        if(targetUserChoice?.beats === initialUserChoice?.name) {
            result = `${targetUser} menang!`
        }
        if(initialUserChoice?.beats === targetUserChoice?.name) {
            result = `${interaction.user} menang!`
        }
        if(initialUserChoice?.name === targetUserChoice?.name) {
            result = `Game seri!`
        }
        embed.setDescription(
            `${targetUser} pilih ${targetUserChoice?.name! + targetUserChoice?.emoji!}\n${interaction.user} pilih ${initialUserChoice?.name! + initialUserChoice?.emoji}
            \n\n${result}`
        )
        reply.edit({embeds: [embed], components: []})
    }
}