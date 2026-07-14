

import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { FaCheckCircle } from "react-icons/fa";
import { getSubscription } from "@/lib/postData";

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const sessionId = params?.session_id;

  if (!sessionId) {
    throw new Error("Something went wrong. Session ID missing.");
  }

  try {
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const status = session?.status;
    const metadata = session?.metadata;

    if (status === "open") {
      redirect("/dashboard");
    }

    if (status === "complete") {

      const payload = {
        userId: metadata?.userId,
        userEmail: metadata?.userEmail,
        transactionId: session?.payment_intent?.id || session.id,
        amount: session?.amount_total / 100, 
        paymentStatus: session?.payment_status, 
      };

      await getSubscription(payload);

      return (
        <section className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="flex justify-center items-center text-5xl text-green-500 mb-4">
              <FaCheckCircle />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Payment Success!
            </h2>
            <p className="text-gray-500 mb-6">
              Thank you for purchasing premium. Your subscription is now active!
            </p>
            <div>
              <a
                href="/dashboard"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold py-3 px-6 inline-block transition"
              >
                Back to Dashboard
              </a>
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
          <a href="/" className="text-orange-600 font-semibold hover:underline">
            Return Home
          </a>
        </div>
      </section>
    );
  }
}
