import React from "react";

const ComplaintHistoryModal = ({
  open,
  onClose,
  history,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[750px] max-h-[80vh] overflow-y-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#003c3c]">
            سجل الشكوى
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">
            جاري تحميل السجل...
          </p>
        ) : history?.length ? (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <p className="text-xs text-gray-500 mb-2">
                  {item.created_at || "—"}
                </p>

                {/* عرض مرن */}
                <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            لا يوجد سجل لهذه الشكوى
          </p>
        )}
      </div>
    </div>
  );
};

export default ComplaintHistoryModal;
