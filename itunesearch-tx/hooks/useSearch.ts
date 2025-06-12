"use client";

import { useState, useEffect } from "react";
import type { MediaItem } from "../models/itunes";
import type { ApiResponse, SearchParams } from "../models/itunes";
import { searchItunes } from "../api/itunes";

interface UseSearchParams {
  term: string;
  media?: string;
}

export function useSearch({ term, media }: UseSearchParams) {
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!term.trim()) {
      setResults([]);
      setIsError(false);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setIsError(false);

    const params: SearchParams = {
      term,
      media: media || "all",
      limit: 25,
      offset: 0,
    };

    searchItunes(params)
      .then((data: ApiResponse<MediaItem>) => {
        if (!cancelled) {
          setResults(data.results);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [term, media]);

  return { results, loading, isError };
}
