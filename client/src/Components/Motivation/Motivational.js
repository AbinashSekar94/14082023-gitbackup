import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./coming-soon.json";

const Motivational = () => {
  // useEffect(() => {
  //   const checkSessionValidation = async () => {
  //     try {
  //       const getCookieValue = (name) => {
  //         const value = `; ${document.cookie}`;
  //         const parts = value.split(`; ${name}=`);
  //         if (parts.length === 2) return parts.pop().split(';').shift();
  //       };

  //       const xQtAuth = getCookieValue('x-qt-auth');

  //       // Decode the x-qt-auth value
  //       const decodedXQtAuth = decodeURIComponent(xQtAuth);

  //       // Console log the decoded x-qt-auth
  //       console.log(decodedXQtAuth);

  //       let config = {
  //         method: 'post',
  //         maxBodyLength: Infinity,
  //         url: 'https://vetrikkodi.hindutamil.in/api/auth/v1/sessions/validate',
  //         headers: {
  //           'x-qt-auth': xQtAuth,
  //         },
  //       };

  //       const response = await axios.request(config);
  //       if (response.status === 200) {
  //         // Session is validated, render Motivational page
  //         // console.log(response); 
  //       } else {
  //         // Redirect to the login page or authorization URL
  //         console.log("Please login");
  //         window.location.href = 'https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code';
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       // alert("Please login");
  //       // // Redirect to the login page or authorization URL
  //        window.location.href = 'https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/authorize?client_id=1870&redirect_uri=https://vetrikkodi.hindutamil.in/api/auth/v1/oauth/token&callback_uri=https://vetrikkodi.hindutamil.in&response_type=code';
  //     }
  //   };

  //   checkSessionValidation();
  // }, []);

  return (
    <div>
      <Lottie animationData={groovyWalkAnimation} loop={true} />
    </div>
  );
};

export default Motivational;

