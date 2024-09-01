import mongoose, { Schema, Model } from "mongoose";
import { IPostsInfo } from "../Types";

const mrWantoSchema = new Schema<IPostsInfo>({
    userInstaId: Number,
    latestPostId: String,
    count: Number
})

class MrWantoModel {
    private static instance: Model<IPostsInfo>
    private constructor(){}
    public static getInstance(): Model<IPostsInfo> {
        if(!MrWantoModel.instance){
            MrWantoModel.instance = mongoose.model<IPostsInfo>('MrWantoIG', mrWantoSchema)
        }
        return MrWantoModel.instance
    }
}

export default MrWantoModel