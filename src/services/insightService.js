import api from "./api";

export async function getAIInsights() {
  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.get(
      "/insights",
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}