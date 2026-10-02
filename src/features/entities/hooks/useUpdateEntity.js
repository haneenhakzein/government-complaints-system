import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { updateEntity } from "../services/entitiesService";

export default function useUpdateEntity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editEntity = async (id, payload) => {
    try {
      setLoading(true);
      setError(null);
      return await updateEntity(id, payload);
    } catch (err) {
      setError(getApiErrorMessage(err, "فشل تعديل القسم"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editEntity, loading, error };
}
