import { ClientEvents, Client, SlashCommandBuilder, Collection } from "discord.js"
export interface IEvent {
    name: keyof ClientEvents,
    once: Boolean,
    execute: Function
}

export interface ICommands {
    enable: Boolean | undefined | null,
    data: SlashCommandBuilder,
    execute: Function
}

export interface IFeatures {
    load: Function,
    enable: Boolean | undefined | null
}

