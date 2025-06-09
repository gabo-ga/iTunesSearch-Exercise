import type { NextApiRequest, NextApiResponse } from "next";
import { searchItunes } from "./itunes";
import type { ApiResponse, MediaItem } from "../models/itunes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<MediaItem> | { error: string }>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { term = '', media = 'all', limit = 25, offset = 0 } = req.query;

    if (Array.isArray(term) || Array.isArray(media) || Array.isArray(limit) || Array.isArray(offset)) {
        return res.status(400).json({ error: "Invalid query parameters" });
    }

    const params = {
        term: term.toString().trim(),
        media: media.toString(),
        limit: parseInt(limit.toString(), 10),
        offset: parseInt(offset.toString(), 10)
    }

    try {
        const data = await searchItunes(params);
        return res.status(200).json(data);
    } catch (error: any) {
        console.error("Error in API handler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}