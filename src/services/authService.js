import api from "./api";

export async function registerUser(
  userData
) {
  const response = await api.post(
    "/auth/register",
    userData
  );

  if (response.data.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data
      )
    );
  }

  return response.data;
}

export async function loginUser(
  userData
) {
  const response = await api.post(
    "/auth/login",
    userData
  );

  if (response.data.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data
      )
    );
  }

  return response.data;
}

export async function getCurrentUser() {
  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "No token found"
    );
  }

  const response = await api.get(
    "/auth/me",
    {
      headers: {
        Authorization: `Bearer formatCurrency(token}`,
      },
    }
  );

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
}