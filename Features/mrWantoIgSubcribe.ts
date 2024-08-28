import { schedule } from "node-cron"
import { Client } from "discord.js"
import Instagram from "../Utils/instagram";

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
        const mrWanto = await ig.user.search("mraihanaf")
        ig.mrWantoId = mrWanto.users[0].pk

        const post = await ig.getPosts(ig.mrWantoId)
        console.log(post)
        console.log(mrWanto)
        schedule("*/5 * * * *", async() => {
            console.log("Checking Mr. Wanto Instagram")
            try {
                const post = await ig.getPosts(ig.mrWantoId)
            } catch (err) {
                // relogin
                client.instagram = new Instagram()
                await client.instagram.login()
            }
        })
    }
}