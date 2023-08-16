import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../../../Assest/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGamepad,
  faNewspaper,
  faGraduationCap,
  faStopwatch,
  faBars,
  faTimes,
  faUser,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import { Button, Dropdown } from "react-bootstrap";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to fetch user data
  async function fetchUserData() {
    try {
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };

      const xQtAuth = getCookieValue("x-qt-auth");

      const response = await axios.get(
        "https://vetrikkodi.hindutamil.in/api/auth/v1/users/me",
        {
          headers: {
            "x-qt-auth": xQtAuth,
          },
        }
      );

      // Store response data in session storage
      sessionStorage.setItem("userData", JSON.stringify(response.data));

      // Log response data to the console
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkSessionValidation = async () => {
      try {
        const xQtAuth = getCookieValue("x-qt-auth"); // Get the value of 'x-qt-auth' from cookies

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://vetrikkodi.hindutamil.in/api/auth/v1/sessions/validate",
          headers: {
            "x-qt-auth": xQtAuth,
          },
        };

        const response = await axios.request(config);
        if (response.status === 200) {
          setIsLoggedIn(true);
          fetchUserData();
          // Set the isLoggedIn state to true if status code is 200
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
            const res = await axios.post(`${process.env.REACT_APP_IPCONFIG}Profile`, {
              userid: id,
            });
            

            if (res.data === null || res.data.length === 0) {
              // Navigate to "/Registeration" if response is empty or null
              navigate("/Registration");
            } else {
              // Process response data and navigate to "/"
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
      }
    };

    checkSessionValidation();
  }, [navigate]);
  const logoutHandler = () => {
    const xQtAuth = getCookieValue("x-qt-auth");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://vetrikkodi.hindutamil.in/api/auth/v1/logout",
      headers: {
        "x-qt-auth": xQtAuth,
        Cookie: "qt-auth=",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        window.location.href = "https://vetrikkodi.hindutamil.in"; // Redirect to home page
      })
      .catch((error) => {
        console.log(error);
      });

    sessionStorage.clear();
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />

      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>

          <NavLink to="/" className="nav-logo">
            <img src={logo} alt="logo" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ color: "#1d5299" }}
                  size="sm"
                />{" "}
                Home
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink
                to="/epaper"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{ color: "#1d5299" }}
                />{" "}
                News
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink
                to="/studentcorner"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ color: "#1d5299" }}
                />{" "}
                Student Corner
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Motivation"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faStopwatch}
                  style={{ color: "#1d5299" }}
                />{" "}
                MotiveMasters
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Games"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faGamepad}
                  style={{ color: "#1d5299" }}
                />{" "}
                Funiverse
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/epaper"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <FontAwesomeIcon
                  icon={faNewspaper}
                  style={{ color: "#1d5299" }}
                />{" "}
                DigiPaper
              </NavLink>
            </li>

            <li>
              {isLoggedIn ? (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="user-dropdown-toggle">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#ffffff" }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <a
                  href="https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code"
                  className="nav-links"
                >
                  <Button style={{backgroundColor:"#005da4"}}>Login</Button>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

