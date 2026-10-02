import { useEffect, useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { getComplaints } from "../services/complaintsService";

export default function useComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComplaints = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const list = await getComplaints(page);
      setComplaints(list);
    } catch (err) {
      setError(getApiErrorMessage(err, "فشل تحميل الشكاوى"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return { complaints, loading, error, refetch: fetchComplaints, setComplaints };
}
