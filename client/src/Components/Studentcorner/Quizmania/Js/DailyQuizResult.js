import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "../Styles/DailyQuizResult.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

import axios from "axios";
import Exams from "../Asset/Exams.png";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DailyQuizResult(props) {
  const {
    dquestions,
    counts,
    inCorrectAnswers,
    inCorrectSelected,
    fullAnswerArrayDaily,
  } = props;

  // const navigate = useNavigate();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userInformation = userInfo;
  const length = dquestions.length;
  // const inCorrect = length - counts;


  const Box = ({ index, value }) => {
    const boxStyle = {
      width: "50px",
      height: "50px",
      display: "inline-block",
      margin: "5px",
      border: "solid white 1px",
      textAlign: "center",
      lineHeight: "50px",
      fontWeight: "bold",
      backgroundColor: value === 1 ? "green" : "red",
      borderRadius: "25px",
    };

    return <div style={boxStyle}>{index + 1}</div>;
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
  }, []);

  const mark = Math.round((counts / length) * 100);

 
  const today = new Date();
  const isoDateString = today.toISOString().slice(0, 10);
  // console.log(isoDateString); // e.g. "2023-04-20"

  useEffect(() => {
    const updateResult = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_IPCONFIG}dailyresult`,
          {
            userid: userInformation.userid,
            username: userInformation.name,
            date: isoDateString,
            mark: mark,
          }
        );
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    updateResult();
  }, [mark, userInformation, isoDateString]);

  function getBackgroundStyle(counts) {
    let backgroundImage;
    if (counts >= 0 && counts <= 4) {
      backgroundImage = "linear-gradient(#fd0505, #541717)";
    } else if (counts >= 5 && counts <= 7) {
      backgroundImage = "linear-gradient(#635b17, #ceb902)";
    } else if (counts >= 8 && counts <= 10) {
      backgroundImage = "linear-gradient(#336317, #76ce02)";
    } else {
      backgroundImage = "none";
    }

    return {
      backgroundImage: backgroundImage,
    };
  }

  return (
    <div>
      <div className="dflex-container2">
        <div className="dcontent">
          <div
            className="dnewResultImageContent"
            style={getBackgroundStyle(counts)}
          >
            <div>
              <img src={Exams} alt="" />
            </div>

            <div className="dnewResultContent">
              <div className="dresult-box">Result</div>
              <div className="dscore-container">
                <div className="dresult-score">
                  <div className="dscoreBox">
                    <div>Score: {counts} / 10</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="score-container1">
              {Object.entries(fullAnswerArrayDaily).map(([index, value]) => (
                <Box key={index} index={parseInt(index)} value={value} />
              ))}
            </div>
          </div>

          <div className="dquestionContent">
            <div className="Content-Text">
            Review Questions with correct Answers
            </div>
            <div>
              {inCorrectAnswers.map((question, index) => (
                <div className="dquizBox1" key={question.id}>
                  <div className="dresult-questionBox">{question.text}</div>
                  <ul>
                    <li
                      className={
                        question.correct_answer_index === 1
                          ? "correct"
                          : inCorrectSelected[index] === 1
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
                          : inCorrectSelected[index] === 2
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
                          : inCorrectSelected[index] === 3
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
                          : inCorrectSelected[index] === 4
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
          </div>
        </div>

        <div className="dflex-AddPanel1">
          <div className="dAd-R-2">
          </div>
        </div>
      </div>
    </div>
  );
}
