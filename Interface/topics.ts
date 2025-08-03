export interface ITopic {
    topic : string;
    subtopic: ISubtopic[];
}

export interface ISubtopic {
    id: number
    subtopic: string;
}