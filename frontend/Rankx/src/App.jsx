import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import QuizList from "./pages/quiz/QuizList";
import QuizDetails from "./pages/quiz/QuizDetails";
import QuizAttempt from "./pages/quiz/QuizAttempt";
import QuizResult from "./pages/quiz/QuizResult";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        {/* Quiz Pages */}
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<QuizDetails />} />
        <Route path="/quiz/:quizId/attempt" element={<QuizAttempt />} />
        <Route path="/quiz/result" element={<QuizResult />} />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;