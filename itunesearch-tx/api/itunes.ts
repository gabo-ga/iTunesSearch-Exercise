import axios from "axios";
import type { ApiResponse, MediaItem, SearchParams } from "../models/itunes";

const BASE_URL = "https://itunes.apple.com/search";

export async function searchItunes(params: SearchParams): Promise<ApiResponse<MediaItem>> {
    const { term , media, limit = 25, offset =0 } = params;
    const q = term.trim().replace(/\s+/g, "+");
    const query = new URLSearchParams({
        term: q,
        ...(media && media !== "all" ? { media } : {}),
        limit: limit.toString(),
        offset: offset.toString(),
    }).toString();


    try {
        const response = await axios.get<ApiResponse<MediaItem>>(`${BASE_URL}?${query}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching data from iTunes API:", error);
        throw error;
    }
}