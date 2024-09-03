import { SlashCommandBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle, APIActionRowComponent, APIButtonComponent, EmbedBuilder, ActionRowBuilder } from "discord.js";
import { WouldYouRatherModel, ReportModel } from "../Models/WouldYouRather";
import { IOption, IWouldYouRather } from "../Types";
import { HydratedDocument } from "mongoose";
export default {
    data: new SlashCommandBuilder()
          .setName("wouldyourather")
          .setDescription("Would You Rather Game"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const count: number = await WouldYouRatherModel.countDocuments()
        const random: number = Math.floor(Math.random() * count)
        const randomwyr: HydratedDocument<IWouldYouRather>|null = await WouldYouRatherModel.findOne().skip(random).exec()
        let translatedInfoMsg: string = ``
        const genOptionValue: (option: IOption) => string = (option: IOption) => option.translate ? option.translate : option.original
        let gtExpectedLength: boolean = false
        for(const option of randomwyr?.options!){
            for(const prop of ["translate","original"] as Array<keyof IOption>){
                if(typeof option[prop] === "string" && option[prop].length >= 80){
                    gtExpectedLength = true
                }
                if(gtExpectedLength) break;
            }
        }
        let buttons = randomwyr?.options.map((option, index) => new ButtonBuilder()
            .setLabel(gtExpectedLength ? `Option ${index+1}` : genOptionValue(option))
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
        const gtStr = gtExpectedLength ? randomwyr?.options.map((opt, index) => `Option ${index+1}: ${genOptionValue(opt)}`).join("\n") : ""
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
        reply.edit({components:[]})
        const choiceId = userInteraction.customId
        if(choiceId == 'report'){
            embed.setDescription(`Sukses dilaporkan, terimakasih sudah melapor!`)
            const report = new ReportModel({
                wouldYouRatherId: randomwyr?._id,
                reported_by: {
                    username: interaction.user.globalName,
                    userid: interaction.user.id
                }
            })
            report.save()
            return await reply.edit({embeds: [embed], components: []})
        }
        userInteraction.reply({content: `Kamu memilih Option ${parseInt(choiceId)+1} : ${genOptionValue(randomwyr?.options[parseInt(choiceId)]!)}`, ephemeral: true})
        const optionVotesTotal: number|undefined = randomwyr?.options.map(option => option.votes).reduce((total, value) => total + value)
        embed.setDescription(`${userInteraction.user} memilih Option ${parseInt(choiceId)+1} : ${genOptionValue(randomwyr?.options[parseInt(choiceId)]!)}\n\n${randomwyr?.options.map(option => `**${Math.round((option.votes/optionVotesTotal!)*100)}%** - ${genOptionValue(option)}`).join("\n")}`)
        const continueButton = new ButtonBuilder()
            .setCustomId("continue")
            .setLabel("Lanjut")
            .setStyle(ButtonStyle.Primary)
        const rowContinue: APIActionRowComponent<APIButtonComponent> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(continueButton!)
            .toJSON()
        await reply.edit({embeds: [embed], components: [rowContinue]})
        const continueInteraction = await reply.awaitMessageComponent({
            time: 30_000
        }).catch(err => {
            reply.edit({embeds: [embed], components:[]})
        })
        if(!continueInteraction) return
        interaction.followUp(`Coming Soon! (Devnya puyeng bejir)\nSementara mulai pake command dulu ya.`)
        reply.edit({components:[]})
    }

}
