import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/my-recipes",
    "/dashboard/add-recipe",
    "/dashboard/favorites",
    "/dashboard/purchased-recipes",
    "/dashboard/profile",
    "/dashboard/admin",
    "/dashboard/admin/manage-recipes",
    "/dashboard/admin/manage-users",
    "/dashboard/admin/manage-reports",
    "/dashboard/admin/manage-transactions",
  ],
};
