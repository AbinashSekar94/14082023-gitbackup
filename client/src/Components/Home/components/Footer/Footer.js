import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  function HomeClick() {
    navigate("/");
  }

  function Gameclick() {
    navigate("/Games");
  }

  function EpaperClick() {
    navigate("/epaper");
  }

  function MotivationClick() {
    navigate("/Motivation");
  }

  function EventClick() {
    navigate("/Motivation");
  }

  function moreabout() {
    navigate("/aboutus");
  }

  function moreabout() {
    navigate("/aboutus");
  }

  function TermClick() {
    navigate("/terms");
  }

  function PrivacyClick() {
    navigate("/privacy");
  }

  function CookiesClick() {
    navigate("/cookies");
  }

  function ContactusClick() {
    navigate("/Contactus");
  }

  return (
    <div className="footer-header">
      <div className="footer-head-content">
        <a href="https://vetrikkodi.hindutamil.in/">
          <img className="vetri-icon" alt="" src="/11-31@2x.webp" />
        </a>
        <div className="socialMedia-icons">
          <a
            href="https://www.facebook.com/TamilTheHindu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="desktop-28-item" alt="" src="/Facebook_logo.webp" />
          </a>

          <a
            href="https://www.instagram.com/hindu_tamil/channel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="desktop-28-item" alt="" src="/InstaLogo.webp" />
          </a>

          <a
            href="https://twitter.com/TamilTheHindu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="desktop-28-item" alt="" src="/TwitterLogo.webp" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCJ36XbT02JNAlBEBgZtW7GQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="desktop-28-item" alt="" src="/YoutubeLogo.webp" />
          </a>
        </div>
      </div>
      <div className="footer-body-content">
        <div className="footer-body-content1">
          <div className="firstGroup-topic">
            {/* <div onClick={HomeClick}>Home</div>
            <div onClick={MotivationClick}>Motivation</div>
            <div onClick={Gameclick}>Games</div>
            <div onClick={MotivationClick}>Events</div>
            <div onClick={EpaperClick}>e-Paper</div> */}
            <div onClick={PrivacyClick}>Privacy Policy</div>
            <div onClick={TermClick}>Terms of Use</div>
          </div>

          <div className="thirdGroup-policy">
            {/* <div onClick={CookiesClick}>Cookie Policy</div> */}

            <div onClick={ContactusClick}>Contact Us</div>
            <div onClick={moreabout}>About US</div>
          </div>
        </div>
        {/* <div className="fourthGroup-subscribe">
          <div className="subscribe-div">Subscribe Now</div>
          <input className="subscribe-input" type="text" placeholder="Email" />
          <button className="subscribe-submit">Submit</button>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
