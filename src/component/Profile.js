import React, { useState, useEffect } from "react";
import logo from "../image/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const response = await axios.get(
          "https://storebh.bhaaraterp.com/api/my-profile/",
          { headers: { Token: token } }
        );

        if (response.data.msg !== "Data get Successfully") {
          navigate("/");
          return;
        }
        setUserData(response.data.data.profile_data[0]);
        console.log(response);
      } catch (error) {
        if (error.response && axios.isAxiosError(error)) {
          navigate("/");
        }
      }
    })();
  }, [navigate]);

  console.log({ userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sddsds", { userData });
    try {
      const response = await axios.post(
        "https://storebh.bhaaraterp.com/api/update-profile/",
        userData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="icon"
            style={{ width: "30px", height: "30px" }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <img
            src={logo}
            alt=""
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        </div>
        <div>
          <form>
            <div style={{ width: "500px" }}>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="search for products, brands and more"
              />
            </div>
          </form>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "100px",
            }}
            alt=""
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          />
          <div className="heart" style={{ display: "flex", gap: "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <div style={{ position: "relative" }}>
              <p>wishlist</p>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100px",
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  position: "absolute",
                  bottom: "27px",
                  left: "45px",
                }}
              >
                <span style={{ color: "white" }}>3</span>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                style={{ height: "30px", width: "30px" }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <div style={{ position: "relative" }}>
                <p>Bag</p>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "100px",
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    position: "absolute",
                    bottom: "24px",
                    left: "25px",
                  }}
                >
                  <span style={{ color: "white" }}>1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="wallet" style={{ display: "flex", gap: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ height: "30px", width: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
            <div style={{ position: "relative" }}>
              <p>Wallet</p>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100px",

                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  position: "absolute",
                  bottom: "24px",
                  left: "25px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* //navbar comp */}

      <div className="row mainContainer">
        <div
          className="col-md-4 Services"
          style={{
            backgroundColor: "rgb(250,252,252)",
            boderradius: "60px",
            padding: "40px 40px 0 120px",
            justifyContent: "space-between",
            backgroundcolor: "blue",
          }}
        >
          <div
            className="Account"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Account Setting
          </div>
          <div
            className="Referral"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            referral $ Earn
          </div>
          <div
            className="order"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            order
          </div>
          <div
            className="invoice"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            invoive
          </div>
          <div
            className="washlist"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Wishlist
          </div>
          <div
            className="Adders"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Adders
          </div>
          <div
            className="notifation"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            Notifications
          </div>
          <div
            className="logout"
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "30px", height: "30px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Logout
          </div>
        </div>
        {/* Services  */}

        {/* Personal infor */}

        <div className="col-md-8">
          <h5 style={{ marginBottom: "32px" }}>Personal Information</h5>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "100px",
                alignSelf: "center",
              }}
              alt=""
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div class="form-group02">
                <label className="mb-2 number" for="mobile-number">
                  FirstName
                </label>
                <div className="input1">
                  <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div class="form-group02">
                <label className="mb-2 number" for="EMAIL">
                  EMAIL
                </label>
                <div className="input1">
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control "
                  />
                </div>
              </div>

              <div class="form-group02">
                <label className="mb-2 number" for="DOB">
                  Date of Birth*
                </label>
                <div className="input1">
                  <input
                    name="date_of_birth"
                    value={userData.date_of_birth}
                    onChange={handleChange}
                    type="Date"
                    className="form-control "
                  />
                </div>
              </div>

              <div class="form-group02">
                <label className="mb-2 number" for="GST-NO">
                  GST No
                </label>
                <div className="input1">
                  <input
                    name="gst_no"
                    value={userData.gst_no}
                    onChange={handleChange}
                    type="text"
                    className="form-control "
                  />
                </div>
              </div>
              <div class="form-group02">
                <label className="mb-2 number" for="Ifsc-code">
                  IFSC
                </label>
                <div className="input1">
                  <input
                    name="ifsc_code"
                    value={userData.ifsc_code}
                    onChange={handleChange}
                    type="text"
                    className="form-control "
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group02">
                <label className="mb-2 number" for="last-name">
                  Last Name
                </label>
                <div className="input1">
                  <input
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    type="Text"
                    className="form-control "
                  />
                </div>
              </div>
              <div class="form-group02">
                <label className="mb-2 number" for="gender">
                  Gender*
                </label>
                <div className="input1">
                  <input
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    type="text"
                    className="form-control "
                  />
                </div>
              </div>
              <div class="form-group02">
                <label className="mb-2 number" for="mobile-number">
                  Mobile Number*
                </label>
                <div className="input1 ">
                  <input
                    name="mobile_no"
                    value={userData.mobile_no}
                    onChange={handleChange}
                    type="number"
                    className="form-control "
                  />
                </div>
              </div>
              <div class="form-group02">
                <label className="mb-2 number" for="mobile-number">
                  Bank Account Number*
                </label>
                <div className="input1">
                  <input
                    name="bank_account_number"
                    value={userData.bank_account_number}
                    onChange={handleChange}
                    type="number"
                    className="form-control "
                  />
                </div>
              </div>
              <div onClick={handleSubmit} className="save-change">
                Saves Change
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
