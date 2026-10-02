export function mapComplaint(apiData = {}) {
  return {
    id: apiData.id,
    reference: apiData.reference,
    type: apiData.type ? apiData.type.toString() : "",
    status: apiData.status,
    description: apiData.description,
    location: apiData.location,
    date: apiData.created_at,
    citizenName: apiData.citizen?.name?.toString() || "غير معروف",
    citizenEmail: apiData.citizen?.email || "غير متوفر",
    citizenPhone: apiData.citizen?.phone || "غير متوفر",
    department: apiData.entity?.name?.toString() || "غير مذكور",
    departmentDescription: apiData.entity?.description || "—",
    locker: apiData.locker || null,
    attachments: apiData.attachments || [],
    notes: apiData.notes || [],
    locked_by: apiData.locked_by || null,
    locked_until: apiData.locked_until || null,
    lock_token: apiData.lock_token || null,
  };
}

export function mapComplaintList(items) {
  if (!Array.isArray(items)) return [];
  return items.map(mapComplaint);
}
