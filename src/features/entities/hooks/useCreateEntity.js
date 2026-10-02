import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { createEntity } from "../services/entitiesService";

export default function useCreateEntity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addEntity = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      return await createEntity(payload);
    } catch (err) {
      setError(getApiErrorMessage(err, "حدث خطأ أثناء إضافة القسم"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addEntity, loading, error };
}
