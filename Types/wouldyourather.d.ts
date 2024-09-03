export interface IWouldYouRather {
    options: IOption[]
}

export interface IOption {
    original: string,
    translate: string | null,
    votes: number
}

