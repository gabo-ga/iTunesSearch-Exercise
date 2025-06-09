import { useState, useEffect } from "react";
import type { MediaItem, ApiResponse } from "../models/itunes";

interface UseSearchParams {
    term: string;
    media?: string;
}

export function useSearch({term, media}: UseSearchParams){
    const [results, setResults] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        if(!term.trim()){
            setResults([]);
            setIsError(false);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setIsError(false);

        fetch(`/api/search?term=${encodeURIComponent(term)}&media=${media || 'all'}`)
        .then(async (res) => {
            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = (await res.json()) as ApiResponse<MediaItem>;
            if(!cancelled) setResults(data.results || []);
    })
    .catch(() => {
        if(!cancelled) setIsError(true);
    })
    .finally(() => {
        if(!cancelled) setLoading(false);
    })

    return () => {
        cancelled = true;
    }
}, [term, media]);
return { results, loading, isError };
}