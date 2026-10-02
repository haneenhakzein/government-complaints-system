export function mapEntity(apiData = {}) {
  return {
    ...apiData,
    id: apiData.id,
    name: apiData.name ?? "",
    description: apiData.description ?? "",
    employees_count: apiData.employees_count ?? 0,
    complaints_count: apiData.complaints_count ?? 0,
    created_at: apiData.created_at ?? "",
    updated_at: apiData.updated_at ?? "",
  };
}

export function mapEntityList(items) {
  if (!Array.isArray(items)) return [];
  return items.map(mapEntity);
}
