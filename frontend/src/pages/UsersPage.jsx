import UserList from "../components/UserList";
import { Toaster } from "react-hot-toast";

export default function UsersPage() {
  return (
    <div>
      <UserList />
      <Toaster />
    </div>
  );
}
