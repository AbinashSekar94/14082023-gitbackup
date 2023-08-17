import React from "react";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "./QuizInt.css";
import headingimage from "./images/SC_1-02.webp";
import todayquizicon from "./images/Quiz-today-08.webp";
import gkimage from "./images/QM-06.webp";
import apti from "./images/SC_1-07.webp";
import sci from "./images/SC_3-08.webp";
import socsci from "./images/SC_1-09.webp";
import sport from "./images/SC_1-10.webp";
import techno from "./images/SC_11-11.webp";
import ldrbrd from "./images/SC_12-12.webp";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

export default function QuizInt() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal({ reset: true });

    // Reveal elements with class "show-once" only once, without reset
    ScrollReveal().reveal(".show-once", {
      reset: false,
    });

    //GK
    ScrollReveal().reveal(".gkicon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    //aptitude

    ScrollReveal().reveal(".aptitudeicon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    //science icon
    ScrollReveal().reveal(".scienceicon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });
    //sports
    ScrollReveal().reveal(".sportsicon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    //technology
    ScrollReveal().reveal(".technoicon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    //social scinece
    ScrollReveal().reveal(".socsci", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    ///leader board
    ScrollReveal().reveal(".leadericon", {
      delay: 100,
      duration: 1000,
      rotate: {
        x: 20,
        z: 20,
      },
    });

    // Reveal elements with class "fade-in" with custom duration and no offset
    ScrollReveal().reveal(".quizicon", {
      duration: 2000,
      move: 0,
    });
  }, []); // Empty dependency array to run the effect only once on component mount

  function buttonClick() {
    navigate("/quizint");
  }

  function buttonClickGame() {
    navigate("/Games");
  }

  function buttonClickEpaper() {
    navigate("/epaper");
  }

  function buttonDailyquiz() {
    navigate("/quizint");
  }

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content=" A world of exhilarating quizzes across a diverse range of categories. From General Knowledge to Aptitude, Science to Social Science, and even Sports, we've curated a rich variety of topics that will challenge and stimulate your intellect."
        />
        <meta
  name="keywords"
  content="student quiz, quiz game, vetrikodi quiz, vetrikkodi quiz, vetrikkodi student corner, vetrikodi student corner, Quiz Mania, quiz mania, Exam Updates, Question Bank, Study Tips, samacheer kalvi books, model question papers, tn textbooks, TN School Books"
/>


        <title>Quiz Mania - Vetrikkodi</title>
      </Helmet>
      <div className="quiz-int-container">
        <div className="ad left-ad">
          <div className="left-ad1"></div>
        </div>
        <Container>
          <div className="content">
            <div className="ad-quizmania-top">
              {/* <div className="ad-quizmania-top_1"></div> */}
            </div>
            <div className="quizmania_heading">
              <div className="heading_image">
                <img
                  src={headingimage}
                  className="headingimage-quizint"
                  alt="heading_image"
                  style={{ color: "white" }}
                />
              </div>
              <div className="quizmania_headingh1">
                <h1 className="quizmania_heading_text">QUIZ MANIA</h1>
              </div>
            </div>
            <div className="subHeadPara">
              Welcome to Quiz Mania, the ultimate destination for all knowledge
              enthusiasts and quiz aficionados! Step into a world of thrilling
              challenges and boundless learning, where intellect meets
              excitement. Our Quiz Mania module offers an extensive range of
              quiz categories, each designed to cater to diverse interests and
              aptitudes.
            </div>
            <div className="block-subhead">Our list of categories</div>
            <div className="quizmania_categories">
              <div className="quizmania_category_main">
                <div className="quizmania_category_content">
                  <ul>
                    <li>GK</li>
                    <li>Science</li>
                    <li>Socail Science</li>
                  </ul>
                </div>
                <div className="quizmania_category_content">
                  <ul>
                    <li>Aptitude</li>
                    <li>Sports</li>
                    <li>Technology</li>
                  </ul>
                </div>
              </div>

              <div className="quizmania_category_image">
                <img
                  src={todayquizicon}
                  className="quizicon"
                  alt="heading_image"
                  style={{ color: "white" }}
                  onClick={buttonDailyquiz}
                />
              </div>
            </div>
            <div className="block-subhead">General Knowledge</div>
            <div className="quizmania-gk">
              <div className="quizmania-maindiv">
                <div className="block-body">
                  Welcome to our captivating General Knowledge (GK) category,
                  where fascinating topics await your exploration, from history
                  and geography to science and technology. Delve into
                  meticulously crafted GK quizzes like GK Quiz 1, GK Quiz 2, and
                  more, igniting your curiosity and pushing the boundaries of
                  your intellect.
                </div>
                <div className="side_image">
                  <img
                    src={gkimage}
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
              </div>
              <div>
                <div className="block-body">
                  Embark on a riveting journey of discovery, where each question
                  unlocks new insights and every answer elevates your
                  understanding. Pit your wits against diverse GK quizzes,
                  gaining a deeper understanding of the world around you and
                  opening doors to endless possibilities.
                </div>
                <div className="block-body">
                  Unleash your inquisitive spirit and let our GK category be the
                  gateway to an ever-expanding universe of learning and
                  enlightenment. Engage, challenge, and be inspired as you delve
                  into the realms of General Knowledge, a voyage of discovery
                  that knows no bounds.
                </div>
                {/* <p>
              So, get ready to embark on an exhilarating quest to enhance your
              general knowledge. Unleash the inquisitive spirit within you, and
              let our GK category be the gateway to an ever-expanding universe
              of learning and enlightenment. Engage, challenge, and be inspired
              as you delve into the realms of General Knowledge, a voyage of
              discovery that knows no bounds.
            </p> */}
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                EXPAND KNOWLEDGE
              </button>
            </div>
            <div className="block-subhead">Aptitude</div>
            <div className="quizmania-aptitude">
              <div className="quizmania-aptitude_main">
                <div>
                  <img
                    src={apti}
                    className="aptitudeicon"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>

                <div className="block-body">
                  Welcome to the Aptitude Challenge! If you have a knack for
                  numbers and logic, this category is tailor-made for you.
                  Prepare to be captivated by brain-teasers, intriguing puzzles,
                  and thought-provoking reasoning challenges that will elevate
                  your problem-solving prowess to new heights. Whether it's
                  unleashing your numerical aptitude or mastering critical
                  reasoning, our Aptitude quizzes will be a thrilling adventure
                  for your mind.
                </div>
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                Test Yourself
              </button>
            </div>
            <div className="block-subhead">Science</div>
            <div className="quizmania-science">
              <div className="quizmania-science_main">
                <div className="block-body">
                  Embark on a captivating journey of exploration with our
                  Science category, where curiosity meets knowledge. Immerse
                  yourself in the captivating world of biology, physics,
                  chemistry, and astronomy, as each quiz unravels the mysteries
                  of the universe. Unleash your inner scientist and quench your
                  thirst for discovery as you delve deeper into the realms of
                  science. Let your passion for learning soar high as you
                  uncover the wonders that lie within the cosmos.
                </div>
                <div className="quizmania-science_img">
                  <img
                    src={sci}
                    className="scienceicon"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                Discover Science
              </button>
            </div>
            <div className="block-subhead">Social Science</div>
            <div className="quizmania-socscience">
              <div className="quizmania-socience_main">
                <div className="quizmania-socience-img">
                  <img
                    src={socsci}
                    className="socsci"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="block-body">
                  Welcome to the Aptitude Challenge! If you have a knack for
                  numbers and logic, this category is tailor-made for you.
                  Prepare to be captivated by brain-teasers, intriguing puzzles,
                  and thought-provoking reasoning challenges that will elevate
                  your problem-solving prowess to new heights. Whether it's
                  unleashing your numerical aptitude or mastering critical
                  reasoning, our Aptitude quizzes will be a thrilling adventure
                  for your mind.
                </div>
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                Explore Now
              </button>
            </div>
            <div className="block-subhead">Sports</div>
            <div className="quizmania-sports">
              <div className="quizmania-sports_main">
                <div className="block-body">
                  Calling all sports enthusiasts! Get ready for an exhilarating
                  experience with our Sports category that will send your
                  adrenaline soaring. Don your sports caps and showcase your
                  expertise as you dive into a world of various sports,
                  legendary athletes, and thrilling sporting events. From the
                  exhilarating moments on the field to the history-making
                  triumphs, our Sports category is designed to ignite your
                  passion and immerse you in the thrilling world of sports. So,
                  let the games begin!
                </div>
                <div className="quizmania-sports_img">
                  <img
                    src={sport}
                    className="sportsicon"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                Play Hard
              </button>
            </div>
            <div className="block-subhead">Technology</div>
            <div className="quizmania-technology">
              <div className="quizmania-technology_main">
                <div>
                  <img
                    src={techno}
                    className="technoicon"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="block-body">
                  Unleash your tech curiosity with our Technology category! From
                  computers and hardware to software, programming languages, and
                  AI basics, our quizzes cover it all. Dive into the intricate
                  world of computer hardware, understand the magic of software,
                  and challenge your coding skills with various programming
                  languages. Discover the future of technology with insights
                  into Artificial Intelligence, machine learning, and neural
                  networks.
                </div>
              </div>
              <div className="block-body">
                Whether you're a tech enthusiast, a professional, or simply
                curious about the digital landscape, our Technology category
                offers a thrilling adventure into the world of tech. Embrace
                cutting-edge knowledge, explore the latest advancements, and
                quench your thirst for tech wisdom. Join us on this exciting
                journey and unlock your tech potential today!
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                Tech Odyssey
              </button>
            </div>
            <div className="quizmania-leader">
              <div className="quizmania-leader_main">
                <div className="quizmania-leader-left">
                  <div className="leaderboardbutton">
                    <button className="button-leaderb">Leader Board</button>
                  </div>
                  <div className="block-body">
                    At Quiz Mania, our passion lies in celebrating intelligence
                    and excellence. The Leaderboard serves as the ultimate
                    battleground for students to showcase their brilliance. With
                    each quiz, the competition intensifies, and those who
                    outshine the rest are crowned as Quiz Champions, earning
                    well-deserved accolades and thrilling rewards for their
                    outstanding knowledge and skills.
                  </div>
                  <div className="buttons_quizmania_leaderBox">
                    <button
                      className="buttons_quizmania_leader"
                      onClick={buttonClick}
                    >
                      Check Your Rank
                    </button>
                  </div>
                </div>
                <div className="quizmania-leader_img">
                  <img
                    src={ldrbrd}
                    className="leadericon"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="subHeadPara">
              Embrace the thrill of competition, as Quiz Mania invites you to
              embark on an electrifying journey of discovery and recognition.
              Step up to the challenge, go head-to-head with your fellow
              learners, and unlock the doors to boundless learning
              opportunities. Get ready to carve your name on the Leaderboard and
              be hailed as a champion of wisdom and wit.
            </div>
          </div>
        </Container>

        <div className="ad right-ad">
          <div className="quiz_sidenavbar">
            <div className="sideNavbar_heading">More Topics....</div>
            <div className="side_navbarlinks">
              <div onClick={buttonClick}>Quiz Mania</div>
              <div>Examp Updates</div>
              <div>Question Bank</div>
              <div>Study Tips</div>
              <div>Motivation</div>
              <div onClick={buttonClickGame}>Games</div>
              <div onClick={buttonClickEpaper}>Epaper</div>
            </div>
          </div>
          <div className="right-ad1"></div>
          <div className="right-ad2"></div>
        </div>
      </div>
    </div>
  );
}
