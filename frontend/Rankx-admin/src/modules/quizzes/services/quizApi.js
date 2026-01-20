import axios from "../../../services/api";

/* ================= QUIZ ================= */

export const getQuizzes = async () => {
  const res = await axios.get("/admin/quizzes");
  return res.data;
};

export const getQuizById = async (quizId) => {
  const res = await axios.get(`/admin/quizzes/${quizId}`);
  return res.data;
};

export const updateQuizStatus = (quizId, status) =>
  axios.put(`/admin/quizzes/${quizId}/status?status=${status}`);


export const createQuiz = (payload) =>
  axios.post("/admin/quizzes", payload);

export const updateQuiz = (quizId, payload) =>
  axios.put(`/admin/quizzes/${quizId}`, payload);

export const deleteQuiz = (quizId) =>
  axios.delete(`/admin/quizzes/${quizId}`);

export const toggleQuizStatus = (quizId, status) => {
  if (!status) throw new Error("Status must be defined");
  
  return axios.put(
    `/admin/quizzes/${quizId}/status`, // backend path
    {}, // empty body
    { params: { status } } // send as query parameter
  );
};

export const bulkPublish = (quizIds, published) =>
  axios.put(
    "/admin/quizzes/publish",
    quizIds,               // raw array → List<UUID>
    { params: { published } }
  );



export const bulkDelete = (quizIds) =>
  axios.delete("/admin/quizzes", { data: quizIds });

export const getQuizAnalytics = async () => {
  const res = await axios.get("/admin/quizzes/analytics");
  return res.data;
};

