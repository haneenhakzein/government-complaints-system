import { useEffect, useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { getReports } from "../services/reportsService";

export default function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const list = await getReports();
      setReports(list);
    } catch (err) {
      setError(getApiErrorMessage(err, "فشل تحميل التقارير"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return { reports, loading, error, refetch: fetchReports };
}
