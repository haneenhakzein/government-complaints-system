import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { addComplaintNoteRequest } from "../services/complaintsService";

export default function useAddComplaintNote() {
  const addNote = async (complaintId, payload) => {
    try {
      const body = await addComplaintNoteRequest(complaintId, payload);
      return { success: true, data: body.data };
    } catch (err) {
      return {
        success: false,
        message: getApiErrorMessage(err, "حدث خطأ أثناء إضافة الملاحظة"),
      };
    }
  };

  return { addNote };
}
