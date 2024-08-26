import { Events, ChatInputCommandInteraction } from "discord.js"
export default {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction: ChatInputCommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command) return console.error(`No matching ${interaction.commandName} was found.`)
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}