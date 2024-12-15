import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await axios.delete(`http://localhost:5000/users/${id}`);
    toast.success("Usuario eliminado");
    loadUsers();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Lista de Usuarios
      </h1>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <div>
            <button
              onClick={() => navigate(`/edit/${user._id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-danger text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
