export interface IPostsInfo {
    userInstaId: number | string,
    latestPostId: string,
    count: number
}

export interface IMrWantoIGSubscribe {
    guildId: string,
    channelId: string,
    customMessage: string | null,
    lastPost: IPostsInfo
}

