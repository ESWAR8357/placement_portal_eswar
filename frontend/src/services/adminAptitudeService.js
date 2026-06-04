import api from "./api.js";

export const fetchAdminAptitudeQuestions = async ({ page = 1, limit = 20, query = "" } = {}) => {
  const { data } = await api.get("/admin/aptitude-questions", {
    params: { page, limit, query }
  });
  return data;
};

export const createAdminAptitudeQuestion = async (payload) => {
  const { data } = await api.post("/admin/aptitude-questions", payload);
  return data;
};

export const updateAdminAptitudeQuestion = async (id, payload) => {
  const { data } = await api.put(`/admin/aptitude-questions/${id}`, payload);
  return data;
};

export const deleteAdminAptitudeQuestion = async (id) => {
  const { data } = await api.delete(`/admin/aptitude-questions/${id}`);
  return data;
};
