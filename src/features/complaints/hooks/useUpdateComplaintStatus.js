import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { updateComplaintStatusRequest } from "../services/complaintsService";

export default function useUpdateComplaintStatus() {
  const updateStatus = async (id, data) => {
    try {
      const body = await updateComplaintStatusRequest(id, data);
      return { success: true, data: body.data };
    } catch (err) {
      return {
        success: false,
        message: getApiErrorMessage(err, "حدث خطأ أثناء تعديل الحالة"),
      };
    }
  };

  return { updateStatus };
}
