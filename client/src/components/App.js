import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header.js";
import Questions from "./routes/Questions.js";
import QuestionCreate from "./routes/QuestionCreate.js";
import MainPage from "./routes/MainPage.js";
import QuestionPage from "./routes/QuestionPage.js";
import QuestionEdit from "./routes/QuestionEdit.js";
import UserPage from "./routes/UserPage.js";

function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} exact />

          <Route path="/questions" element={<Questions />} exact />
          <Route path="/questions/new" element={<QuestionCreate />} exact />
          <Route path="/questions/edit/:id" element={<QuestionEdit />} exact />

          <Route path="/questions/:id" element={<QuestionPage />} exact />
          <Route path="/users/:id" element={<UserPage />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
