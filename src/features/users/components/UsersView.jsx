import { useState } from "react";
import UsersFilters from "./UsersFilters";
import UserCard from "./UserCard";
import AddEmployeeModal from "./AddEmployeeModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import useUsers from "../hooks/useUsers";

export default function UsersView() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const { users, loading, error, fetchUsers } = useUsers();

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <UsersFilters search={search} setSearch={setSearch} />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#003c3c] text-white px-4 py-2 rounded-lg hover:bg-[#002f2f]"
        >
          إضافة موظف
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-center">جاري التحميل...</p>}

      <div className="mt-6">
        {!loading && filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">لا يوجد نتائج مطابقة...</p>
        ) : (
          filtered.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              role={user.role}
              entity={user.entity}
              isLocked={user.is_locked}
              createdAt={user.created_at}
              onEdit={() => {
                setEditUser(user);
                setEditOpen(true);
              }}
              onView={() => {
                setViewUser(user);
                setViewOpen(true);
              }}
            />
          ))
        )}
      </div>

      <AddEmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fetchUsers={fetchUsers}
      />
      <EditUserModal
        open={editOpen}
        user={editUser}
        onClose={() => setEditOpen(false)}
        onSuccess={fetchUsers}
      />
      <ViewUserModal open={viewOpen} user={viewUser} onClose={() => setViewOpen(false)} />
    </div>
  );
}
