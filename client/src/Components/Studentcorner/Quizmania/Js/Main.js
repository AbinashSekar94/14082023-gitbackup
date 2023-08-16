import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiztoday from "../Asset/Quiz-today-08.webp";
import "../Styles/Main.css";
import GKImage from "../Asset/GK.webp";
import ScienceImage from "../Asset/Science.webp";
import HistoryImage from "../Asset/History.png";
import AptitudeImage from "../Asset/Aptitude.webp";
import SportsImage from "../Asset/Sports.png";
import TechImage from "../Asset/Tech.png";
import SocialScience from "../Asset/Social Science.webp"
import General from "../Asset/category/General.png"
import ScoreBoard from "../Js/ScoreBoard";
import { Container } from "react-bootstrap";
import AOS, { init } from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
// import leaderBoard from "../Asset/leaderboard.png"

export default function Main(props) {
  const [fetchedCategories, setfetchedCategories] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userProfileInfo = userInfo;
  const userLevelInfo = userProfileInfo.level;


  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (userLevelInfo) {
          const res = await axios.post(
            `${process.env.REACT_APP_IPCONFIG}categories`,
            {
              level: userLevelInfo,
            }
          );
          setfetchedCategories(res.data);
         
          sessionStorage.setItem("fetchedCategories", JSON.stringify(res.data));
          // props.setfetchedCategories(res.data);
          
        }
      } catch (error) {
        console.log(error);
      }

      AOS.init();
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLevelInfo]);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.forward();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  function handleCategorySubmit(event) {
    props.setCategorys(event);
    sessionStorage.setItem("Categorys", JSON.stringify(event));
    navigate("/Topic");
  }

  function handleDailyQuiz() {
    navigate("/DailyQuiz");
  }

  return (
    <Container fluid>
      <div className="flex-container">
        <div className="flex-content">
          <div className="firstRow">
            <div className="logo">
               Quiz Mania   
            </div>
          </div>
          <div
            className="secondRow"
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
          >
            {fetchedCategories.map((category, index) => (
              
              <img
                className="categoryImage"
                key={index}
                src={
                  category.category === "GK"
                    ? GKImage
                    : category.category === "Science"
                    ? ScienceImage
                    : category.category === "History"
                    ? HistoryImage
                    : category.category === "Social Science"
                    ? SocialScience
                    : category.category === "Sports"
                    ? SportsImage
                    : category.category === "Tech"
                    ? TechImage
                    : category.category === "Aptitude"
                    ? AptitudeImage
                    : General
                }
                alt={category.category}
                onClick={() => handleCategorySubmit(category.category)}
              />
              
              
            ))}
          </div>
          
          <div className="thirdRow">
            
            <div className="todayQuiz-table-holder">
              <div>
                {/* <img className="leaderBoard" src={leaderBoard} alt=""></img> */}
                <ScoreBoard />
              </div>
            </div>

            <div className="todayQuiz-content-holder">
              {/* <div className="girlImageHolder"> */}
              {/* <img className="" src={Girl} alt="" />
            <img className="grass" src={Grass} alt="" /> */}
              {/* </div> */}
            </div>

            <div className="todayQuiz-Logo-holder">
              <img
                className="todayQuizLogo"
                src={Quiztoday}
                alt=""
                onClick={handleDailyQuiz}
              ></img>
              <div className="clickMe" onClick={handleDailyQuiz}>
                Click me
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </Container>
  );
}
