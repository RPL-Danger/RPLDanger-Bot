import { connect } from "mongoose";

export const enable = true;

export default {
    enable,
    load: async () => {
        await connect(process.env.MONGODB_URI!)
        console.log(`Connected to the mongodb database.`)
    }
}