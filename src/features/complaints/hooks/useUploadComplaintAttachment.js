import { useState } from "react";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { uploadComplaintAttachment } from "../services/complaintsService";

export default function useUploadComplaintAttachment() {
  const [loading, setLoading] = useState(false);

  const uploadAttachment = async (
    complaintId,
    { file, lockToken, expectedVersion, changeReason }
  ) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("lock_token", lockToken);
      formData.append("expected_version", expectedVersion);
      formData.append("change_reason", changeReason);

      const body = await uploadComplaintAttachment(complaintId, formData);

      return {
        success: true,
        data: body.data,
        message: body.message,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "فشل رفع المرفق"),
      };
    } finally {
      setLoading(false);
    }
  };

  return { uploadAttachment, loading };
}
