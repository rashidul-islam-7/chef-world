import { FaCheck } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const UserStatusBadge = ({ blocked }) => {
  if (blocked) {
    return (
      <span className="flex items-center gap-0.5 rounded-full bg-red-100 text-red-700 px-2">
        <ImBlocked size={12}/> Blocked
      </span>
    );
  }

  return (
    <span className="flex items-center gap-0.5 rounded-full bg-green-100 text-green-700 px-2">
      <FaCheck size={12} /> Active
    </span>
  );
};

export default UserStatusBadge;
