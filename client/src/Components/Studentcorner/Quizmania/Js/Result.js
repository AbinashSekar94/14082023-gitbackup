import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Result.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

import Exams from "../Asset/Exams.png";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result(props) {
  const { questions, count, incorrectAnswers, incorrectSelected } = props;

  const navigate = useNavigate();
  const topic = JSON.parse(sessionStorage.getItem("topic"));
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const topicid = JSON.parse(sessionStorage.getItem("topicid"));
  const userInformation = userInfo;
  const length = questions.length;
  // const inCorrect = length - count;
  function handleTest() {
    navigate("/topic");
  }

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
  }, []);

  const mark = Math.round((count / length) * 100);

  useEffect(() => {
    const updateResult = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_IPCONFIG}result`, {
          userid: userInformation.userid,
          username: userInformation.name,
          topicid: topicid,
          mark: mark,
        });
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    updateResult();
  }, [mark, userInformation, topicid]);

  return (
    <div>
      <div className="result-flex-container2">
        <div className="result-content">
          <div className="newResultImageContent">
            <div className="newResultContent">
            <div className="result-box" >Result</div>
            <div className="result-box">Topic : {topic}</div>
            <div className="score-container">
              <div className="result-score">
                <div className="scoreBox">
                  <div>Score</div>
                  <div>{count}</div>
                  <div>Out of 10</div>
                </div>
              </div>
             
            </div>
           
            </div>
            <div><img src={Exams} alt="" /></div>

          </div>
          
          <div className="result-questionContent1">
            <div className="result-Content-Text">
            Topic : {topic}
            </div>

            <div>
            <div className="result-Content-Text">
            Review Questions with correct Answers 
            </div>
              {incorrectAnswers.map((question, index) => (
                <div className="quizAnswercox1"key={question.id}>
                  <div className="result-questionBox">{question.text}</div>
                  <ul>
                    <li
                      className={
                        question.correct_answer_index === 1
                          ? "correct"
                          : incorrectSelected[index] === 1
                          ? "wrong"
                          : "unselected"
                      }
                    >
                      A. {question.answer1}
                    </li>
                    <li
                      className={
                        question.correct_answer_index === 2
                          ? "correct"
                          : incorrectSelected[index] === 2
                          ? "wrong"
                          : "unselected"
                      }
                    >
                      B. {question.answer2}
                    </li>
                    <li
                      className={
                        question.correct_answer_index === 3
                          ? "correct"
                          : incorrectSelected[index] === 3
                          ? "wrong"
                          : "unselected"
                      }
                    >
                      C. {question.answer3}
                    </li>
                    <li
                      className={
                        question.correct_answer_index === 4
                          ? "correct"
                          : incorrectSelected[index] === 4
                          ? "wrong"
                          : "unselected"
                      }
                    >
                      D. {question.answer4}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="anotherTestBtn">
              <button onClick={handleTest}>Take Another Test</button>
            </div>
           
            
          </div>
        </div>

        <div className="result-flex-AddPanel1">
          <div className="result-Ad-R-2">
           
          </div>
        </div>
      </div>
    </div>
  );
}
