import { config } from "dotenv"
import loadHandlers from "./Handlers"
import { Client, GatewayIntentBits } from "discord.js"
import { connect } from "mongoose";

config();

(async () => {
    /* This like permission or smthng idk */
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

    // connect to the database
    await connect(process.env.MONGODB_URI!)
    console.log("Connected to the Database.")
    
    // load all handlers
    await loadHandlers(client)

    await client.login(process.env.TOKEN)

})().catch(err => {
    console.error(err)
})