import api from "./api.js";

export const getTechnicalSubjects = async () => {
  const { data } = await api.get("/tests/technical/subjects");
  return data;
};

export const getTechnicalQuestions = async (subject, limit = 20) => {
  const { data } = await api.get(`/tests/technical/questions/${subject}`, {
    params: { limit }
  });
  return data;
};

export const submitTechnicalTest = async (payload) => {
  const { data } = await api.post("/tests/technical/submit", payload);
  return data;
};
