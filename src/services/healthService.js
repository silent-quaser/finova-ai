import api from "./api";

export async function getHealthScore() {
  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/health",
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}