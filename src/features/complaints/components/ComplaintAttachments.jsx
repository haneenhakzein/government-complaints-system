import { FiFileText } from "react-icons/fi";
import { toast } from "react-toastify";
import useOpenAttachment from "../hooks/useOpenAttachment";

const ComplaintAttachments = ({ attachments, loading }) => {
  const { openAttachment } = useOpenAttachment();

  const handleOpen = async (filePath, mimeType) => {
    const result = await openAttachment(filePath, mimeType);
    if (!result.success) {
      toast.error(result.message);
    }
  };

  if (loading) return <p className="text-gray-500">جارِ تحميل المرفقات...</p>;
  if (!attachments || attachments.length === 0) {
    return <p className="text-gray-500">لا توجد مرفقات</p>;
  }

  return (
    <div className="space-y-3">
      {attachments.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between border p-3 rounded-lg bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiFileText className="text-[#003c3c]" size={20} />
            <div>
              <p className="font-semibold text-sm">{file.original_filename}</p>
              <p className="text-xs text-gray-500">
                رُفع بواسطة: {file.user?.name} ({file.user?.role})
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpen(file.stored_filename, file.mime_type)}
            className="text-sm text-[#003c3c] underline"
          >
            فتح
          </button>
        </div>
      ))}
    </div>
  );
};

export default ComplaintAttachments;
