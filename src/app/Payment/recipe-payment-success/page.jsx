import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { FaCheckCircle } from "react-icons/fa";
import { savePurchasedRecipe } from "@/lib/data";

export default async function PaymentSuccess({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    throw new Error("Something went wrong. Session ID missing.");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    const status = session?.status;
    const metadata = session?.metadata;
    const customerEmail = session?.customer_details?.email;

    if (status === "open") {
      redirect("/");
    }
    console.log("Before savePurchasedRecipe");
    if (status === "complete") {
      await savePurchasedRecipe({
        sessionId,
        userId: metadata?.userId,
        recipeId: metadata?.recipeId,
        recipeName: metadata?.recipeName,
        authorName: metadata?.authorName,
        recipeImage: metadata?.recipeImage,
        price: metadata?.price,
      });

      console.log("After savePurchasedRecipe");
      return (
        <section className="min-h-screen flex items-center justify-center p-4 ">
          <div className=" text-center">
            {/* Success Icon */}
            <div className="flex justify-center items-center text-5xl text-green-500 mb-4">
              <FaCheckCircle />
            </div>

            {/* Content */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Payment Success!
            </h2>
            <p className="text-gray-500 mb-6">
              Thank you for purchasing <strong>{metadata?.recipeName}</strong>.
              The recipe is now unlocked!
            </p>
            
            {/* Navigation Buttons */}
            <div className="space-y-3">
              <div className="pt-2">
                <a href="/" className="text-sm text-green-500 ">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    }
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
          <a href="/" className="text-orange-600 font-semibold">
            Return Home
          </a>
        </div>
      </section>
    );
  }
}
