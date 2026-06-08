import api from "./api";

export async function getMonthlySummary() {
  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/summary",
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}