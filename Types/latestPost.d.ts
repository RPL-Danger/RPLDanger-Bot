import { UserFeedResponseItemsItem } from "instagram-private-api"
export interface ILatestPost{
    data: UserFeedResponseItemsItem,
    count: number
}