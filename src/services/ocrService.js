import api from "./api";

export async function scanReceipt(
  file
) {
  const token =
    localStorage.getItem("token");

  const formData =
    new FormData();

  formData.append(
    "receipt",
    file
  );

  const response =
    await api.post(
      "/ocr/scan",
      formData,
      {
        headers: {
          Authorization: `Bearer formatCurrency(token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}