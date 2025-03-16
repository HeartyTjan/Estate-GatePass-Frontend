import React, { useState } from "react";
import "./OtpGenerator.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearTenant } from "../../app/TenantSlice";

const OtpGenerator = () => {
  const [otp, setOtp] = useState("");
  const [visitorNameInput, setVistorNameInput] = useState("");

  const userData = useSelector((state) => state.tenant.tenantData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearTenant());
    navigate("/signin");
  };
  const generateOtp = async () => {
    if (!visitorNameInput) alert("Enter Visitor name to proceed");
    else {
      const tenantInfo = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        apartmentId: userData.apartmentId,
        visitorName: visitorNameInput,
      };
      try {
        const response = await fetch("http://localhost:8080/tenant/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tenantInfo),
        });
        if (!response.ok) throw new Error("Request Failed");
        const data = await response.json();

        if (data.success) {
          setOtp(data.code);
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="otp-container">
      <p className="logout" onClick={handleLogout}>
        Logout
      </p>
      <h2>Generate OTP</h2>
      <label htmlFor="" className="visitorText">
        Enter Visitor's Name
      </label>
      <input
        type="text"
        placeholder="Visitor Name"
        required
        className="visitorName-input"
        onChange={(e) => setVistorNameInput(e.target.value)}
      />
      <p>Click the button below to generate a One-Time Password (OTP)</p>
      <button className="generate-btn" onClick={generateOtp}>
        Generate OTP
      </button>

      {otp && (
        <div className="otp-display">
          <h3>Your OTP: </h3>
          <div className="otp-code">{otp}</div>
        </div>
      )}
    </div>
  );
};

export default OtpGenerator;
