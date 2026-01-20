import axiosInstance from "./api";

export const startAttempt = (quizId) =>
  axiosInstance.post("/attempts/start", {quizId});

export const saveAnswer = (attemptId, payload) =>
  axiosInstance.post(`/attempts/${attemptId}/answer`, payload);

export const submitAttempt = (attemptId) =>
  axiosInstance.post(`/attempts/${attemptId}/submit`);
