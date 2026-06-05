import api from "./api.js";

export const getAnalyticsOverview = async () => {
  const { data } = await api.get("/admin/analytics/overview");
  return data;
};

export const getAnalyticsTests = async () => {
  const { data } = await api.get("/admin/analytics/tests");
  return data;
};

export const getAnalyticsUsers = async () => {
  const { data } = await api.get("/admin/analytics/users");
  return data;
};
