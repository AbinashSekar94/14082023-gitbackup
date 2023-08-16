import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Quiz.css";
import axios from "axios";
import Advertisment from "../Asset/Ad.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [answerArray, setAnswerarray] = useState([]);
  const [time, setTime] = useState(10 * 60);
  const [showDialog, setShowDialog] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  
  
  // const { categor, topic, userInfo } = props;
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const categor = JSON.parse(sessionStorage.getItem("categor"));
  const topic = JSON.parse(sessionStorage.getItem("topic"));
  const userInformation = userInfo;
  const Level = userInformation.level;
  const navigate = useNavigate();

  async function handleQuestionSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_IPCONFIG}questions`, {
        category: categor,
        level: Level,
        topic: topic,
      });
      setQuestions(res.data);
      props.setQuestions(res.data);

      setQuizStarted(true); // <-- Add this line
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while retrieving questions. Please try again later."
      );
    }
  }

  function handleAnswerSelected(
    selectedAnswerIndex,
    correct_answer_index,
    currentQuestionIndex
  ) {
    setSelectedAnswers((prevState) => {
      const newSelectedAnswers = [...prevState];
      newSelectedAnswers[currentQuestionIndex] = selectedAnswerIndex; // save selectedAnswerIndex value to new array
      return newSelectedAnswers;
      
    });
    
    const selectedAnswer = selectedAnswerIndex === correct_answer_index ? 1 : 0;
    setAnswerarray((prevState) => {
      const newAnswers = [...prevState];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      return newAnswers;
    });
    // console.log(answerArray);
    
  }
  
  // const handleDialogConfirmation = () => {
  //   let tempCount = 0;
  //   answerArray.forEach((element) => {
  //     if (element === 1) {
  //       tempCount++;
  //     }
  //   });
  //   props.setCount(tempCount);
    
  //   navigate("/Result");

  //   const incorrectAnswers = questions.filter(
  //     (question, index) => answerArray[index] !== 1
  //   );

  //   const incorrectSelected = selectedAnswers.filter(
  //     (answers, index) => answerArray[index] !== 1
  //   );

  //   props.setIncorrectAnswers(incorrectAnswers);
  //   props.setIncorrectSelected(incorrectSelected);
  //   props.setFullAnswerarray(answerArray);

  // };

  const handleDialogConfirmation = () => {
    // Check if all questions have been answered
    if (selectedAnswers.length !== questions.length) {
      alert('Please answer all the questions before submitting.');
      return;
    }
  
    let tempCount = 0;
    answerArray.forEach((element) => {
      if (element === 1) {
        tempCount++;
      }
    });
    props.setCount(tempCount);
    
    navigate("/Result");
  
    const incorrectAnswers = questions.filter(
      (question, index) => answerArray[index] !== 1
    );
  
    const incorrectSelected = selectedAnswers.filter(
      (answers, index) => answerArray[index] !== 1
    );
  
    props.setIncorrectAnswers(incorrectAnswers);
    props.setIncorrectSelected(incorrectSelected);
    props.setFullAnswerarray(answerArray);
  };
  

  useEffect(() => {
    let intervalId = null;
    if (quizStarted) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [quizStarted]);

  useEffect(() => {
    if (time === 0) {
      handleDialogConfirmation();
    }
    AOS.init();
  });

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const { ones, zeros } = countOnesAndZeros(answerArray);
  function countOnesAndZeros(arr) {
    let ones = 0;
    let zeros = 0;
    arr.forEach((elem) => {
      if (elem === 1) {
        ones++;
      } else if (elem === 0) {
        zeros++;
      }
    });
    return { ones, zeros };
  }
  const count = ones+zeros;
  

  return (
    <div>
      <div className="flex-container1">
        <div className="container1">
          <div className="info-Heading">
            <div className="userInfo">Topic: {topic}</div>
            <div className="Quiz-topic-div">
              
              <div className="time">
                Time: {minutes} min {seconds} sec
              </div>
            </div>
            {questions.length === 0 && (
              <div className="btn-holder">
                <button className="startbtn" onClick={handleQuestionSubmit}>
                  Start
                </button>
              </div>
            )}
          </div>
          <div className="question" >
            {questions.map((question, index) => (
              <div className="quizBox1" key={question.id}>
                <div className="questionsContent" >
                  {index + 1}. {question.text}
                </div>

                <ul>
                  <li >
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="1"
                        onChange={() =>
                          handleAnswerSelected(
                            1,
                            question.correct_answer_index,
                            index
                          )
                        }
                      />
                       {} {question.answer1}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="2"
                        onChange={() =>
                          handleAnswerSelected(
                            2,
                            question.correct_answer_index,
                            index
                          )
                        }
                      />
                      {} {question.answer2}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="3"
                        onChange={() =>
                          handleAnswerSelected(
                            3,
                            question.correct_answer_index,
                            index
                          )
                        }
                      />
                      {} {question.answer3}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value="4"
                        onChange={() =>
                          handleAnswerSelected(
                            4,
                            question.correct_answer_index,
                            index
                          )
                        }
                      />
                      {} {question.answer4}
                    </label>
                  </li>
                </ul>
                {/* {(index + 1) % 4 === 0 && (
                  <div className="div-in-between">AD</div>
                )} */}
              </div>
            ))}
          </div>

          {questions.length !== 0 && (
            <div className="btn-conatiner">
              <button className="sbtn" onClick={() => setShowDialog(true)}>
                Submit
              </button>
              {showDialog && (
                <div className="dialog">
                  
                  <div className="dialog-header">
                    You have totaly answered {count}/{questions.length} questions
                  </div>

                  <div className="dialog-header">
                  Are you sure you want to submit ?
                  </div>
                  <div className="dialog-buttons">
                    <button className="btn" onClick={handleDialogConfirmation}>
                      Yes
                    </button>
                    <button
                      className="btn"
                      onClick={() => setShowDialog(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-AddPanel1">
          <div className="Ad-R-2">
            <img src={Advertisment} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}
