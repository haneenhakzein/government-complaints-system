import { useEffect, useState } from "react";
import { getEntities } from "../services/entitiesService";

export default function useEntities() {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntities = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const list = await getEntities(page);
      setEntities(list);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return { entities, isLoading, error, refetch: fetchEntities };
}
