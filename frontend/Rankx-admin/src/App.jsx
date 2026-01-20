import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./dashboard/Dashboard";

/* Quiz */
import ManageQuizzes from "./modules/quizzes/pages/ManageQuizzes";
import CreateQuiz from "./modules/quizzes/pages/CreateQuiz";
import EditQuiz from "./modules/quizzes/pages/EditQuiz";
import QuizPreview from "./modules/quizzes/pages/QuizPreview";

/* Questions */
import ManageQuestions from "./modules/questions/pages/ManageQuestions";
import CreateQuestion from "./modules/questions/pages/CreateQuestion";
import EditQuestion from "./modules/questions/pages/EditQuestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Pages */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Quiz Pages */}
        <Route path="/quizzes" element={<ManageQuizzes />} />
        <Route path="/quizzes/create" element={<CreateQuiz />} />
        <Route path="/quizzes/:id/preview" element={<QuizPreview />} />
        <Route path="/quizzes/:id/edit" element={<EditQuiz />} />

        {/* Questions */}
        <Route path="/quizzes/:quizId/questions" element={<ManageQuestions />} />
        <Route path="/quizzes/:quizId/questions/create" element={<CreateQuestion />} />
        <Route path="/quizzes/:quizId/questions/:questionId/edit" element={<EditQuestion />} />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
