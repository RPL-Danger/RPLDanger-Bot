export interface IWouldYouRather {
    options: IOption[]
}

export interface IOption {
    original: string,
    translate: string | null,
    votes: number
}

export interface IReport {
    wouldYouRatherId: string,
    reported_by: IReportedBy
}

export interface IReportedBy {
    username: string,
    userid: string
}