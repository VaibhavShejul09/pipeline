import axiosInstance from "./api";

export const getQuestionsByQuiz = (quizId) =>
  axiosInstance.get(`/questions/quiz/${quizId}`);
