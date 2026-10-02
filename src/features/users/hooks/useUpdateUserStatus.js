import { useState } from "react";
import { activateUser, deactivateUser } from "../services/usersService";

export default function useUpdateUserStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = async (userId, newStatus, changeReason) => {
    try {
      setLoading(true);
      setError(null);

      if (newStatus === "active") {
        await activateUser(userId, changeReason);
      } else {
        await deactivateUser(userId, changeReason);
      }

      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
}
