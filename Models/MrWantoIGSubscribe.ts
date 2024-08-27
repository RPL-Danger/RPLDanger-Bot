import { Schema, model } from "mongoose";
import { IMrWantoIGSubscribe } from "../Types";

const MrWantoIGSubscribe = new Schema<IMrWantoIGSubscribe>({
    lastPostCount: {type: Number},
    lastPostId: {type: String},
    subscriberChannelsIds: {type: [String]}
})

const mrWantoIGSubscribe = model('MrWantoIGSubscribe', MrWantoIGSubscribe)

