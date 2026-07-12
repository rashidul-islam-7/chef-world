export const metadata = {
  title: "My Recipe | ChefWorld",
};

// import MyRecipesTable from "@/components/DashboardPage/MyRecipes/MyRecipesTable";
import { auth } from "@/lib/auth";

import { getMyRecipes } from "@/lib/getData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyRecipesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email;

  if (!session) {
    redirect("/signin");
  }

  const myRecipeData = await getMyRecipes(userEmail);

  console.log(myRecipeData);

  return (
    <section className="">
      {/* <MyRecipesTable recipes={myRecipeData} /> */}
    </section>
  );
};

export default MyRecipesPage;
