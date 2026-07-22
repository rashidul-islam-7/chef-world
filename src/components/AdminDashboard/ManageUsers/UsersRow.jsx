// import Image from "next/image";
// import UserStatusBadge from "./UserStatusBadge";
// import BlockButton from "./BlockButton";
// // Importing clean, modern icons from the Lucide set
// import {
//   LuShieldAlert,
//   LuUser,
//   LuCrown,
//   LuSparkles,
//   LuCalendar,
// } from "react-icons/lu";

// const UserRow = ({ user }) => {
//   return (
//     <tr className="border-b border-b-white">
//       {/* User Info */}
//       <td>
//         <div className="flex items-center gap-2">
//           <img
//             src={user.image}
//             alt={user.name}
//             className="rounded-full h-14 w-14 border border-green-200 object-cover"
//           />

//           <div>
//             <h3 className="font-semibold">{user.name}</h3>
//             <p className="text-sm">{user.email}</p>
//           </div>
//         </div>
//       </td>

//       {/* Role with Icons */}
//       <td>
//         {user.role === "admin" ? (
//           <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-2 text-sm text-purple-700">
//             <LuShieldAlert className="text-base" />
//             Admin
//           </span>
//         ) : (
//           <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 text-sm text-orange-700">
//             <LuUser className="text-base" />
//             User
//           </span>
//         )}
//       </td>

//       {/* Tier/Premium with Icons */}
//       <td>
//         {user.isPremium ? (
//           <span className="inline-flex items-center  rounded-full bg-green-100 px-2
//            text-green-700">
//             <LuCrown className="text-base" />
//             Premium
//           </span>
//         ) : (
//           <span className="inline-flex items-center  rounded-full bg-yellow-100 px-2  text-yellow-700">
//             <LuSparkles className="text-base" />
//             Free
//           </span>
//         )}
//       </td>

//       {/* Account Status */}
//       <td>
//         <UserStatusBadge blocked={user.isBlocked} />
//       </td>

//       {/* Created Date with Icon */}
//       <td>
//         <div className="flex items-center text-gray-600">
//           {/* <LuCalendar className="text-gray-400" /> */}
//           {new Date(user.createdAt).toLocaleDateString()}
//         </div>
//       </td>

//       {/* Actions btn*/}
//       <td className="text-center">
//         <BlockButton user={user} />
//       </td>
//     </tr>
//   );
// };

// export default UserRow;

import Image from "next/image";
import UserStatusBadge from "./UserStatusBadge";
import BlockButton from "./BlockButton";
import { LuShieldAlert, LuUser, LuCrown, LuSparkles } from "react-icons/lu";

const UserRow = ({ user }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* User Info - whitespace-nowrap keeps email/name on single lines to prevent row distortion */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={user.image}
            alt={user.name}
            className="rounded-full h-11 w-11 border border-green-200 object-cover flex-shrink-0"
          />
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        {user.role === "admin" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
            <LuShieldAlert className="text-sm" />
            Admin
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            <LuUser className="text-sm" />
            User
          </span>
        )}
      </td>

      {/* Tier/Premium */}
      <td className="px-6 py-4 whitespace-nowrap">
        {user.isPremium ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <LuCrown className="text-sm" />
            Premium
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
            <LuSparkles className="text-sm" />
            Free
          </span>
        )}
      </td>

      {/* Account Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <UserStatusBadge blocked={user.isBlocked} />
      </td>

      {/* Created Date */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
        {new Date(user.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <BlockButton user={user} />
      </td>
    </tr>
  );
};

export default UserRow;
