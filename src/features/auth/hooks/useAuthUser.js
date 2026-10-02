import { getSession } from "@/common/auth/session";

export default function useAuthUser() {
  const { user, token } = getSession();

  return { user, role: user?.role, token };
}
