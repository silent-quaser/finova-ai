import api from "./api";

export async function downloadReport() {
  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/reports",
      {
        responseType: "blob",

        headers: {
          Authorization: `Bearer formatCurrency(token}`,
        },
      }
    );

  const url =
    window.URL.createObjectURL(
      new Blob([response.data])
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    "Financial_Report.pdf"
  );

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();
}