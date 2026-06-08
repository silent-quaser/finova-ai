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

export async function getAnalytics() {
  const response = await api.get(
    "/analytics/summary",
    getAuthConfig()
  );

  return response.data;
}