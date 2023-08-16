import React from "react";

import "./StudentCornerPage.css";

import QuizMania from "../QuizMania/QuizMania";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import Lottie from "lottie-react";

import comingsoon from "./student_json/comingsoon tiger.json";

function StudentCornerPage() {
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (showDialog) {
      const timeout = setTimeout(() => {
        setShowDialog(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showDialog]);

  function movetoQuiz() {
    navigate("/studentcorner");
  }

  function openDialog() {
    setShowDialog(true);
  }

  return (
    <div className="sCorner-container">
      <div className="sfirstCorner-conatiner">
        <img
          src="/Quizmania.webp"
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          onClick={movetoQuiz}
        />

        <img
          src="/Questionbank.webp"
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          onClick={openDialog}
        />
      </div>

      <div className="ssecondCorner-container">
        <img
          src="/Studytips.webp"
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          onClick={openDialog}
        />
{showDialog && (
        <div className="sdialogue_comingsoon">
          <Lottie
            animationData={comingsoon}
            className="commingsoon_lottie"
            style={{ height: "150px", width: "150px" }}
          />

         <div> <p style={{ color: "white", fontWeight: "bolder" }}>COMING SOON!</p></div>
        </div>
      )}
        <img
          src="/Examupdates.webp"
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          onClick={openDialog}
        />
      </div>
      


      <div className="sQuizManiaCover">
        <QuizMania />
      </div>
    </div>
  );
}

export default StudentCornerPage;
