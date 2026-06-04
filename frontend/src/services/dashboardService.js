import api from "./api.js";

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put("/auth/profile", payload);
  return data;
};

export const getTestHistory = async () => {
  const { data } = await api.get("/tests/history");
  return data;
};
