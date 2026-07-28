// import { getTokenServer } from "./getTokenServer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllRecipe = async ({ searchParams } = {}) => {
  try {
    const searchQuery = (await searchParams) || {};
    const page = searchQuery.page || 1;
    const limit = searchQuery.limit || 10;

    const res = await fetch(`${API_URL}/recipes?page=${page}&limit=${limit}`, {
      next: {
        revalidate: 60,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch recipes!");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { totalPage: 1, page: 1, skip: 0, data: [] };
  }
};

// get data with by id
export const getRecipeById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/recipe/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch recipe!");
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

//get my-recipes with email
export const getMyRecipes = async (email) => {
  try {
    const res = await fetch(`${API_URL}/my-recipes?email=${email}`);
    if (!res.ok) {
      throw new Error("Failed to fetch your recipes!");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//get my purchased recipes
export const getMyPurchasedRecipes = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/my-purchased-recipes/${userId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch purchased recipes");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getUserDashboardStats = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/user-stats/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getUserDashboardStats:", error);
    return {
      success: false,
      stats: { totalRecipes: 0, totalLikes: 0, totalFavorites: 0 },
    };
  }
};

export const getAdminDashboardStats = async () => {
  try {
    // const token = await getTokenServer();
    const res = await fetch(`${API_URL}/admin/dashboard`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   authorization: `Bearer ${token}`,
      // },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch admin dashboard stats!");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return {
      totalUsers: 0,
      totalRecipes: 0,
      totalPremiumMembers: 0,
      totalReports: 0,
    };
  }
};

export const getAdminUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/admin/users`);

    if (!res.ok) {
      throw new Error("Failed to fetch admin users list!");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getFeaturedRecipes = async () => {
  try {
    const res = await fetch(`${API_URL}/featured-recipes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured recipes");
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching featured recipes:", err);
    return [];
  }
};

export async function getAllTransactions({ searchParams } = {}) {
  try {
    const searchQuery = await searchParams;
    const page = searchQuery.page || 1;
    const limit = searchQuery.limit || 10;

    const res = await fetch(
      `${API_URL}/admin/transactions?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    return {
      totalPage: 1,
      page: 1,
      totalRevenue: 0,
      data: [],
    };
  }
}
