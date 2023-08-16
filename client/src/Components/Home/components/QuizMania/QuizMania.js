import React from "react";
import "./QuizMania.css";
import { useNavigate } from "react-router-dom";

function QuizMania() {
  const navigate = useNavigate();

  function todayquiz() {
    navigate("/studentcorner");
  }
  return (
    <div className="QuizMania-page">
      <div className="QuizManiaTopicfirst">
        Exciting tests and interesting quizzes to exercise your brain
      </div>
      <div className="QuizManiaTopicsecond">
        Come, take part in our well curated quizzes and tests to get exciting
        prices and also win a chance of being featured in our website.
      </div>

      <div className="QuizManiaTopicThird">Quiz Winner</div>

      <div className="QuizManiaImage">
        <div
          className="trophy-holder"
          data-aos="zoom-in"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1500"
        >
          <div className="trophy-button">
            <button id="first">Find</button>
            <button id="second">Find</button>
            <button id="third">Find</button>
          </div>
          <img src="/trophy.webp" alt="" />
        </div>
        <div className="todayQuizHolder">
          <img src="/todayQuiz.webp" alt="" onClick={todayquiz} />
        </div>
      </div>
    </div>
  );
}

export default QuizMania;
