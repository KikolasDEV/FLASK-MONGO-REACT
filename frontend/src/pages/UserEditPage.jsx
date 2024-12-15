import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";

export default function UserEditPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      {user ? (
        <UserForm user={user} isEditing={true} />
      ) : (
        <p className="text-center mt-8">Cargando...</p>
      )}
    </div>
  );
}
