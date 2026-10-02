export function mapLoginResponse(response) {
  const body = response?.data ?? {};
  const data = body.data ?? {};

  return {
    token: data.token ?? null,
    user: data.user ?? null,
    message: body.message ?? "",
  };
}
