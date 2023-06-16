import React, { useEffect } from "react";
import main from "../image/main.jpg";
import logo from "../image/logo.webp";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");
  const isMobile = step === "mobile";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("profile");
    }
  }, [navigate]);

  const isValidMobile = (str) => {
    const regex = /^\d{10}$/;
    return regex.test(str);
  };

  const isValidOtp = (str) => {
    const regex = /^\d{6}$/;
    return regex.test(str);
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    // Check for keywords commonly found in mobile user agent strings

    const isMobile = /Mobi|Android/i.test(userAgent);

    if (isMobile) {
      return "mobile";
    } else {
      return "web";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (isMobile) {
      handleMobileSubmit();
    } else {
      handleOtpSubmit();
    }
  };

  const handleChange = (e) => {
    if (isMobile) {
      handleMobileChange(e);
    } else {
      handleOtpChange(e);
    }
  };

  const handleMobileChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleMobileSubmit = async () => {
    if (!isValidMobile(mobileNumber)) {
      setError("Not valid mobile number");
      return;
    }

    try {
      const response = await axios.post(
        "https://storebh.bhaaraterp.com/api/login/",
        { mobile_number: mobileNumber }
      );

      const message = response.data.message;

      if (message !== "OTP has been send to your mobile no.!") {
        setError(message);
        return;
      }

      setStep("otp");
    } catch (error) {
      if (error.response && axios.isAxiosError(error)) {
        setError("Failed to verify otp api");
      } else {
        setError("Failed to verify otp");
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (!isValidOtp(otp)) {
      setError("Otp must have 6 digit");
      return;
    }

    try {
      const response = await axios.post(
        "https://storebh.bhaaraterp.com/api/verify-login-otp/",
        {
          mobile_number: mobileNumber,
          mobile_otp: otp,
          type: getDeviceType(),
          registration_token: "",
        }
      );
      localStorage.setItem("token", response.data.token);

      // navigate
      navigate("profile");
    } catch (error) {
      console.log(error);
      if (error.response && axios.isAxiosError(error)) {
        console.log(error.response);
        setError(
          error.response.data.message
            ? error.response.data.message
            : error.response.data.error
            ? error.response.data.error
            : "Failed to send otp api"
        );
      } else {
        setError("Failed to send otp");
      }
    }

    // navigate
  };

  console.log({ otp, mobileNumber });

  return (
    <div className=" py-5">
      <div className="row mainContainer">
        <div className="col-md-6">
          <img className="imgMain" src={main} alt="logo" />
        </div>
        <div className="col-md-6 logo">
          <div className="logoSection">
            <img src={logo} alt="" className="imgLogo" />
            <div className="WRITE">
              <h3>BHAARAT STORE</h3>
              <p>YOUR NEW SHOPPING destination</p>
            </div>
          </div>
          <div className="welcome">
            <h2>welcome</h2>
          </div>
          <div className="SHOPPING">
            <p>
              {isMobile
                ? "ENTER YOUR MOBILE NUMBER TO START SHOPPING"
                : "Verfiy otp"}
            </p>
          </div>
          <form>
            <div class="form-group">
              <label className="mb-2 number" for="mobile-number">
                {isMobile ? "Mobile Number" : "Verify otp"}
              </label>
              <div className="input1">
                <input
                  type="number"
                  onChange={handleChange}
                  value={isMobile ? mobileNumber : otp}
                  className="form-control "
                />

                {error && <p className="text text-error">{error}</p>}
              </div>
            </div>
          </form>
          <button onClick={handleSubmit} type="submit" className="send">
            {isMobile ? "Send otp" : "Verify Otp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
