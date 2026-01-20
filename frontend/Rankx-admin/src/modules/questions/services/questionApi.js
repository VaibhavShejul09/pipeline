import axios from "../../../services/api";

/* ================= QUESTIONS ================= */

export const getQuestionsByQuiz = (quizId) =>
  axios
    .get(`/admin/questions/quiz/${quizId}`)
    .then((res) => res.data);

export const createQuestion = (payload) =>
  axios
    .post("/admin/questions", payload)
    .then((res) => res.data);

export const updateQuestion = (id, payload) =>
  axios
    .put(`/admin/questions/${id}`, payload)
    .then((res) => res.data);

export const deleteQuestion = (id) =>
  axios.delete(`/admin/questions/${id}`);
