import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editUser, setEditUser] = useState(null);

  // Obtener lista de usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener usuarios");
    }
  };

  // Crear nuevo usuario
  const createUser = async () => {
    try {
      await axios.post("http://localhost:5000/users", newUser);
      toast.success("Usuario creado");
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear usuario");
    }
  };

  // Actualizar usuario
  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${editUser._id}`, editUser);
      toast.success("Usuario actualizado");
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar usuario");
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      toast.success("Usuario eliminado");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar usuario");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
          Lista de Usuarios
        </h1>

        {/* Botón para agregar usuario */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6 transition"
          onClick={() => document.getElementById("addModal").showModal()}
        >
          Crear Usuario
        </button>

        {/* Lista de usuarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                {user.name}
              </h2>
              <p className="text-gray-400 mb-4">{user.email}</p>

              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
                  onClick={() => {
                    setEditUser(user);
                    document.getElementById("editModal").showModal();
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para crear usuario */}
      <dialog id="addModal" className="modal">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Crear Nuevo Usuario</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Correo"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <button
            onClick={createUser}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={() => document.getElementById("addModal").close()}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </dialog>

      {/* Modal para editar usuario */}
      {editUser && (
        <dialog id="editModal" className="modal">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Editar Usuario</h2>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            />
            <input
              type="password"
              value={editUser.password}
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            />
            <button
              onClick={updateUser}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
            >
              Guardar
            </button>
            <button
              onClick={() => document.getElementById("editModal").close()}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default App;
