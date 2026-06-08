import api from "./api";

export async function getGoals() {
  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.get(
      "/goals",
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}

export async function createGoal(
  goalData
) {
  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.post(
      "/goals",
      goalData,
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}

export async function contributeToGoal(
  goalId,
  amount
) {
  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.put(
      `/goals/formatCurrency(goalId}/contribute`,
      { amount },
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  return response.data;
}