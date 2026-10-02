import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { deleteEntityRequest } from "../services/entitiesService";

export default function useDeleteEntity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEntity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await deleteEntityRequest(id);
    } catch (err) {
      setError(getApiErrorMessage(err, "فشل حذف القسم"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEntity, loading, error };
}
