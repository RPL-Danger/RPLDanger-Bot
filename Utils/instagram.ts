import { IgApiClient, UserFeed, UserFeedResponseItemsItem } from "instagram-private-api";

export default class Instagram extends IgApiClient {
    constructor() {
        super()

    }
    async login(): Promise<void> {
        await this.state.generateDevice(process.env.INSTAGRAM_USERNAME!)
        await this.simulate.preLoginFlow()
        await this.account.login(process.env.INSTAGRAM_USERNAME!, process.env.INSTAGRAM_PASSWORD!)
    }

    async getPosts(userid: number): Promise<UserFeedResponseItemsItem[]>{
        const user: UserFeed = await this.feed.user(userid)
        return user.items()
    }

    async getLatestPost(userid: number){
        const posts: UserFeedResponseItemsItem[] = await this.getPosts(userid)
        return posts[0]
    }
}