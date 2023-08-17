import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ComingSoon from "./components/ComingSoonPage/ComingSoon";
import StudentCorner from "./components/StudentCorner/StudentCorner";
import StudentCornerPage from "./components/StudentCornerPage/StudentCornerPage";
// import QuizMania from "./components/QuizMania/QuizMania";
import Showtalent from "./components/ShowTalent/Showtalent";
import Lottie from "lottie-react";
import HomeLottie from "./Homelottie.json";
import { Helmet } from "react-helmet";

export default function Home() {
  const navigate = useNavigate();

  const [activeLanguage, setActiveLanguage] = useState("english");

  const handleToggleLanguage = () => {
    setActiveLanguage((prevLanguage) =>
      prevLanguage === "tamil" ? "english" : "tamil"
    );
  };

  function handleTodayQuiz() {
    navigate("/studentcorner");
  }
  function handleStatus() {
    navigate("/status");
  }

  function handleGame() {
    navigate("/Games");
  }

  function moreabout() {
    navigate("/aboutus");
  }

  return (
    <>
      <Helmet>
        <title>VETRIKKODI - Tamil Daily Best Newspaper for Students</title>
        <meta
          name="description"
          content="Educational Digipaper(e-paper) for students and kids, Engaging quizzes, exciting games, and inspirational stories. Explore a fun-filled interactive learning platform designed to spark curiosity and enhance knowledge."
        />
        <meta
          name="keywords"
          content="School Student news in tamil, School Student update in tamil, vetrikkodi newspaper, vetrikodi online, vetrikkodi website, vetrikkodi home page, vetrikodi epaper, vetrikodi digipaper, students epaper, ePaper, digipaper, vetrikodi quizzes, vetrikkodi games, வெற்றிக்கோடி இபேப்பர், வெற்றிக்கோடி, tamil epaper online download, download epaper, vetrikkodi epaper"
        />
      </Helmet>

      <div className="page-holder">
        <div className="first-component">
          <div className="button-holder">
            <img
              alt=""
              src="/Button-01.webp"
              // className=" btn btn-lg btn-link button-glow"
              data-aos="fade-up-left"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              onClick={handleStatus}
            />
            <img
              alt=""
              src="/Button-02.webp"
              // className=" btn btn-lg btn-link button-glow"
              data-aos="zoom-in-up"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              onClick={handleTodayQuiz}
            />
            <img
              alt=""
              src="/Button-03.webp"
              // className=" btn btn-lg btn-link button-glow"
              data-aos="fade-up-right"
              data-aos-offset="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-sine"
              onClick={handleGame}
            />
          </div>
          <div className="imageHolder">
            <div className="contentBox">
              <div className="contentBox1">
                <div className="whyVetrikodi">Why Vetrikkodi ?</div>
                <div className="language">
                  <button onClick={handleToggleLanguage}>
                    {activeLanguage === "tamil" ? "A" : "அ"}
                  </button>
                </div>

                {activeLanguage === "english" && (
                  <div
                    className="vetriKodi-content"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1500"
                  >
                    <p>
                      Vetrikkodi aims to secure students from falling to the
                      side of information technology while offering them proper
                      guidance and direction for their future. It also resolves
                      to help the students, teachers and correspondents in
                      guiding their career and shoulder the responsibility of
                      making the students a responsible citizen in the society.
                    </p>
                    <p>
                      The content of Hindu Tamil Thisai, Vetrikkodi will surely
                      make the students more imaginative and think differently.
                      The platform will also act as a bridge between the school
                      management/ teachers/students and Government’s Education
                      department."
                    </p>
                    <p>
                      The content of the newspaper has articles of
                      Educationists, Achievements of successful personalities
                      and articles of leading school principals for the benefit
                      of student community. Through expert guidance on entrance
                      examinations, it enlightens students on how to decide on
                      their higher studies.
                    </p>
                  </div>
                )}

                {activeLanguage === "tamil" && (
                  <div
                    className="vetriKodi-content"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1500"
                  >
                    <p className="tamilFont">
                      இந்து தமிழ்' நாளிதழ் செய்து வருவதை நீங்கள் நன்கு
                      அறிவீர்கள். அதன் முக்கிய அம்சமாக, 'வெற்றிக்கொடி' என்ற
                      பெயரில் பள்ளிகளுக்கென்றே ஒரு பிரத்தியேகமான நாளிதழை நாங்கள்
                      கொண்டு வந்ததையும் நீங்கள் அறிந்திருப்பீர்கள்.
                    </p>

                    <p className="tamilFont">
                      மாணவர்களை மனரீதியாக செம்மைப்படுத்தி, அவர்களை அறிவில்
                      சிறந்தவர்களாகவும், நாட்டின் பொறுப்புள்ளகுடிமக்களாகவும்
                      உருவாக்க ஆசிரியர் சமூகமும் பள்ளி நிர்வாகங்களும் எடுத்து
                      வரும் சீரிய முயற்சிக்கு இந்த ‘புதியவெற்றிக்கொடி’ நாளிதழ்
                      முழுமையாகத் தோள் கொடுக்கும். அதாவது, பாடங்களை அவர்கள்
                      பயில்வதற்குத் தேவையான அம்சங்களோடு, பொது அறிவையும் ஒழுக்கம்
                      தொடர்பான விழுமியங்களை முழுமையாக உணர்ந்து கொள்ளவும்...
                      நீங்கள் மேற்கொண்டு வரும் அத்தனை முயற்சிகளுக்கும் நாங்கள்
                      பக்க பலமாக இருக்கப் போகிறோம்.
                    </p>
                  </div>
                )}

                <div className="aboutUsBox">
                  <div className="aboutus" onClick={moreabout}>
                    KNOW US BETTER
                  </div>
                </div>
              </div>
            </div>

            <div className="girl-holder">
              <img className="girl-1" alt="" src="/girl-groups.webp" />

              <Lottie
                animationData={HomeLottie}
                loop={true}
                className="HomeLottie"
              />
            </div>
          </div>
        </div>
        <ComingSoon />
        <StudentCorner />
        <StudentCornerPage />
        {/* <QuizMania /> */}
        <Showtalent />
        {/* <Footer /> */}
      </div>
    </>
  );
}
