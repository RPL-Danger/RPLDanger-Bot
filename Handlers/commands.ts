import { join } from "path"
import { readdirSync } from "fs"
import { Client, Collection, REST, Routes, RESTPostAPIApplicationGuildCommandsJSONBody } from "discord.js"
import { ICommands } from "../Types"

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, ICommands>;
    }
}

const cmdPath = join(__dirname, "../Commands")
const cmdFiles = readdirSync(cmdPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))
const commands: Array<RESTPostAPIApplicationGuildCommandsJSONBody> = []

export async function registerCommands(client: Client){
    client.commands = new Collection()
    for(const file of cmdFiles){
        const filePath = join(cmdPath, file)
        const command: ICommands = (await import(filePath)).default
        if(command?.enable === false){
            console.log(`Command ${command.data.name} disabled.`)
            continue
        };
        client.commands.set(command.data.name, command)
        commands.push(command.data.toJSON())
    }
    // deploy commands
    const rest = new REST().setToken(process.env.TOKEN!)
    try {
        console.log(`Started refreshing ${client.commands.size} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commands }
        )
    } catch (err) {
        console.error(err)
    }
}