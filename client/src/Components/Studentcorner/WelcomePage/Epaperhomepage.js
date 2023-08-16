import React from "react";
import "./Epaperhomepage.css";
import { Container } from "react-bootstrap";
import Epaper_mob from "./images/Epaper-02.webp";
import Epaper_head from "./images/Epaper-01.webp";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./OverAllCss.css";

export default function Epaperhomepage() {
  const navigate = useNavigate();

  function epaperClick() {
    navigate("/epaperview");
  }

  return (
    <>
      <Helmet>
        <title> E-Paper Vetrikkodi, DigiPaper வெற்றிக்கொடி இ-பேப்பர்</title>

        <meta
          name="description"
          content=" பள்ளிகளுக்கென்று ஒரு பிரத்தியேகமான நாளிதழ்  நம் 'வெற்றிக்கொடி'. மாணவர்களை கவரும் வகையில் பல தலைப்புகளில் இப்போது இ-பேப்பர் வடிவில்."
        />

        <meta
          name="keywords"
          content="vetrikodi epaper, tamil epaper, vetrikkodi, vetrikkodi digipaper, digipaper, vetrikodi newspaper, வெற்றிக்கொடி இ-பேப்பர், தமிழ் இ-பேப்பர், Epaper, tamil epaper online, hindu tamil epaper, best tamil epaper, best tamil epaper in tamil, best epaper in india"
        />
      </Helmet>
      <div className="Epaper_homepage">
        <div className="fixed-column">
          <div className="fixed-div left-div">
            <h1> Content for the left div </h1>
          </div>
        </div>

        <Container>
          <div className="center-column">
            <div className="center-div">
              <div className="quizmania_heading">
                <div className="heading_image">
                  <img
                    src={Epaper_head}
                    className="headingimage-quizint"
                    alt="heading_image"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="quizmania_headingh1">
                  <h1 className="quizmania_heading_text">DigiPaper</h1>
                </div>
              </div>

              <div className="center_halves">
                <div className="center_halves_content">
                  <div>
                    பள்ளிகளுக்கென்று ஒரு பிரத்தியேகமான நாளிதழ் நம்{" "}
                    <span className="vetrikkodi">வெற்றிக்கொடி. </span>
                    மாணவர்களை மனரீதியாக செம்மைப்படுத்தி, அவர்களை அறிவில்
                    சிறந்தவர்களாகவும், நாட்டின் பொறுப்புள்ள குடிமக்களாகவும்
                    உருவாக்க ஆசிரியர் சமூகமும் பள்ளி நிர்வாகங்களும் எடுத்து
                    வரும் சீரிய முயற்சிக்கு இந்த{" "}
                    <span className="vetrikkodi">வெற்றிக்கொடி</span> நாளிதழ்
                    முழுமையாகத் தோள் கொடுக்கும். மாணவர்களை கவரும் வகையில் பல
                    தலைப்புகளில்...
                  </div>

                  <div className="center_halves_listed">
                    <div className="center_halves_List">
                      <ul>
                        <li>ஆசிரியர்/பெற்றோர்</li>
                        <li> ஓடி விளையாடு </li>
                        <li> களஞ்சியம்</li>
                        <li> சிந்தனை செய்</li>
                        <li> தலையங்கம்</li>
                      </ul>
                    </div>

                    <div className="center_halves_List">
                      <ul>
                        <li>தேசம்/உலகம்</li>
                        <li> நமது பள்ளி</li>
                        <li> மாணவர் உலகம்</li>
                        <li> ஆங்கிலம் அறிவோம்</li>
                        <li> மற்றும் பல...</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="center_halves_images">
                  <img
                    src={Epaper_mob}
                    data-aos="zoom-in-up"
                    data-aos-offset="300"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-sine"
                  />
                </div>
              </div>

              <div className="center_halves_bottom">
                <div className="center_halves_content">
                  இவைகள் அனைத்தையும் நீங்கள் இருந்த இடத்திலிருந்து படிக்க
                  உங்களுக்கு இ-பேப்பர் வடிவில் பகிர்ந்துள்ளோம்.
                </div>

                <div className="center_halves_images">
                  <button onClick={epaperClick}>இன்றைய இதழை படிக்க</button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="fixed-column">
          <div className="fixed-div right-div">
            <h1> Content for the left div </h1>
          </div>
        </div>
      </div>
    </>
  );
}
