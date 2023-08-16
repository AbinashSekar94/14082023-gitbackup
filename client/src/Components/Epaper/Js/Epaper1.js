import { useState, useEffect } from "react";
import { enc, HmacSHA256 } from "crypto-js";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

// Import styles
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import mixpanel from 'mixpanel-browser';

//Npm packages
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

//Lottie anmation
import Lottie from "lottie-react";
import School from "../Assest/school.json";
import Leave from "../Assest/Is_Holiday.png";
import Loading from "../Assest/loading.json";

//Css pags and
import "../Styles/epaper.css";
// import "../Styles/articleview.css";

export default function ArticleView() {
  const navigate = useNavigate();

  mixpanel.init("bab0d935051812b8eac5703f92516f15",{

    debug:true

  })

  useEffect(() => {

    mixpanel.track('Page View', { page: 'ArticleView' });

  }, []);


  const [subscriptions, setSubscriptions] = useState([]);
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Function to generate the Authorized User JWT
  const generateJWT = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      email: userData.user.email,
      id: userData.user.id,
      provider: "quintype",
      name: userData.user.name,
    };

    const secret = "dA5g32X99qnRMsmmJzjNqaKV";

    const encodedHeaders = enc.Base64.stringify(
      enc.Utf8.parse(JSON.stringify(header))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const encodedPayload = enc.Base64.stringify(
      enc.Utf8.parse(JSON.stringify(payload))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Generating the HMAC SHA256 signature using the secret
    const signature = HmacSHA256(`${encodedHeaders}.${encodedPayload}`, secret);

    // Encoding the signature as a Base64 string without padding
    const encodedSignature = enc.Base64.stringify(signature)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Constructing the JWT token
    const jwtToken = `${encodedHeaders}.${encodedPayload}.${encodedSignature}`;

    // console.log("this is jwt token", jwtToken);

    return jwtToken;
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


          // Additional API call

          try {
            const res = await axios.post(
              `${process.env.REACT_APP_IPCONFIG}Profile`,

              {
                userid: id,
              }
            );

            // console.log(res.data, "profile extract data");

            if (res.data === null || res.data.length === 0) {
              // Navigate to "/Registration" if response is empty or null

              navigate("/Registration");
            } else {
              // Process response data and navigate to "/Main"

              sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));

              // console.log(res.data);

              const fetchSubscriptions = async () => {
                const accesstypeJwt = generateJWT();

                // Set the user context using AccessTypeJS

                window.AccessType.setUser({
                  accesstypeJwt: accesstypeJwt,
                })

                  .then(() => {
                    // Call the getSubscriptions method from AccessTypeJS

                    window.AccessType.getSubscriptions()

                      .then((data) => {
                        setSubscriptions(data.subscriptions);


                        if (
                          data.subscriptions === null ||
                          data.subscriptions.length === 0 ||
                          data.subscriptions[0].active === false
                        ) {
                          window.location.href =
                            "https://news.vetrikkodi.hindutamil.in/subscription";
                          // console.log("not subscribed");
                        } else {
                          // console.log("already subscribed");
                        }
                      })

                      .catch((error) => {
                        console.error("Error fetching subscriptions:", error);

                        window.location.href =
                          "https://news.vetrikkodi.hindutamil.in/subscription";
                      });
                  })

                  .catch((error) => {
                    console.error("Error setting user context:", error);
                  });
              };

              fetchSubscriptions();
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

    const handleBackNavigation = () => {
      checkSessionValidation();
    };

    checkSessionValidation();

    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };

  }, [navigate]);

  const [selectdate, setSelectedDate] = useState(new Date());

  //Navbar Button
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  // console.log(activeButton);

  const handleClick1 = () => {
    setShowDiv1(true);
    setShowDiv2(false);
    setActiveButton(1);
  };

  const handleClick2 = () => {
    setShowDiv1(false);
    setShowDiv2(true);
    setActiveButton(2);
  };

  //--------Atricle view functionality---//

  function dateChange(event) {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    // sessionStorage.setItem("Datevalue", newDate.toISOString().split("T")[0]);
  }

  // const inputDateFormat = 'yyyy-MM-dd'; // Format for the input date value
  const displayDateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format for the displayed date
  const formattedInputDate = selectdate.toISOString().substr(0, 10);
  // console.log(formattedInputDate, "sss");
  const formattedDisplayDate = selectdate.toLocaleDateString(
    "en-US",
    displayDateFormat
  );

  //min Date
  const minDate = "2023-06-19";

  //--------pdf view functionality---//
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  // console.log(pdfUrl);


  

 



  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    toolbarPlugin: () => [],
  });

  

  const fetchPdf = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_IPCONFIG}api/pdf?date=${formattedInputDate}`,
        {
          responseType: "arraybuffer",
        }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
     
    } catch (err) {
      setPdfUrl(null);
     
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    fetchPdf(formattedInputDate);
  }, []);

  function statusclick() {

    navigate("/status");

    mixpanel.track("status button was clicked by someone")

  }

  return (
    <>
      <Container fluid className="epaper_listedNav">
        <ul>
          <li className="epaper_nav-itemss" onClick={statusclick}>
            <FontAwesomeIcon icon={faEye} className="fa-beat" size="sm" />
            <span className="epaper_nav-text">Today's status</span>
          </li>

          <li className="epaper_nav-itemss date-item">
            <label className="date-display" htmlFor="date-input">
              <span>{formattedDisplayDate}</span>
              <input
                id="date-input"
                type="date"
                value={selectdate.toISOString().substr(0, 10)}
                className="date-input"
                onChange={dateChange}
                onSelect={() => {
                  fetchPdf();
                }}
                max={new Date().toISOString().split("T")[0]}
                min={minDate}
              />
            </label>
          </li>

        
        </ul>
      </Container>

      <div>
        {showDiv1 && (
          <div>
            <br />
            <div>
              <div>
                {isLoading ? (
                  <center>
                    <div>
                      <Lottie
                        animationData={Loading}
                        loop={true}
                        className="School_animate"
                      />
                    </div>
                  </center>
                ) : pdfUrl ? (
                  <center>
                    <div className="pcpdf-viewer">
                      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"> */}
                      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${"^3.9.179"}/build/pdf.worker.min.js`}>
                        <Viewer
                          fileUrl={pdfUrl}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
                    </div>
                  </center>
                ) : (
                  <center>
                    <>
                      <Lottie
                        animationData={School}
                        loop={true}
                        className="School_animate"
                      />
                      <img src={Leave} className="Leave_hold" alt="Leave" />
                    </>
                  </center>
                )}
              </div>
            </div>
          </div>
        )}

        {showDiv2 && <div></div>}
      </div>

      <div className="app-footer">
        <input
          type="date"
          value={selectdate.toISOString().substr(0, 10)}
          className="date-input"
          onChange={dateChange}
          max={new Date().toISOString().split("T")[0]}
          min={minDate}
        />

        <button
          onClick={() => {
            fetchPdf();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
