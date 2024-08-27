import { schedule } from "node-cron"
import { Client } from "discord.js"
import { igApi, getCookie } from "insta-fetcher"

declare module "discord.js" {
    export interface Client {
        instagram: igApi;
    }
}

export default {
    /* Cek Instagram pak wanto setiap 5 menit */
    load: async (client: Client) => {
        const cookie = await getCookie(process.env.INSTAGRAM_USERNAME!, process.env.INSTAGRAM_PASSWORD!)
        const ig = new igApi(cookie.toString())
        client.instagram = ig;
        schedule("*/5 * * * *", async() => {
            console.log("Checking Mr. Wanto Instagram")
            const res = await ig.fetchUserPostsV2('wantoariwibowo')
            console.log(res.count)
        })
    }
}