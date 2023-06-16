import React from "react";
import main from "./image/main.jpg";
import logo from "./image/logo.webp";

const verfiy = () => {
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
            <h2>Email Verification</h2>
          </div>

          <form>
            <div class="form-group">
              <div className="input1">
                <input type="number" className="form-control " />
              </div>
            </div>
          </form>
          <div className="verify">Verify OTP</div>
        </div>
      </div>
    </div>
  );
};

export default verfiy;
