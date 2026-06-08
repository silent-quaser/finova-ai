import api from "./api";

export async function sendMessage(
  message
) {
  const token =
    localStorage.getItem("token");

  const response =
    await api.post(
      "/chat",
      { message },
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}