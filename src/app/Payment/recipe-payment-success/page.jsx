// import { redirect } from "next/navigation";
// import { stripe } from "@/lib/stripe";
// import { FaCheckCircle } from "react-icons/fa";
// import { postPurchasedRecipe } from "@/lib/postData";
// import Link from "next/link";

// export default async function PaymentSuccess({ searchParams }) {
//   const params = await searchParams;
//   const sessionId = params?.session_id;

//   if (!sessionId) {
//     throw new Error("Something went wrong. Session ID missing.");
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["line_items", "payment_intent"],
//     });

//     const status = session?.status;
//     const metadata = session?.metadata;
//     const customerEmail = session?.customer_details?.email;

//     if (status === "open") {
//       redirect("/");
//     }
//     console.log("Before savePurchasedRecipe");
//     if (status === "complete") {
//       await postPurchasedRecipe({
//         sessionId,
//         userId: metadata?.userId,
//         recipeId: metadata?.recipeId,
//         recipeName: metadata?.recipeName,
//         authorName: metadata?.authorName,
//         recipeImage: metadata?.recipeImage,
//         price: metadata?.price,
//       });

//       return (
//         <section className="min-h-screen flex items-center justify-center p-4 ">
//           <div className=" text-center">
//             {/* Success Icon */}
//             <div className="flex justify-center items-center text-5xl text-green-500 mb-4">
//               <FaCheckCircle />
//             </div>

//             {/* Content */}
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
//               Payment Success!
//             </h2>
//             <p className="text-gray-500 mb-6">
//               Thank you for purchasing <strong>{metadata?.recipeName}</strong>.
//               The recipe is now unlocked!
//             </p>

//             {/* Navigation Buttons */}
//             <div className="space-y-3">
//               <div className="pt-2">
//                 <Link href="/" className="text-sm text-green-500 ">
//                   Back to Home
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       );
//     }
//   } catch (error) {
//     console.error("Stripe retrieve error:", error);
//     return (
//       <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 text-2xl font-bold">
//             !
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">
//             Verification Failed
//           </h2>
//           <p className="text-gray-500 mb-4">
//             We couldn't verify this payment session. Please check your stripe
//             dashboard.
//           </p>
//           <Link href="/" className="text-orange-600 font-semibold">
//             Return Home
//           </Link>
//         </div>
//       </section>
//     );
//   }
// }

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { FaCheckCircle } from "react-icons/fa";
import { postPurchasedRecipe } from "@/lib/postData";
import Link from "next/link";

export default async function PaymentSuccess({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    throw new Error("Something went wrong. Session ID missing.");
  }

  let session;
  let status;
  let metadata;
  let transactionId;

  try {
    // stripe সেশন রিট্রিভ করা এবং সাথে payment_intent এক্সপ্যান্ড করা
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    status = session?.status;
    metadata = session?.metadata;

    // payment_intent থেকে Transaction ID বের করা
    transactionId =
      typeof session?.payment_intent === "object"
        ? session?.payment_intent?.id
        : session?.payment_intent;
  } catch (error) {
    console.error("Stripe retrieve error:", error);
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-500 mb-4">
            We couldn't verify this payment session. Please check your stripe
            dashboard.
          </p>
          <Link href="/" className="text-orange-600 font-semibold">
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  // Next.js redirect-কে try-catch ব্লকের বাইরে রাখা হয়েছে
  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    try {
      // ডাটাবেজে ডাটা পাঠানোর সময় transactionId পাস করা হচ্ছে
      await postPurchasedRecipe({
        sessionId,
        transactionId: transactionId || "N/A",
        userId: metadata?.userId,
        recipeId: metadata?.recipeId,
        recipeName: metadata?.recipeName,
        authorName: metadata?.authorName,
        recipeImage: metadata?.recipeImage,
        price: metadata?.price,
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // ব্যাকএন্ড বা ডাটাবেজে এরর হলেও ক্র্যাশ না করে কনসোলে লগ হবে
    }

    return (
      <section className="min-h-screen flex items-center justify-center p-4 ">
        <div className="text-center max-w-sm w-full">
          {/* Success Icon */}
          <div className="flex justify-center items-center text-5xl text-green-500 mb-4">
            <FaCheckCircle />
          </div>

          {/* Content */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Payment Success!
          </h2>
          <p className="text-gray-500 mb-4">
            Thank you for purchasing <strong>{metadata?.recipeName}</strong>.
            The recipe is now unlocked!
          </p>

          {/* Transaction ID UI-তে প্রদর্শন */}
          {transactionId && (
            <div className="bg-gray-100 p-3 rounded-lg mb-6 text-xs text-gray-600 font-mono break-all text-center">
              <span className="font-semibold block text-gray-500 mb-1">
                TRANSACTION ID
              </span>
              {transactionId}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <div className="pt-2">
              <Link href="/" className="text-sm text-green-500 hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // সেসনের স্ট্যাটাস অন্য কিছু হলে হোমে রিডাইরেক্ট করবে
  redirect("/");
}
