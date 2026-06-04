import api from "./api.js";

export const fetchAdminCodingQuestions = async ({ page = 1, limit = 20, query = "", topic = "", difficulty = "" } = {}) => {
  const { data } = await api.get("/admin/coding-questions", {
    params: { page, limit, query, topic, difficulty }
  });
  return data;
};

export const createAdminCodingQuestion = async (payload) => {
  const { data } = await api.post("/admin/coding-questions", payload);
  return data;
};

export const updateAdminCodingQuestion = async (id, payload) => {
  const { data } = await api.put(`/admin/coding-questions/${id}`, payload);
  return data;
};

export const deleteAdminCodingQuestion = async (id) => {
  const { data } = await api.delete(`/admin/coding-questions/${id}`);
  return data;
};
