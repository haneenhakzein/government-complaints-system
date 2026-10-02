import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { viewAttachment } from "../services/complaintsService";

export default function useOpenAttachment() {
  const openAttachment = async (filePath, mimeType) => {
    try {
      const file = await viewAttachment(filePath);
      const fileURL = window.URL.createObjectURL(new Blob([file], { type: mimeType }));
      window.open(fileURL);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "لا يمكن فتح الملف"),
      };
    }
  };

  return { openAttachment };
}
