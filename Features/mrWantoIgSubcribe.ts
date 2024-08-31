import { schedule } from "node-cron"
import { Client } from "discord.js"
import Instagram from "../Utils/instagram";
import MrWantoModel from "../Models/MrWantoIG";
import { IPostsInfo } from "../Types";

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
        await check(client)
        schedule("0 * * * *", async () => {
            const randomDuration: number = Math.floor(Math.random() * 1000*60*3)
            await setTimeout(async () => await check(client), randomDuration)
        })
    }
}

async function check(client: Client) {
    const ig = client.instagram
    const time = new Date();
    console.log("Checking Mr. Wanto Instagram",`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
    try {
        const latestPostData = await ig.getLatestPost(ig.mrWantoId)
        const latestPost: IPostsInfo = {
            userInstaId: ig.mrWantoId,
            latestPostId: latestPostData.data.id,
            count: latestPostData.count
        }
        const mrWantoIg = MrWantoModel.getInstance()
        const update = async () => await mrWantoIg.findOneAndUpdate({}, latestPost, { upsert: true, new: true})
        let oldPost: IPostsInfo | null = await mrWantoIg.findOne({})
        if(!oldPost){ 
            oldPost =  await update()
        }
        const handlePostDelete = async (count: number) => {
            console.log("Post nya ada yang di delete, count: "+ count)
            await update()
            return
        }
        const newPosts = await ig.comparePost(oldPost!, latestPost, handlePostDelete) 
        if(newPosts) return console.log(`new post`, newPosts)
        console.log("No new posts from mr.wanto.")
        await update()
    } catch (err) {
        // relogin
        console.error(err)
        console.log()
        client.instagram = new Instagram()
        await client.instagram.login()
    }
}