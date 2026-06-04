import api from "./api.js";

export const fetchCodingQuestions = async ({ page = 1, limit = 10, topic, difficulty } = {}) => {
  const params = { page, limit };
  if (topic) params.topic = topic;
  if (difficulty) params.difficulty = difficulty;

  const { data } = await api.get("/coding-questions", { params });
  return data;
};

export const fetchCodingQuestionById = async (id) => {
  const { data } = await api.get(`/coding-questions/${id}`);
  return data;
};
