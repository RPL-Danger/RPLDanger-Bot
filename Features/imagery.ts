import { Attachment, Client } from "discord.js"
import { getRedisClient, enable as isRedisEnable } from "./redisDatabase"
import { Redis } from "ioredis"
import { GuildId, ChannelId, IImageryMedia } from "../Types"
export const enable = isRedisEnable
let redis: null|Redis = null;

export default {
    isRedisEnable,
    load: async (client: Client) => {
        redis = getRedisClient(client);
        client.on("messageCreate", async (msg) => {
            if(!msg.guildId) return
            const imageryChannel = await getImageryChannel(msg.guildId!)
            if(!imageryChannel || imageryChannel !== msg.channelId || msg.author.bot) return
        })
    }
}

export async function getImageryChannel(guildId: GuildId): Promise<null|ChannelId|undefined> {
    const isGuildExist = await redis?.hexists("imagery_channel", guildId)
    if(!isGuildExist) return null
    return await redis?.hget("imagery_channel",guildId);
}

export async function setImageryChannel(guildId: GuildId, channelId: ChannelId): Promise<number|undefined> {
    return await redis?.hset("imagery_channel", guildId, channelId);
}

export async function getGuildMedia(guildId: GuildId, rangeStart: number = 0, rangeEnd: number = -1): Promise<IImageryMedia[]> {
    const isExist = await getImageryChannel(guildId)
    if(!isExist) return []
    const gallery = await redis?.lrange(`imagery_gallery_${guildId}`, rangeStart, rangeEnd);
    if(!gallery) return []
    return gallery.map(media => JSON.parse(media))
}

export async function addGuildMedia(guildId: GuildId, imageryMedia: IImageryMedia): Promise<number|undefined>{
    return await redis?.lpush(`imagery_gallery_${guildId}`, JSON.stringify(imageryMedia))
}

export async function removeGuildMedia(guildId: GuildId, imageryMedia: IImageryMedia): Promise<number|undefined> {
    return await redis?.lrem(`imagery_gallery_${guildId}`, 1, JSON.stringify(imageryMedia))
}