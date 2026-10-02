import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { updateUser } from "../services/usersService";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUpdate = async (userId, data) => {
    setLoading(true);
    setError(null);
    try {
      return await updateUser(userId, data);
    } catch (err) {
      setError(getApiErrorMessage(err, "حدث خطأ"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitUpdate, loading, error };
}
