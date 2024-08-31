import { Client } from "discord.js"
import { registerCommands } from "./commands"
import { registerEvents } from "./events"

export default async function loadHandler(client: Client){
    await registerCommands(client)
    await registerEvents(client)
    console.log("Handlers loaded.")
}