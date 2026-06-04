import api from "./api.js";

export const fetchAdminTechnicalQuestions = async ({ page = 1, limit = 20, query = "", subject = "" } = {}) => {
  const { data } = await api.get("/admin/technical-questions", {
    params: { page, limit, query, subject }
  });
  return data;
};

export const createAdminTechnicalQuestion = async (payload) => {
  const { data } = await api.post("/admin/technical-questions", payload);
  return data;
};

export const updateAdminTechnicalQuestion = async (id, payload) => {
  const { data } = await api.put(`/admin/technical-questions/${id}`, payload);
  return data;
};

export const deleteAdminTechnicalQuestion = async (id) => {
  const { data } = await api.delete(`/admin/technical-questions/${id}`);
  return data;
};
