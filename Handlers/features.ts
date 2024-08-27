import { readdirSync } from "fs"
import { join } from "path"
import { Client } from "discord.js"
import { IFeatures } from "../Types"

const featPath = join(__dirname, "../Features")
const featFiles = readdirSync(featPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

export async function loadFeatures(client:Client): Promise<void> {
    for(const file of featFiles){
        const filePath: string = join(featPath, file)
        const loadFeat: IFeatures = (await import(filePath)).default
        await loadFeat.load(client)
    }
}