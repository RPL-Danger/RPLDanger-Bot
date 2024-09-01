import { IgApiClient, UserFeed, UserFeedResponseItemsItem } from "instagram-private-api";
import { IPostsInfo, ILatestPost } from "../Types";
import { EmbedBuilder } from "discord.js";

type HandlePostDelete = (deletedPostsCount: number) => void

export default class Instagram extends IgApiClient {
    constructor() {
        super()

    }
    async login(): Promise<void> {
        this.state.generateDevice(process.env.INSTAGRAM_USERNAME!)
        await this.simulate.preLoginFlow()
        await this.account.login(process.env.INSTAGRAM_USERNAME!, process.env.INSTAGRAM_PASSWORD!)
    }

    async getPosts(userid: number | string): Promise<UserFeedResponseItemsItem[]>{
        const user: UserFeed = this.feed.user(userid)
        const posts = await user.items()
        return posts
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
        // if(oldPostsInfo.count > newPostsInfo.count){
        //     const deletedPostsCount: number = oldPostsInfo.count - newPostsInfo.count
        //     await handlePostDelete(deletedPostsCount)
        //     return null
        // }
        // if(oldPostsInfo.count == newPostsInfo.count) return null
        // const newPostsLength = newPostsInfo.count - oldPostsInfo.count
        let latestPost: UserFeedResponseItemsItem[] = []
        const posts = await this.getPosts(newPostsInfo.userInstaId)
        // for(let index = 0; index < newPostsLength; index++){
        //     latestPost.push(posts[index])    
        // }
        latestPost.push(posts[0])
        return latestPost
    }

    createEmbed(post: UserFeedResponseItemsItem): EmbedBuilder {
        const postUrl: string = `https://instagram.com/p/${post.code}`
        const mediaUrl = post.image_versions2.candidates[0].url
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setDescription(post.caption?.text ? post.caption.text : "No Caption")
            .setAuthor({name:post.user.username})
            .addFields(
                { name: 'Likes', value: post.like_count.toString() },
                { name: 'Comments', value: post.comment_count.toString() },
            )
            .setImage(mediaUrl)
    }
}