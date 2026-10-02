export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  COMPLAINTS: {
    LIST: (page = 1) => `/complaints?page=${page}`,
    STATUS_COUNTS: "/complaints/statistics/status-counts",
    BY_ID: (id) => `/complaints/${id}`,
    RESERVE: (id) => `/complaints/${id}/reserve`,
    STATUS: (id) => `/complaints/${id}/status`,
    NOTES: (id) => `/complaints/${id}/notes`,
    HISTORY: (id) => `/complaints/${id}/history`,
    ATTACHMENTS: (id) => `/complaints/${id}/attachments`,
  },
  ATTACHMENTS: {
    VIEW: "/attachments/view",
  },
  ENTITIES: {
    LIST: (page = 1) => `/entities?page=${page}`,
    ALL: "/entities",
    CREATE: "/entities",
    BY_ID: (id) => `/entities/${id}`,
  },
  USERS: {
    LIST: (page = 1) => `/users?page=${page}`,
    CREATE_EMPLOYEE: "/users/employees",
    BY_ID: (id) => `/users/${id}`,
    ROLE: (id) => `/users/${id}/role`,
    ACTIVATE: (id) => `/users/${id}/activate`,
    DEACTIVATE: (id) => `/users/${id}/deactivate`,
    TRANSFER: (id) => `/users/${id}/transfer`,
  },
  REPORTS: {
    LIST: "/reports",
    EXPORT: {
      complaints: "/reports/complaints/export",
      users: "/reports/users/export",
      audit_logs: "/reports/audit-logs/export",
    },
  },
};
