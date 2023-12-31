import React, { useEffect } from "react";
import "./Gamepage.css";
import "./OverAllCss.css";
import ScrollReveal from "scrollreveal";
import headingimage from "./images/SC_1-01.webp";
import gameicon from "./images/game.webp";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import lottie1 from "./images/animation_lley4ffv.json";
import lottie2 from "./images/animation_lleydvmn.json";
function Gamepage() {
  const navigate = useNavigate();

  function buttonClick() {
    navigate("/quizmania");
  }

  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal({ reset: true });

    // Reveal elements with class "fade-in" and "show-once"
    ScrollReveal().reveal(
      ".brainicon, .examupdatesicon, .questionbankicon, .studytipsicon",
      {
        delay: 100,
        duration: 1000,
        rotate: {
          x: 20,
          z: 20,
        },
      }
    );
  }, []);

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="A place where academic excellence meets holistic growth. Attend varity of quizzes and get reward, Stay updated about your exams, Model question papers for board exams, Effective preparation techniques for exams "
        />
        <meta
          name="keywords"
          content="vetrikkodi student corner, vetrikodi student corner, Quiz Mania, quiz mania, Exam Updates, Question Bank, Study Tips, samacheer kalvi books, model question papers, tn textbooks, TN School Books"
        />

        <title>Student Corner - Vetrikkodi </title>
      </Helmet>

      <div className="loading-top-ad">
        {/* <div className="loading-top-ad-content"></div> */}
      </div>

      <div className="Loading-division">
        {/* Left Ad Division */}
        <div className="ads left-ad">
          <div className="loading-ad-left1"></div>
        </div>
        <Container className="sc_container">
          <div className="loading-content">
            <div className="loading-heading1">
              <div className="parent">
                <div className="one">
                  <div>FuniVerse</div>
                </div>
                <div className="two">
                  <img
                    src={gameicon}
                    alt="heading"
                    style={{ color: "white" }}
                  />
                </div>
              </div>
            </div>

            <div className="heading-below-content"></div>
            <div className="loading-quizmania">
              <div className="block-neck">Welcome to the FuniVerse</div>
              <div className="quizamania-maincontent">
                <div className="quizmania-maintext">
                  <div className="block-body">
                    {" "}
                    Welcome to Quiz Mania, the ultimate destination where
                    knowledge intertwines with fun! Get ready to put your
                    thinking caps on and dive into the world of exhilarating
                    quizzes across a diverse range of captivating categories.
                    From General Knowledge to Aptitude, Science to Social
                    Science, and even Sports, we've curated a rich variety of
                    topics that will challenge and stimulate your intellect.
                  </div>
                </div>
                <div className="side_image">
                  <Lottie
                    animationData={lottie1}
                    loop={true}
                    className="brainicon"
                  />
                </div>
              </div>
              <div>
                <div className="block-body">
                  Compete against fellow enthusiasts and strive to ascend the
                  ranks on our Leaderboard, aiming to claim the coveted title of
                  the Quiz Champion. As you tackle each quiz, you'll find
                  yourself on an exciting journey of exploration and triumph.
                  And that's not all - for those who reach the top with flying
                  colors, exciting awards await, ready to be claimed as a
                  testament to your knowledge prowess.
                </div>
                
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                TEST YOUR BRAIN POWER
              </button>

              <div className="animated_buttons">
                <div className="animated_games">
                  <img
                    src={gameicon}
                    alt="heading"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="animated_games">
                  For More Games Lets Play
                  <Lottie
                    animationData={lottie2}
                    loop={true}
                    className="lottie2icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Right Ad Division */}
        <div className="ads right-ad">
          <div className="rightad-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Gamepage;
