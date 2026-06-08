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

export async function getAIInsights() {
  const response = await api.post(
    "/ai/insights",
    {},
    getAuthConfig()
  );

  return response.data;
}