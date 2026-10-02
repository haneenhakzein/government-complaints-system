import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { createEmployee } from "../services/usersService";

export default function useCreateEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      return await createEmployee(payload);
    } catch (err) {
      const message = getApiErrorMessage(err, "تعذر إضافة الموظف");
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createEmployee: create, loading, error };
}
