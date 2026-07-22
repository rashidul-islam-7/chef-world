// import { useSession, signOut } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { IoLogOutOutline } from "react-icons/io5";

// const Logout = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     await signOut();
//     router.push("/signin");
//   };
//   return (
//     <div>
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-1 px-4 mt-8 border cursor-pointer w-full rounded-sm py-1.5 shadow"
//       >
//         <span className="text-2xl font-bold">
//           <IoLogOutOutline />
//         </span>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Logout;

"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Logout = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // রিফ্রেশ বা পেজ চেঞ্জের সময় ব্লকড অবস্থায় থাকলে অটো লগআউট
  useEffect(() => {
    if (!isPending && session?.user?.isBlocked) {
      signOut().then(() => {
        router.push("/signin?error=blocked");
      });
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 px-4 mt-8 border cursor-pointer w-full rounded-sm py-1.5 shadow"
      >
        <span className="text-2xl font-bold">
          <IoLogOutOutline />
        </span>
        Logout
      </button>
    </div>
  );
};

export default Logout;
