import { transferEmployee } from "../services/usersService";

export default function useTransferEmployee() {
  const transfer = async (userId, payload) => transferEmployee(userId, payload);

  return { transferEmployee: transfer };
}
