import { Schema, model } from "mongoose";
import { IMrWantoIGSubscribe } from "../Types";

const MrWantoIGSubscribe = new Schema<IMrWantoIGSubscribe>({
    guildId: {type: String, required: true},
    channelId: {type: String, required: true},
    customMessage: {type: String},
    lastPost: {
        latestPostId: {type: String},
        count: {type: Number}
    }
})

const mrWantoDb = model('MrWantoIGSubscribe', MrWantoIGSubscribe)

export default mrWantoDb
