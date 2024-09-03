import { SlashCommandBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle, APIActionRowComponent, APIButtonComponent, EmbedBuilder, ActionRowBuilder } from "discord.js";
import WouldYouRatherModel from "../Models/wouldyourather";
import { IOption, IWouldYouRather } from "../Types";
export default {
    data: new SlashCommandBuilder()
          .setName("wouldyourather")
          .setDescription("Would You Rather Game"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const count: number = await WouldYouRatherModel.countDocuments()
        const random: number = Math.floor(Math.random() * count)
        const randomwyr: IWouldYouRather|null = await WouldYouRatherModel.findOne().skip(random).exec()
        let translatedInfoMsg: string = ``
        let gtExpectedLength: boolean = false
        for(const option of randomwyr?.options!){
            for(const prop of ["translate","original"] as Array<keyof IOption>){
                if(typeof option[prop] === "string" && option[prop].length >= 80){
                    gtExpectedLength = true
                    break;
                }
            }
        }
        let buttons = randomwyr?.options.map((option, index) => new ButtonBuilder()
            .setLabel(gtExpectedLength ? `Option ${index}` : option.translate ? option.translate : option.original)
            .setCustomId(index.toString())
            .setStyle(ButtonStyle.Primary)
        )
        const reportButton = new ButtonBuilder()
            .setLabel("Laporkan Masalah Translate")
            .setCustomId("report")
            .setStyle(ButtonStyle.Danger)
        buttons!.push(reportButton)
        const row: APIActionRowComponent<APIButtonComponent> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(buttons!)
            .toJSON()
        const gtStr = gtExpectedLength ? randomwyr?.options.map((opt, index) => `Option ${index}: ${opt.translate ? opt.translate : opt.original}`).join("\n") : ""
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Would You Rather?")
            .setDescription(`Pilih yang mana?\n\n${gtStr ? gtStr : ""}\n\nNote: Data opsi telah ditranslate oleh ai, tolong lapor jika ada kesalahan bahasa.`)
        
        const reply = await interaction.reply({embeds: [embed], components: [row]}) 
        const disabledButtons = buttons!.map(button => button.setDisabled(true))
        const userInteraction = await reply.awaitMessageComponent({
            time: 300_000
        }).catch(() => {
            const row: APIActionRowComponent<APIButtonComponent> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(disabledButtons!)
            .toJSON()
            reply.edit({components: [row]})
        })
        if(!userInteraction) return
        if(userInteraction.user.id !== interaction.user.id) return interaction.reply({content: `Interaksi ini hanya bisa di mainkan ${interaction.user}`, ephemeral: true})
        const choiceId = userInteraction.customId
        if(choiceId == 'report'){
            embed.setDescription(`Sukses dilaporkan, terimakasih sudah melapor!`)
            return reply.edit({embeds: [embed], components: []})
        }
        embed.setDescription(`${userInteraction.user} memilih ${choiceId}`)
        await reply.edit({embeds: [embed], components: []})
    }

}