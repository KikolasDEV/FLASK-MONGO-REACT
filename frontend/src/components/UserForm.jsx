import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserForm({ user = {}, isEditing = false }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: user,
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/users/${user._id}`, data);
        toast.success("Usuario actualizado correctamente");
      } else {
        await axios.post("http://localhost:5000/users", data);
        toast.success("Usuario creado correctamente");
      }
      navigate("/");
    } catch (error) {
      toast.error("Error al guardar el usuario");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
    >
      <input
        {...register("name")}
        placeholder="Nombre"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        {...register("email")}
        placeholder="Correo"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        {...register("password")}
        placeholder="Contraseña"
        type="password"
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded hover:bg-indigo-700"
      >
        {isEditing ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
