import { useEffect, useState } from "react";
import { getAllEntities } from "../services/entitiesService";

export default function useEntityOptions() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const list = await getAllEntities();
        setEntities(list);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { entities, loading };
}
