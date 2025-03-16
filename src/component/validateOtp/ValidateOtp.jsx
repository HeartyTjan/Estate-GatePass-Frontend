import { useState } from "react";
import "./ValidateOtp.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import VisitorPass from "../../reuseable/VisitorPass";

function ValidateOtp() {
  const [isValid, setIsValid] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [visitorPass, setVisitorPass] = useState(null);
  const [timeInDate, setTimeInDate] = useState(null);
  const [timeOutDate, setTimeOutDate] = useState(null);
  const [passInput, setPassInput] = useState("");
  const [isFound, setIsFound] = useState(false);

  const [showValidateOtp, setShowValidateOtp] = useState(true);
  const [showFindVisitorPass, setShowFindVisitorPass] = useState(true);

  const securityData = useSelector((state) => state.security.securityData);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleOtpChange = (event) => setOtpInput(event.target.value);

  const handlePassChange = (event) => setPassInput(event.target.value);

  const handleValidateOtp = async () => {
    const validateRequest = {
      otpCode: otpInput,
      securityName: `${securityData.firstName} ${securityData.lastName}`,
    };

    try {
      const response = await fetch(`http://localhost:8080/security/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validateRequest),
      });

      if (!response.ok) throw new Error("Request Failed");

      const data = await response.json();

      if (data.success) {
        setVisitorPass(data.visitorPass);
        setIsValid(true);
        setShowValidateOtp(false);
        setTimeInDate(formatDate(data.visitorPass?.timeIn));
        setTimeOutDate(formatDate(data.visitorPass?.timeOut));
      } else {
        Swal.fire({
          title: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "An error occurred!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleFindVisitorPass = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/security/${passInput}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Request Failed");

      const data = await response.json();

      if (data.success) {
        setVisitorPass(data.visitorPass);
        setIsFound(true);
        setShowFindVisitorPass(false);
        setTimeInDate(formatDate(data.visitorPass?.timeIn));
        setTimeOutDate(formatDate(data.visitorPass?.timeOut));
      } else {
        Swal.fire({
          title: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "An error occurred!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="otp-validator">
        <h2>Visitor OTP Validator</h2>

        {showValidateOtp && !isValid ? (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpInput}
              onChange={handleOtpChange}
              className="validateOtp-input"
            />
            <button onClick={handleValidateOtp}>Validate OTP</button>
          </div>
        ) : (
          <VisitorPass
            pass={visitorPass}
            dateTime={timeInDate}
            timeOut={timeOutDate}
            buttonName="Go Back"
          />
        )}
      </div>

      {!isValid && (
        <div className="findVisitorPass">
          <h2 className="visitorpasstext">Visitor Pass</h2>

          {showFindVisitorPass && !isFound ? (
            <div>
              <input
                type="text"
                placeholder="Enter Visitor pass Id"
                value={passInput}
                className="validateOtp-input"
                onChange={handlePassChange}
              />
              <button onClick={handleFindVisitorPass}>Find</button>
            </div>
          ) : (
            <VisitorPass
              pass={visitorPass}
              dateTime={timeInDate}
              timeOut={timeOutDate}
              buttonName="Exit"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ValidateOtp;
