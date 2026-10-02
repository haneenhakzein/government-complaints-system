import { useEffect, useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { getUsers } from "../services/usersService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUsers(page);
      setUsers(result.users);
      setPagination(result.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err, "حدث خطأ أثناء جلب المستخدمين"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, pagination, fetchUsers };
}
