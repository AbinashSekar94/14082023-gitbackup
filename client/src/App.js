import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/js/Navbar";
import Epaper from "./Components/Epaper/Js/Epaper";
import Sharearticle from "./Components/Epaper/Js/Sharearticle";
import Start from "./Components/Studentcorner/Quizmania/Js/Start";
import Main from "./Components/Studentcorner/Quizmania/Js/Main";
import Topic from "./Components/Studentcorner/Quizmania/Js/Topic";
import Quiz from "./Components/Studentcorner/Quizmania/Js/Quiz";
import Result from "./Components/Studentcorner/Quizmania/Js/Result1";
import Profile from "./Components/Studentcorner/Quizmania/Js/Profile";
import Home from "./Components/Home/Home";
import DailyQuiz from "./Components/Studentcorner/Quizmania/Js/DailyQuiz";
import DailyQuizResult from "./Components/Studentcorner/Quizmania/Js/DailyQuizResult";
import Motivation from "./Components/Motivation/Motivational";
import Epaper1 from "./Components/Epaper/Js/Epaper1";
//import Celebration from "./Components/Animation/Celebration";
import Gamehome from "./Components/Games/Gamehome";

import Puzzle from "./Components/Games/Puzzle/Puzzle";
import MathGame from "./Components/Games/Math_game/MathGame";
import About from "./Components/Home/components/About";
import Terms from "./Components/Home/components/Policy/JS/Terms";
import Privacy from "./Components/Home/components/Policy/JS/Privacy";
//import Footer from "./Components/Home/components/Footer/Footer";
//import Cookies from "./Components/Home/components/Policy/JS/Cookies";
import Contactus from "./Components/Home/components/Policy/JS/Contactus";
import Login from "./Components/Login/Login";
import Story from "./Components/Epaper/Js/Story";
import Tictoctoe from "./Components/Games/tic-toc-toe/Tictoctoe";

import FormPage from "./Components/Studentcorner/Quizmania/Js/FormPage";
import Blobupload from "./Components/Epaper/Js/Blobupload";
import MemoryGame from "./Components/Games/Memory_game/Memorygame";
import Uploadstatus from "./Components/Epaper/Js/Uploadstatus";
import ScoreTest from "./Components/Studentcorner/Quizmania/Js/ScoreTest";
import ScoreBoard from "./Components/Studentcorner/Quizmania/Js/ScoreBoard";
import Footer from "./Components/Home/components/Footer/Footer";
import AccessTypeComponent from "./Components/Epaper/Js/AccessTypeComponent";

import Loading from "./Components/Studentcorner/WelcomePage/Loading";
import QuizInt from "./Components/Studentcorner/WelcomePage/QuizInt";
import Epaperhomepage from "./Components/Studentcorner/WelcomePage/Epaperhomepage";

function App() {
  const [categorys, setCategorys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [dquestions, setDQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [counts, setCounts] = useState(0);
  const [categor, setCategor] = useState([]);
  const [topic, setTopic] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [incorrectSelected, setIncorrectSelected] = useState([]);
  const [inCorrectAnswers, setInCorrectAnswers] = useState([]);
  const [inCorrectSelected, setInCorrectSelected] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [fullAnswerArray, setFullAnswerarray] = useState([]);
  const [fullAnswerArrayDaily, setFullAnswerArrayDaily] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/epaper1" element={<Epaper />} />
          <Route exact path="/epaperview" element={<Epaper1 />} />
          <Route exact path="/vetrikodi@19062023" element={<Blobupload />} />
          <Route exact path="/Uploadstatus" element={<Uploadstatus />} />
          <Route exact path="/epaper" element={<Epaperhomepage />} />
          <Route
            exact
            path="/AccessTypeComponent"
            element={<AccessTypeComponent />}
          />

          <Route exact path="/share/:id" element={<Sharearticle />} />
          <Route exact path="/status" element={<Story />} />
          <Route exact path="/motivation" element={<Motivation />} />

          <Route exact path="/Games" element={<Gamehome />} />

          <Route exact path="/Puzzle" element={<Puzzle />} />
          <Route exact path="/mathgame" element={<MathGame />} />
          <Route exact path="/Tictoctoe" element={<Tictoctoe />} />
          <Route exact path="/MemoryGame" element={<MemoryGame />} />

          <Route exact path="/aboutus" element={<About />} />
          <Route exact path="/terms" element={<Terms />} />
          <Route exact path="/privacy" element={<Privacy />} />
          {/* <Route exact path="/cookies" element={<Cookies />} /> */}
          <Route exact path="/Contactus" element={<Contactus />} />
          <Route exact path="/Login" element={<Login />} />

          <Route exact path="/ScoreTest" element={<ScoreTest />} />
          <Route exact path="/ScoreBoard" element={<ScoreBoard />} />

          <Route exact path="/quizint" element={<Start />} />
          <Route exact path="/studentcorner" element={<Loading />} />
          <Route exact path="/quizmania" element={<QuizInt />} />

          <Route exact path="/Registration" element={<FormPage />} />
          <Route
            key="main"
            path="/quiz-view"
            element={
              <Main
                setCategorys={setCategorys}
                setCategories={setCategories}
                categorys={categorys}
              />
            }
          />
          <Route
            key="topic"
            path="/Topic"
            element={
              <Topic
                setCategorys={setCategorys}
                categorys={categorys}
                setCategories={setCategories}
                categories={categories}
                setCategor={setCategor}
                categor={categor}
                setTopic={setTopic}
                topic={topic}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
              />
            }
          />
          <Route
            key="quiz"
            path="/Quiz"
            element={
              <Quiz
                setCategorys={setCategorys}
                categorys={categorys}
                setQuestions={setQuestions}
                questions={questions}
                setCount={setCount}
                setCategor={setCategor}
                categor={categor}
                setTopic={setTopic}
                topic={topic}
                setIncorrectAnswers={setIncorrectAnswers}
                setIncorrectSelected={setIncorrectSelected}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                setFullAnswerarray={setFullAnswerarray}
              />
            }
          />
          <Route
            key="result"
            path="/Result"
            element={
              <Result
                questions={questions}
                topic={topic}
                count={count}
                incorrectAnswers={incorrectAnswers}
                incorrectSelected={incorrectSelected}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                setIncorrectAnswers={setIncorrectAnswers}
                setIncorrectSelected={setIncorrectSelected}
                fullAnswerArray={fullAnswerArray}
              />
            }
          />
          <Route key="profile" path="/profile" element={<Profile />} />
          <Route
            key="DailyQuiz"
            path="/DailyQuiz"
            element={
              <DailyQuiz
                setDQuestions={setDQuestions}
                dquestions={dquestions}
                setCounts={setCounts}
                setInCorrectAnswers={setInCorrectAnswers}
                setInCorrectSelected={setInCorrectSelected}
                inCorrectAnswers={inCorrectAnswers}
                inCorrectSelected={inCorrectSelected}
                setFullAnswerArrayDaily={setFullAnswerArrayDaily}
              />
            }
          />
          <Route
            key="DailyQuizResult"
            path="/DailyQuizResult"
            element={
              <DailyQuizResult
                dquestions={dquestions}
                setCounts={setCounts}
                counts={counts}
                setInCorrectAnswers={setInCorrectAnswers}
                setInCorrectSelected={setInCorrectSelected}
                inCorrectAnswers={inCorrectAnswers}
                inCorrectSelected={inCorrectSelected}
                fullAnswerArrayDaily={fullAnswerArrayDaily}
              />
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
