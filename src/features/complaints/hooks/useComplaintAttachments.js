import { useEffect, useState } from "react";
import { getComplaintAttachments } from "../services/complaintsService";

export default function useComplaintAttachments(complaintId, enabled = true) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttachments = async () => {
    if (!complaintId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getComplaintAttachments(complaintId);
      setAttachments(data);
    } catch {
      setError("فشل تحميل المرفقات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled || !complaintId) return;

    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getComplaintAttachments(complaintId);
        if (active) setAttachments(data);
      } catch {
        if (active) setError("فشل تحميل المرفقات");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [complaintId, enabled]);

  return { attachments, loading, error, refetch: fetchAttachments };
}
