import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthUser } from "@/features/auth";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import useEntities from "../hooks/useEntities";
import useCreateEntity from "../hooks/useCreateEntity";
import useUpdateEntity from "../hooks/useUpdateEntity";
import useDeleteEntity from "../hooks/useDeleteEntity";
import EntityFilters from "./EntityFilters";
import EntityCard from "./EntityCard";
import AddEntityModal from "./AddEntityModal";
import EditEntityModal from "./EditEntityModal";
import EntityDetailsModal from "./EntityDetailsModal";

export default function EntitiesView() {
  const { role } = useAuthUser();
  const { entities, isLoading, error } = useEntities();
  const { addEntity } = useCreateEntity();
  const { editEntity } = useUpdateEntity();
  const { deleteEntity } = useDeleteEntity();

  const [localEntities, setLocalEntities] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState(null);

  const currentEntities = localEntities ?? entities;

  const handleEditEntity = async (updatedData) => {
    try {
      const updated = await editEntity(entityToEdit.id, updatedData);
      setLocalEntities(
        currentEntities.map((item) => (item.id === entityToEdit.id ? updated : item))
      );
      setOpenEdit(false);
      toast.success("تم تعديل القسم");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "فشل تعديل القسم"));
    }
  };

  const handleFilter = (filters) => {
    if (!currentEntities.length) return;

    const filtered = currentEntities.filter(
      (entity) =>
        entity.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.employees === "" || entity.employees_count == filters.employees) &&
        (filters.complaints === "" || entity.complaints_count == filters.complaints) &&
        (filters.date === "" || entity.created_at.includes(filters.date))
    );

    setFilteredData(filtered);
  };

  const handleAddEntity = async (newEntity) => {
    try {
      const created = await addEntity(newEntity);
      setLocalEntities([...currentEntities, created]);
      setFilteredData(null);
      setOpenAdd(false);
      toast.success("تم إضافة القسم");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "حدث خطأ أثناء إضافة القسم"));
    }
  };

  const handleDelete = async (entity) => {
    if (!window.confirm(`هل أنت متأكد من حذف القسم ${entity.name}?`)) return;

    try {
      await deleteEntity(entity.id);
      setLocalEntities(currentEntities.filter((item) => item.id !== entity.id));
      toast.success("تم حذف القسم بنجاح");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "فشل حذف القسم"));
    }
  };

  const displayedData = filteredData || currentEntities;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#003c3c]">الأقسام</h1>
        {role === "admin" && (
          <button
            onClick={() => setOpenAdd(true)}
            className="bg-[#003c3c] text-white px-4 py-2 rounded-lg hover:bg-[#022d2d] transition"
          >
            + إضافة قسم
          </button>
        )}
      </div>

      {isLoading && <p className="text-center">جارِ التحميل…</p>}
      {error && <p className="text-center text-red-600">فشل في جلب البيانات</p>}
      {role === "admin" && <EntityFilters onFilter={handleFilter} />}

      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayedData.length > 0 ? (
          displayedData.map((entity) => (
            <EntityCard
              key={entity.id}
              {...entity}
              onViewDetails={() => {
                setSelectedEntity(entity);
                setOpenDetails(true);
              }}
              onEdit={() => {
                setEntityToEdit(entity);
                setOpenEdit(true);
              }}
              onDelete={() => handleDelete(entity)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">لا توجد نتائج</p>
        )}
      </div>

      <AddEntityModal open={openAdd} onClose={() => setOpenAdd(false)} onSubmit={handleAddEntity} />
      <EditEntityModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        entity={entityToEdit}
        onSubmit={handleEditEntity}
      />
      <EntityDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        entity={selectedEntity}
      />
    </div>
  );
}
