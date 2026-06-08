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

export async function createTransaction(
  transactionData
) {
  const response = await api.post(
    "/transactions",
    transactionData,
    getAuthConfig()
  );

  return response.data;
}

export async function getTransactions() {
  const response = await api.get(
    "/transactions",
    getAuthConfig()
  );

  return response.data;
}

export async function deleteTransaction(
  id
) {
  const response = await api.delete(
    `/transactions/formatCurrency(id}`,
    getAuthConfig()
  );

  return response.data;
}