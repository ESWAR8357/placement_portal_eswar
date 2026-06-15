import api from "./api.js";

export const fetchCodingAssessmentQuestions = async ({ limit = 10 } = {}) => {
  const { data } = await api.get("/coding/questions", { params: { limit } });
  return data;
};

export const fetchCodingAssessmentQuestionById = async (id) => {
  const { data } = await api.get(`/coding/questions/${id}`);
  return data;
};

export const submitCodingAssessment = async (payload) => {
  const { data } = await api.post("/coding/submit", payload);
  return data;
};

