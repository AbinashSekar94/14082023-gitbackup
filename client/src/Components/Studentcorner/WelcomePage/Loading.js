import React, { useEffect } from "react";
import "./Loading.css";
import "./OverAllCss.css";
import ScrollReveal from "scrollreveal";
import headingimage from "./images/SC_1-01.webp";
import quizmania from "./images/SC_1-02.webp";
import examupdates from "./images/SC_1-05.webp";
import questionbankimage from "./images/SC_1-03.webp";
import studytipsimage from "./images/SC_1-04.webp";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Loading = () => {
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
            <div className="loading-heading">
              <div className="heading-text">STUDENT CORNER</div>
              <div className="heading-image">
                <img
                  src={headingimage}
                  alt="heading"
                  style={{ color: "white" }}
                />
              </div>
              <div></div>
            </div>
            <div className="heading-below-content">
              <div className="subHeadPara">
                Welcome to the Student Corner, a place where academic excellence
                meets holistic growth! At Student Corner, we believe that
                students hold the key to shaping tomorrow's world, and that's
                why we've created a dynamic platform tailored to cater to your
                every need. With a strong focus on empowering you with
                knowledge, nurturing your interests, and fostering a competitive
                spirit, our Student Corner aims to be your ultimate destination
                for all things educational and inspiring.
              </div>
            </div>
            <div className="loading-quizmania">
              <div className="block-head">Quiz Mania </div>
              <div className="block-neck">Unleash Your Brainpower</div>
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
                  <img
                    src={quizmania}
                    className="brainicon"
                    alt="quizmania"
                    style={{ color: "black" }}
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
                <div className="block-body">
                  At Quiz Mania, we believe in making learning a delightful
                  adventure, where every correct answer brings a sense of
                  accomplishment and every challenge sparks your curiosity. So,
                  gather your wit and curiosity, and join us on this quest to
                  test and expand your knowledge horizon. Let's embark on this
                  thrilling journey together and celebrate the joy of
                  discovering new realms of wisdom!
                </div>
              </div>
              <button className="button_Holder" onClick={buttonClick}>
                TEST YOUR BRAIN POWER
              </button>
            </div>

            <div className="loading-examupdates">
              <div className="block-head">Exam Updates </div>
              <div className="block-neck">Stay Informed, Stay Ahead</div>
              <div className="examupdates-maincontent">
                <div className="side_image">
                  <img
                    src={examupdates}
                    className="examupdatesicon"
                    alt="exampudates"
                    style={{ color: "black" }}
                  />
                </div>
                <div className="examupdates-maintext">
                  <div className="block-body">
                    In the ever-evolving landscape of academics, staying
                    informed and up-to-date is a crucial aspect of achieving
                    success. At our Exam Updates section, we strive to empower
                    you with all the essential information right at your
                    fingertips. You can easily access and download the latest
                    exam timetables, including Tamil Nadu Samacheer Kalvi books
                    for both English and Tamil mediums, ensuring you are
                    well-prepared for your exams.
                  </div>
                </div>
              </div>
              <div>
                <div className="block-body">
                  Not only that, but our platform also keeps you in the loop
                  with real-time updates on important government announcements,
                  students' welfare schemes, and other pertinent information.
                  With this comprehensive resource hub, you can rest assured
                  that you'll never miss a beat in your academic journey, and
                  your preparation will always be on point. Let us be your
                  ultimate companion in your quest for academic excellence and
                  future success!
                </div>
              </div>
              <button className="button_Holder">STAY UPDATED</button>
            </div>

            <div className="loading-questionbank">
              <div className="block-head">Question Bank </div>
              <div className="block-neck"> Practice Makes Perfect</div>
              <div className="questionbank-maincontent">
                <div className="questionbank-maintext">
                  <div className="block-body">
                    {" "}
                    Unlock your full potential and prepare for success with
                    unwavering confidence through our extensive Question Bank.
                    Meticulously organized by subject and class, our repository
                    offers a treasure trove of Tamil Nadu government Samacheer
                    Kalvi book-based questions, tailored to help you excel in
                    your exams.{" "}
                  </div>
                </div>
                <div className="side_image">
                  <img
                    src={questionbankimage}
                    className="questionbankicon"
                    alt="questionbank"
                    style={{ color: "black" }}
                  />
                </div>
              </div>
              <div>
                <div className="block-body">
                  But that's not all – we go the extra mile to equip you with
                  the right tools for success. Our thoughtfully crafted model
                  question papers, designed to match board exam patterns, are at
                  your disposal to sharpen your skills and boost your
                  performance to new heights.
                </div>
                <div className="block-body">
                  With our carefully curated content, you can embark on your
                  preparation journey with renewed zeal, knowing you have the
                  perfect ally by your side. So, embrace excellence and step
                  confidently towards your academic goals – the future awaits
                  your brilliance!
                </div>
              </div>
              <button className="button_Holder">PREPARE NOW</button>
            </div>

            <div className="loading-studytips">
              <div className="block-head">Study Tips </div>
              <div className="block-neck">Empowering Your Learning Journey</div>
              <div className="studytips-maincontent">
                <div className="side_image">
                  <img
                    src={studytipsimage}
                    className="studytipsicon"
                    alt="studytips"
                    style={{ color: "black" }}
                  />
                </div>
                <div className="studytips-maintext">
                  <div className="block-body">
                    Education is a transformative journey, encompassing far more
                    than the conventional books and exams. At Student Corner, we
                    understand the essence of holistic learning. Our Study Tips
                    section acts as a gateway to a world of invaluable
                    knowledge, guiding you on the path to academic excellence
                    while fostering a well-rounded lifestyle.
                  </div>
                </div>
              </div>
              <div>
                <div className="block-body">
                  Within this treasure trove of wisdom, you'll unearth a
                  plethora of insights to elevate your academic performance.
                  From effective preparation techniques tailored for board exams
                  to essential do's and don'ts before crucial assessments, we
                  equip you with the tools to conquer any academic challenge.
                  Moreover, we offer easy-to-follow methods to enhance your
                  reading abilities, unlocking the full potential of your
                  intellectual prowess.
                </div>
                <div className="block-body">
                  But education extends beyond the confines of the mind. We
                  firmly believe in the harmony between a healthy body and an
                  alert mind. Hence, we emphasize the significance of physical
                  activity for students, empowering you to maintain a vibrant
                  and balanced life. By nurturing your physical well-being,
                  you'll experience enhanced focus and mental clarity, leading
                  to unparalleled academic achievements
                </div>
              </div>
              <button className="button_Holder">EXPLORE NOW</button>
            </div>
            <div className="subHeadPara">
              At Student Corner, we are dedicated to your holistic growth and
              success. These empowering resources are crafted with the sole
              purpose of unlocking your true potential. So, immerse yourself in
              this enriching journey, discover your capabilities, and redefine
              what you can achieve. Embrace education as a holistic experience,
              and let our Study Tips section be your guiding light towards a
              brighter and more fulfilling future.
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
};

export default Loading;
