// import { NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export async function POST(req) {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     const userSession = await auth.api.getSession({
//       headers: await headers(),
//     });
//     const user = userSession?.user;

//     const formData = await req.formData();
//     const price = formData.get("price");
//     const recipeName = formData.get("recipeName");
//     const recipeId = formData.get("recipeId");
//     const authorName = formData.get("authorName");
//     const recipeImage = formData.get("recipeImage")

//     const session = await stripe.checkout.sessions.create({
//       customer_email: user?.email,
//       line_items: [
//         {
//          price_data: {
//             currency: "usd",
//             product_data: { name: recipeName },
//             unit_amount: Number(price) * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         price: price,
//         userId: user?.id || "",
//         userEmail: user?.email || "",
//         recipeId,
//         recipeName,
//         authorName,
//         recipeImage

//       },
//       mode: "payment",

//       success_url: `${origin}/Payment/recipe-payment-success?session_id={CHECKOUT_SESSION_ID}`,
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

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;

    const formData = await req.formData();
    const price = formData.get("price");
    const recipeName = formData.get("recipeName");
    const recipeId = formData.get("recipeId");
    const authorName = formData.get("authorName");
    const recipeImage = formData.get("recipeImage");

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: recipeName },
            unit_amount: Math.round(Number(price) * 100), // দশমিকের ঝামেলা এড়াতে Math.round করা নিরাপদ
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: price,
        userId: user?.id || "",
        userEmail: user?.email || "",
        recipeId,
        recipeName,
        authorName,
        recipeImage,
      },
      mode: "payment",
      success_url: `${origin}/Payment/recipe-payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
