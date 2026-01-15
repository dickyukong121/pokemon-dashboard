import { fetchGenerations } from "@/services/generation.service";
import type { GenerationDetail } from "@/types/generation";
import { all } from "axios";
import { useCallback, useEffect, useState } from "react";

const useGeneration = () => {
  const [generation, setGeneration] = useState<GenerationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allGenerationData = await fetchGenerations();
      setGeneration(allGenerationData);
    } catch (err) {
      setError("Failed to load the Generation. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);


  return { generation, loading, error };
};

export default useGeneration;