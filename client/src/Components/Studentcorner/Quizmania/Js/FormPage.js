import React, { useState, useEffect, useCallback } from "react";
import "../Styles/FormPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch default values from 'userQdata' sessionStorage
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: userData.user.id || prevFormData.id,
        name: userData.user.name || prevFormData.name,
        emailid: userData.user.email || prevFormData.emailid,
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    id: sessionStorage.getItem("userid") || "",
    name: sessionStorage.getItem("name") || "",
    dob: "",
    emailid: sessionStorage.getItem("emailid") || "",
    level: "",
    levelid: "",
    gender: "",
    school: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
    accounttype: "",
  });
  const [formErrors, setFormErrors] = useState({
    dobError: "",
    phoneError: "",
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Checkbox state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) {
      console.log("Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IPCONFIG}insertProfile`,
        formData
      );

      // console.log(response);

      if (response.status === 200) {
        console.log("Profile successfully inserted");
        // Reset the form after successful submission
        setFormData({
          id: "",
          name: "",
          dob: "",
          emailid: "",
          level: "",
          levelid: "",
          gender: "",
          school: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          phone: "",
          accounttype: "",
        });

        navigate("/");
      } else {
        console.log("Error inserting profile");
        console.error(response.data);
      }
    } catch (error) {
      console.error("Error inserting profile:", error);
    }
  };

  const fetchPincodeData = useCallback(async () => {
    if (formData.pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${formData.pincode}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setFormData((prevFormData) => ({
            ...prevFormData,
            country: postOffice.Country,
            state: postOffice.State,
            city: postOffice.Division,
          }));
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    }
  }, [formData.pincode]);

  useEffect(() => {
    const { dob, phone } = formData;
    const dobError = dob ? "" : "Date of Birth is required.";
    const phoneError =
      phone.length === 10 ? "" : "* Phone number must have 10 digits.";
    setFormErrors({
      dobError,
      phoneError,
    });
  }, [formData]);

  const isFormValid = Object.values(formData).every(value => value !== "");

  useEffect(() => {
    fetchPincodeData();
  }, [formData.pincode, fetchPincodeData]);

  useEffect(() => {
    if (formData.level === "Primary") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        levelid: 1,
      }));
    } else if (formData.level === "HighSchool") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        levelid: 2,
      }));
    } else if (formData.level === "HigherSec") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        levelid: 3,
      }));
    }
  }, [formData.level]);

  useEffect(() => {
    if (formData.accounttype === "Others") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        level: "HigherSec",
        levelid: 3,
        school:"Others"
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        level: "",
        levelid: "",
        school:"",
      }));
    }
  }, [formData.accounttype]);


  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prevValue) => !prevValue);
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-containers">
        <div className="form-containers-context">
          {/* <label>
        User ID:
        {formData.id}
      </label>
      <br /> */}

          <label>
            <div className="heading">Name:</div>
            <div className="content1">{formData.name}</div>
          </label>
          <br />

          {/* <label>
        Email ID:
        {formData.email}
      </label>
      <br /> */}

          <label>
            <div className="heading">Date of Birth:</div>
            <div className="content">
              <input
                type="date"
                name="dob"
                placeholder="15-Jun-2000"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            {/* {formErrors.dobError && (
          <span className="error">{formErrors.dobError}</span>
        )} */}
          </label>
          <br />

          <label>
            <div className="heading">Account Type:</div>
            <div className="content">
              <select
                name="accounttype"
                value={formData.accounttype}
                onChange={handleChange}
              >
                <option value="">Select your account</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </label>
          <br />

          {formData.accounttype !== "Others" && (
            <label>
              <div className="heading">Level:</div>
              <div className="content">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="">Select your Level:</option>
                  <option value="Primary">Primary</option>
                  <option value="HighSchool">Secondary</option>
                  <option value="HigherSec">High School</option>
                </select>
              </div>
            </label>
          )}
          <br />

         

          <label>
            <div className="heading">Gender:</div>
            <div className="content">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select your Gender:</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </label>
          <br />

          {formData.accounttype !== "Others" && (
          <label>
            <div className="heading">School:</div>
            <div className="content">
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
          </label>)}
          <br />
        </div>
        <div className="form-containers-context">
          <label>
            <div className="heading">Pincode:</div>
            <div className="content">
              <input
              maxLength={6}
              minLength={6}
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <br />

          <label>
            <div className="heading">Country:</div>
            <div className="content">
              <input
                type="text"
                name="country"
                value={formData.country}
                style={{pointerEvents:"none"}}
                readonly
              />
            </div>
          </label>
          <br />

          <label>
            <div className="heading">State:</div>
            <div className="content">
              <input
                type="text"
                name="state"
                value={formData.state}
                style={{pointerEvents:"none"}}
                readonly
              />
            </div>
          </label>
          <br />

          <label>
            <div className="heading">City:</div>
            <div className="content">
              <input
                type="text"
                name="city"
                value={formData.city}
               style={{pointerEvents:"none"}}
              />
            </div>
          </label>
          <br />

          <label>
            <div className="heading">Phone:</div>
            <div className="content">
              <input
                type="text"
                maxLength={10}
              minLength={10}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={(e) => {
                  const keyCode = e.which || e.keyCode;
                  const keyValue = String.fromCharCode(keyCode);
                  if (!/^\d+$/.test(keyValue)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </label>
          <div className="errorMsg">
            {formErrors.phoneError && (
              <span className="error">{formErrors.phoneError}</span>
            )}
          </div>
          <br />
        </div>
      </div>
      <div>
        <label className="terms">
          <input
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
          />
          <a href="https://vetrikkodi.hindutamil.in/privacy" target="blank">
            I have read and agreed to the terms and conditions *
          </a>
        </label>
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default FormPage;