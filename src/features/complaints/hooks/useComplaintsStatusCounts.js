import { useEffect, useState } from "react";
import { getComplaintStatusCounts } from "../services/complaintsService";

export default function useComplaintsStatusCounts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const body = await getComplaintStatusCounts();
      setData(body);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { data, loading, error, refetch: fetchStats };
}
