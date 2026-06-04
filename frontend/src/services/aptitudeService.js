import api from "./api.js";

export const fetchAptitudeQuestions = async (limit = 20) => {
  const { data } = await api.get("/tests/aptitude/questions", {
    params: { limit }
  });
  return data;
};

export const submitAptitudeTest = async (payload) => {
  const { data } = await api.post("/tests/aptitude/submit", payload);
  return data;
};
