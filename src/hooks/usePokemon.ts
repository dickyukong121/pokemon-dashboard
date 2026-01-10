import { useState, useEffect, useCallback, useRef } from "react";
import type { PokemonDetail } from "@/types/pokemon";
import { fetchMorePokemons, fetchPokemons } from "@/services/pokemon.service";
import { debounceTime, Subject } from "rxjs";

export const usePokemon = (
  initialLimit = 50,
  pageSize = 50,
  debounceMs = 2000
) => {
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const countRef = useRef<number>(0);
  const hasMoreRef = useRef<boolean>(true);

  useEffect(() => {
    countRef.current = pokemon.length;
    hasMoreRef.current = hasMore;
  }, [pokemon.length, hasMore]);

  const initialFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allPokemonData = await fetchPokemons(initialLimit);
      setPokemon(allPokemonData);
    } catch (err) {
      setError("Failed to load the Pokemon. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  const fetchMore$ = useRef(new Subject<void>());

  const furtherFetch = useCallback(() => {
    fetchMore$.current.next();
  }, []);

  useEffect(() => {
    const subscription = fetchMore$.current
      .pipe(debounceTime(debounceMs))
      .subscribe(async () => {
        if (!hasMoreRef.current) return;

        setError(null);
        try {
          const current = countRef.current;
          const newData = await fetchMorePokemons(current, pageSize);
          if (newData.length === 0) {
            setHasMore(false);
          } else {
            setPokemon((prev) => [...prev, ...newData]);
            setHasMore(newData.length === pageSize);
          }
        } catch (err) {
          setError("Failed to load more Pokemon data. Please try again.");
        }
      });

    return () => subscription.unsubscribe();
  }, [debounceMs, pageSize]);

  return {
    pokemon,
    loading,
    error,
    hasMore,
    furtherFetch,
    retry: initialFetch,
  };
};
