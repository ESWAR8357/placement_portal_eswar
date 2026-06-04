import api from "./api.js";

export const getAdminDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};
