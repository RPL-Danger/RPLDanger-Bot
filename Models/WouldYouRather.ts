import { model, Schema } from "mongoose";
import { IOption, IReport, IReportedBy, IWouldYouRather } from "../Types";

const OptionSchema = new Schema<IOption>({
    translate: { type: String },
    original: { type: String },
    votes: { type: Number }
})

const ReportedBySchema = new Schema<IReportedBy>({
    userid: { type: String, required: true },
    username: { type: String, required: true }
})

const ReportSchema = new Schema<IReport>({
    wouldYouRatherId: { type: String, required: true },
    reported_by: { type: ReportedBySchema, required: true }
})

const WouldYouRatherSchema = new Schema<IWouldYouRather>({
    options: { type: [OptionSchema], required: true }
})

const WouldYouRatherModel = model('wouldyourathers', WouldYouRatherSchema)
const ReportModel = model("wouldyourathers_report", ReportSchema)

export {WouldYouRatherModel, ReportModel}
