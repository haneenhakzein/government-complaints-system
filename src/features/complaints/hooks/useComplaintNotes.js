import { useEffect, useState } from "react";
import { getComplaintNotes } from "../services/complaintsService";

export default function useComplaintNotes(complaintId, open) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!complaintId || !open) return;

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const body = await getComplaintNotes(complaintId);
        setNotes(body || []);
      } catch {
        setError("فشل تحميل الملاحظات");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [complaintId, open]);

  return { notes, setNotes, loading, error };
}
