import { model, Schema } from "mongoose";
import { IOption, IWouldYouRather } from "../Types";

const OptionSchema = new Schema<IOption>({
    translate: { type: String },
    original: { type: String },
    votes: { type: Number }
})

const WouldYouRatherSchema = new Schema<IWouldYouRather>({
    options: { type: [OptionSchema], required: true }
})

const WouldYouRatherModel = model('wouldyourathers', WouldYouRatherSchema)

export default WouldYouRatherModel
