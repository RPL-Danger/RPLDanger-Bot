import { IgApiClient, UserFeed, UserFeedResponseItemsItem } from "instagram-private-api";
import { IPostsInfo, ILatestPost } from "../Types";

type HandlePostDelete = (deletedPostsCount: number) => void

export default class Instagram extends IgApiClient {
    constructor() {
        super()

    }
    async login(): Promise<void> {
        await this.state.generateDevice(process.env.INSTAGRAM_USERNAME!)
        await this.simulate.preLoginFlow()
        await this.account.login(process.env.INSTAGRAM_USERNAME!, process.env.INSTAGRAM_PASSWORD!)
    }

    async getPosts(userid: number | string): Promise<UserFeedResponseItemsItem[]>{
        const user: UserFeed = await this.feed.user(userid)
        return user.items()
    }

    async getLatestPost(userid: number): Promise<ILatestPost>{
        const posts: UserFeedResponseItemsItem[] = await this.getPosts(userid)
        return {
            data: posts[0],
            count: posts.length
        }
    }

    

    async comparePost(oldPostsInfo: IPostsInfo, newPostsInfo: IPostsInfo, handlePostDelete: HandlePostDelete): Promise<UserFeedResponseItemsItem[] | null> {
        if((oldPostsInfo.count == newPostsInfo.count) && (oldPostsInfo.latestPostId == newPostsInfo.latestPostId) && (oldPostsInfo.userInstaId == newPostsInfo.userInstaId)) return null
        if(oldPostsInfo.count > newPostsInfo.count){
            const deletedPostsCount: number = oldPostsInfo.count - newPostsInfo.count
            await handlePostDelete(deletedPostsCount)
            return null
        }
        const newPostsLength = newPostsInfo.count - oldPostsInfo.count
        let latestPost: UserFeedResponseItemsItem[] = []
        const posts = await this.getPosts(newPostsInfo.userInstaId)
        for(let index = 0; index < newPostsLength; index++){
            latestPost.push(posts[index])    
        }
        return latestPost
    }
}