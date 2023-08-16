import React, { useEffect } from "react";
import "../Games/Gamehome.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import cat from "./json files/74268-cute-tiger.json";
import boy from "./json files/transparent.json";
import rocket from "./json files/rocket-boy.json";
import backgroundVideo from "./video/animeback.mp4";
import axios from "axios";

const cardData = [
  {
    heading: "NUMBER PUZZLE",
    animationData: require("./json files/cube-transparent.json"),
    buttonLink: "/Puzzle",
    aboutGame:
      "This is a number puzzle game where you have to arrange the numbers in the correct order.",
  },
  {
    heading: "MATH GAME",
    animationData: require("./json files/114864-green-calculator.json"),
    buttonLink: "/MathGame",
    aboutGame:
      "This is a math game that tests your arithmetic skills and problem-solving abilities.",
  },
  {
    heading: "TIC TOC TOE",
    animationData: require("./json files/tic toc toe.json"),
    buttonLink: "/Tictoctoe",
    aboutGame:
      "Experience the thrill of tic-tac-toe, where a few strategic moves can lead to victory.Challenge your Friends in Tic-Tac-Toe",
  },
  {
    heading: "MEMORY GAME",
    animationData: require("./json files/memory.json"),
    buttonLink: "/MemoryGame",
    aboutGame:
      "Start playing the Memory Game today and discover the joy of exercising your memory while having an incredible amount of fun.",
  },
  
];

const Card = ({ heading, animationData, buttonLink, aboutGame }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(buttonLink);
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  

  useEffect(() => {
    const checkSessionValidation = async () => {
      try {
        const xQtAuth = getCookieValue("x-qt-auth");
        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://vetrikkodi.hindutamil.in/api/auth/v1/sessions/validate",
          headers: {
            "x-qt-auth": xQtAuth,
          },
        };
        const response = await axios.request(config);

        if (response.status === 200) {
          const userDataResponse = await axios.get(
            "https://vetrikkodi.hindutamil.in/api/auth/v1/users/me",
            {
              headers: {
                "x-qt-auth": xQtAuth,
              },
            }
          );
          sessionStorage.setItem(
            "userData",
            JSON.stringify(userDataResponse.data)
          );
          const { id, name, email } = userDataResponse.data?.user || {};
          //console.log(id, name, email);
          // Additional API call
          try {
            const res = await axios.post(`${process.env.REACT_APP_IPCONFIG}Profile`, {
              userid: id,
            });
           

            if (res.data === null || res.data.length === 0) {
             
              navigate("/Registration");
            } else {
              sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));
         
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          window.location.href =
            "https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code";
        }
      } catch (error) {
        console.error("Error:", error);
        window.location.href =
          "https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code";
      }
    };

    checkSessionValidation();
  }, [navigate]);

  return (
    <div className="card">
      <div className="card-animation-container">
        <Lottie animationData={animationData} className="card-animation" />

        <div className="home-rightcontent">
          <h3 className="card-heading">{heading}</h3>
          <div className="about-game">{aboutGame}</div>{" "}
          {/* Display the aboutGame */}
          <button onClick={handleClick} className="card-button shake-button">
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

const Gamehome = () => (
  <>
    <div className="gamehome-main">
      <div className="game-bar-heading">
        <div className="samplelottie">
          <Lottie animationData={boy} className="lottie-boy" />
          <h1 className="wave-text">WELCOME TO PLAY ZONE</h1>
          <Lottie animationData={rocket} className="rocket-boy" />
        </div>
      </div>
      <div className="card-list">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <div className="homegame-footer">
        <div className="footer-lottie">
          <Lottie animationData={cat} className="lottie-cat" />
        </div>
      </div>
    </div>
    <div className="background-video">
      <video autoPlay muted loop className="video-element">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  </>
);

export default Gamehome;
