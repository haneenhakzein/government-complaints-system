import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { reserveComplaintRequest } from "../services/complaintsService";

export default function useReserveComplaint() {
  const reserveComplaint = async (id) => {
    try {
      const body = await reserveComplaintRequest(id);
      return { success: true, data: body.data };
    } catch (err) {
      return {
        success: false,
        message: getApiErrorMessage(err, "حدث خطأ أثناء الحجز"),
      };
    }
  };

  return { reserveComplaint };
}
