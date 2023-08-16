import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Start.css";
import mixpanel from "mixpanel-browser"

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const API_URL = process.env.REACT_APP_IPCONFIG;

mixpanel.init("bab0d935051812b8eac5703f92516f15",{

  debug:true

})

function Start() {
  const navigate = useNavigate();

  useEffect(() => {

    mixpanel.track('quiz View', { page: 'Start' });

  }, []);

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
          // console.log(id, name, email);
          // Additional API call
          try {
            const res = await axios.post(`${API_URL}Profile`, {
              userid: id,
            });
            // console.log(res.data, "profile extract data");

            if (res.data === null || res.data.length === 0) {
              // Navigate to "/Registeration" if response is empty or null
              navigate("/Registration");
            } else {
              // Process response data and navigate to "/quiz-welcome"
              sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));

              // console.log(res.data);
              navigate("/quiz-welcome");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          window.location.href ="https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code";
       }
      } catch (error) {
        console.error("Error:", error);
        window.location.href ="https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code";
       
      }
    };

    checkSessionValidation();
  }, [navigate]);
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to the Quiz!</h1>
      <p className="welcome-description">
        Test your knowledge and have fun with our quiz. Are you ready?
      </p>
    </div>
  );
}

export default Start;
