import { ClientEvents, Client, SlashCommandBuilder, Collection } from "discord.js"
export interface IEvent {
    name: keyof ClientEvents,
    once: Boolean,
    execute: Function
}

export interface ICommands {
    data: SlashCommandBuilder,
    execute: Function
}

export interface IFeatures {
    load: Function
}

