import axiosInstance from "./api";

export const evaluateAttempt = (attemptId) =>
  axiosInstance.post(`/results/evaluate/${attemptId}`);

export const getUserResults = (userId) =>
  axiosInstance.get(`/results/user/${userId}`);

export const getResult = (attemptId) =>
  axiosInstance.get(`/results/${attemptId}`);
  