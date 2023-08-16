import React from "react";
import "../Styles/Profile.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userInformation = userInfo;
  // const navigate = useNavigate();

  // function handleTest() {
  //   navigate("/");
  //   localStorage.clear();
  //   sessionStorage.clear();
  // }

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

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {userInformation ? (
        <div className="profile-user-details">
          <p>
            <strong>Name:</strong> {userInformation.name}
          </p>
          <p>
            <strong>Email:</strong> {userInformation.email}
          </p>
          <p>
            <strong>User ID:</strong> {userInformation.userid}
          </p>
          <p>
            <strong>School Name:</strong> {userInformation.school}
          </p>
          <p>
            <strong>Phone Number:</strong> {userInformation.phone}
          </p>
          <p>
            <strong>Level:</strong> {userInformation.level}
          </p>
          <p>
            <strong>City:</strong> {userInformation.city}
          </p>
          <p>
            <strong>State:</strong> {userInformation.state}
          </p>
          <p>
            <strong>Country:</strong> {userInformation.country}
          </p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
