import api from "./api";

function getAuthConfig() {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer formatCurrency(token}`,
    },
  };
}

export async function createBudget(
  budgetData
) {
  const response = await api.post(
    "/budgets",
    budgetData,
    getAuthConfig()
  );

  return response.data;
}

export async function getBudgets() {
  const response = await api.get(
    "/budgets",
    getAuthConfig()
  );

  return response.data;
}