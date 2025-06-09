import { off } from "process";

export interface MediaItem {
    trackId? : number;
    collectionId? : number;
    artworkUrl100? : string;
    trackName? : string;
    collectionName? : string;
    artistName? : string;
    kind? : string;
    collectionPrice? : number;
    trackPrice? : number;
    currency? : string;
}

export interface ApiResponse<T>{
    resultCount: number;
    results: T[];
}

export interface SearchParams {
    term: string;
    media?: string;
    limit?: number;
    offset?: number;
}
