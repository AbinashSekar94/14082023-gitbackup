import React, { useEffect } from "react";
import "./ComingSoon.css";
import Lottie from "lottie-react";
import Home from "./Coming soon2.json";
import AOS from "aos";
import "aos/dist/aos.css";

function ComingSoon() {
  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <div className="firstPage-content">
      <div className="comingSoon">
        <Lottie animationData={Home} loop={true} />
      </div>

      <div className="comingSoonBox">
        <div
          className="events1"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="100"
          data-aos-easing="ease-in-sine"
        >
          {/* <img className="HalfCircle-icon" alt="" src="/HalfCircle.png" /> */}
          <img className="events-1-icon" alt="" src="/SchoolCornerGirl.webp" />
          <div className="events2">
            <b className="career-guidance">SCHOOL CORNER</b>
          </div>
          <b className="students-can-participate-container">
            <p className="students-can-participate">{`Students can participate and `}</p>
            <p className="students-can-participate">WIN prizes</p>
          </b>
        </div>

        <div className="careerguidance"
          data-aos="zoom-in-up"
          data-aos-duration="800"
          data-aos-easing="ease-in-sine"
          data-aos-offset="100">
          <img
            className="careerguidance-1-icon"
            alt=""
            src="/carrerguidancegirl.webp"
          />
          <div className="career">
            <b className="career-guidance">CAREER GUIDANCE</b>
          </div>
          <b className="choose-the-career-container">
            <p className="students-can-participate">
              Choose the career you wish for
            </p>
          </b>
        </div>

        <div
          className="video"
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-duration="800"
          data-aos-easing="ease-in-sine"
        >
          <img className="videos-1-icon" alt="" src="/earthGirl.webp" />
          <div className="video1">
            <b className="career-guidance">VIDEO</b>
          </div>
          <b className="share-your-talents">
            <p className="students-can-participate">
              Share your talents and trend globally
            </p>
          </b>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
