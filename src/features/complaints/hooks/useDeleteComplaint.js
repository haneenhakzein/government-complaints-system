import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { deleteComplaintRequest } from "../services/complaintsService";

export default function useDeleteComplaint() {
  const deleteComplaint = async (id) => {
    try {
      const body = await deleteComplaintRequest(id);
      return { success: true, message: body?.message };
    } catch (err) {
      return {
        success: false,
        message: getApiErrorMessage(err, "حدث خطأ أثناء حذف الشكوى"),
      };
    }
  };

  return { deleteComplaint };
}
