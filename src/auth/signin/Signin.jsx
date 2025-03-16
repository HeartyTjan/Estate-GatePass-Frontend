import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTenantData } from "../../app/TenantSlice";
import { setSecurityData } from "../../app/SecuritySlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./Signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Tenant",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.role === "Tenant") {
      const tenantApi = "http://localhost:8080/register/login";
      const generateOtpPage = "/home";
      fetchFromApi(tenantApi, generateOtpPage, formData, setTenantData);
    }

    if (formData.role === "Security") {
      const securityApi = "http://localhost:8080/register/login";
      const validateOtp = "/validate";
      fetchFromApi(securityApi, validateOtp, formData, setSecurityData);
    }
  };

  const fetchFromApi = async (
    urlLink,
    navigationPath,
    userLoginData,
    setUserData
  ) => {
    try {
      const response = await fetch(urlLink, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLoginData),
      });

      if (!response.ok) throw new Error("Request Failed");

      const data = await response.json();

      if (data.success) {
        const user = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        };

        dispatch(setUserData(user));

        Swal.fire({
          title: `${data.message}`,
        });

        setTimeout(() => {
          navigate(navigationPath);
        }, 500);
      } else {
        Swal.fire({
          title: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="Tenant"
              checked={formData.role === "Tenant"}
              onChange={handleChange}
            />
            Tenant
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Security"
              checked={formData.role === "Security"}
              onChange={handleChange}
            />
            Security
          </label>
        </div>

        <button type="submit" className="signin-btn">
          Sign In
        </button>
      </form>
      <div className="signup-link">
        <p>Don't have an account?</p>
        <p>Sign Up</p>
        <p>
          <Link to="/signup" className="signup-link2">
            Tenant
          </Link>
        </p>
        <p>
          <Link to="/signup-security" className="signup-link2">
            Security Officer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
