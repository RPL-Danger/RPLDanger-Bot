import { Client } from "discord.js";
import { Redis } from "ioredis";

declare module "discord.js" {
    interface Client {
        redisClient: Redis
    }
}
export const enable = true;


export default {
    enable,
    load: async (client: Client) => {
        const redistClient = getRedisClient(client);      
    }
}

export const getRedisClient = (client: Client): Redis => {
    if(!client.redisClient){
        client.redisClient = new Redis(process.env.REDIS_URL!);
        client.redisClient.on("error", (err) => {
            console.error("Redis error : ",err)
        })
        client.redisClient.on("connect", () => {
            console.log("Connected to the redis database.")
        })
    }
    return client.redisClient
} 