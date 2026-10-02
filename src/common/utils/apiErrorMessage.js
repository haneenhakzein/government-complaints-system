export function getApiErrorMessage(error, fallback = "حدث خطأ غير متوقع") {
  if (!error?.response) {
    if (error?.code === "ECONNABORTED") {
      return "انتهت مهلة الاتصال. حاول مرة أخرى.";
    }
    return "تعذر الاتصال بالخادم.";
  }

  const data = error.response.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message.trim();
  }

  if (data?.errors && typeof data.errors === "object") {
    const first = Object.values(data.errors)[0];
    const text = Array.isArray(first) ? first[0] : first;
    if (typeof text === "string" && text.trim()) return text.trim();
  }

  const status = error.response.status;
  if (status === 401) return "انتهت الجلسة. سجّل الدخول من جديد.";
  if (status === 403) return "ما عندك صلاحية لهذه العملية.";
  if (status === 404) return "العنصر المطلوب غير موجود.";
  if (status >= 500) return "خطأ من الخادم. حاول لاحقاً.";

  return fallback;
}
