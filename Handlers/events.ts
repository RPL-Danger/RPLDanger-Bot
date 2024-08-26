import { join } from "path"
import { readdirSync } from "fs"
import { Client } from "discord.js"
import { IEvent } from "../Types"

const eventPath = join(__dirname, "../Events")
const eventFiles = readdirSync(eventPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

export async function registerEvents(client: Client){
    for(const file of eventFiles){
        const filePath = join(eventPath, file)
        const event: IEvent = (await import(filePath)).default
        if(event.once){
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}