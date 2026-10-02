function trimTrailingSlash(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
  return trimTrailingSlash(configured);
}
