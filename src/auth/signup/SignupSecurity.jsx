import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./SignupSecurity.css";

const SignupSecurity = () => {
  const [InCorrectPassword, setInCorrectPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    badgeNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInCorrectPassword(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const response = await fetch(
          "http://localhost:8080/register/newSecurity",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (data.success) {
          Swal.fire({
            title: "Registration successful",
            icon: "success",
          });
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setInCorrectPassword(true);
    }
  };

  return (
    <div className="signupSecurity-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="signupSecurity-form">
        <div className="securityInput-group">
          <label htmlFor="username">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="securityInput-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="securityInput-group">
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="securityInput-group">
          <label htmlFor="bagdeNumber">Badge Number</label>
          <input
            type="text"
            id="badgeNumber"
            name="badgeNumber"
            value={formData.badgeNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="securityInput-group">
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
        <div className="securityInput-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <p className="passwordCorrect">
            {InCorrectPassword ? "Password does not match" : ""}
          </p>
        </div>
        <button type="submit" className="signupSecurity-btn">
          Sign Up
        </button>
        <p className="signupSecurity-p">
          Already have an account?
          <Link to="/signin" id="signIn-link">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupSecurity;
