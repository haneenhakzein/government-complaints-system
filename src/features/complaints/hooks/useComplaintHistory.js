import { useState } from "react";
import { getComplaintHistory } from "../services/complaintsService";

export default function useComplaintHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async (complaintId) => {
    setLoading(true);
    setError(null);

    try {
      const body = await getComplaintHistory(complaintId);
      setHistory(body);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { history, loading, error, fetchHistory };
}
