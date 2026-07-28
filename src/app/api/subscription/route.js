// import { NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export async function POST() {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     const userSession = await auth.api.getSession({
//       headers: await headers(),
//     });

//     const user = userSession?.user;

//     const PRICE_ID = "price_1Tmv7EATbcDXIrj48oE41wFh";
//     const session = await stripe.checkout.sessions.create({
//       customer_email: user?.email,
//       line_items: [
//         {
//           price: PRICE_ID,
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         priceId: PRICE_ID,
//         userId: user?.id || "",
//         userEmail: user?.email || "",
//       },
//       mode: "subscription",

//       success_url: `${origin}/Payment/premium-user-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${origin}/pricing`,
//     });

//     return NextResponse.redirect(session.url, 303);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

  
    const userSession = await auth.api.getSession({
      headers: headersList,
    });

    const user = userSession?.user;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const PRICE_ID = "price_1Tmv7EATbcDXIrj48oE41wFh";

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: PRICE_ID,
        userId: user?.id || "",
        userEmail: user?.email || "",
      },
      mode: "subscription",

      success_url: `${origin}/Payment/premium-user-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Subscription API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}