export function mapUser(apiData = {}) {
  return {
    ...apiData,
    id: apiData.id,
    name: apiData.name ?? "",
    email: apiData.email ?? "",
    phone: apiData.phone ?? "",
    role: apiData.role ?? "",
    entity: apiData.entity ?? null,
    is_locked: Boolean(apiData.is_locked),
    created_at: apiData.created_at ?? "",
  };
}

export function mapUserList(items) {
  if (!Array.isArray(items)) return [];
  return items.map(mapUser);
}
