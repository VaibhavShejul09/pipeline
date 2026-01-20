import axiosInstance from "./api";

// USER
export const fetchQuizzes = (params = {}) =>
  axiosInstance.get("/quizzes", { params });

export const fetchQuizById = (quizId) =>
  axiosInstance.get(`/quizzes/${quizId}`);
