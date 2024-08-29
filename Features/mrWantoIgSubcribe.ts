import { schedule } from "node-cron"
import { Client } from "discord.js"
import Instagram from "../Utils/instagram";
import mrWantoDb from "../Models/MrWantoIGSubscribe";
import { IMrWantoIGSubscribe } from "../Types";

declare module "instagram-private-api" {
    interface IgApiClient {
        mrWantoId: number;
    }
}

declare module "discord.js" {
    interface Client {
        instagram: Instagram;
    }
}

export default {
    /* Cek Instagram pak wanto setiap 5 menit */
    load: async (client: Client) => {
        client.instagram = new Instagram();
        const ig: Instagram = client.instagram
        await ig.login();
        const mrWanto = await ig.user.searchExact("wantoariwibowo")
        ig.mrWantoId = mrWanto.pk
        schedule("*/5 * * * *", async() => {
            console.log("Checking Mr. Wanto Instagram")
            try {
                const latestPost = await ig.getLatestPost(ig.mrWantoId)
                const subscribedServers: IMrWantoIGSubscribe[] = await mrWantoDb.find()
                
                
            } catch (err) {
                // relogin
                client.instagram = new Instagram()
                await client.instagram.login()
            }
        })
    }
}