import "./VisitorPass.css";
import Swal from "sweetalert2";
function VisitorPass({ pass, dateTime, timeOut, buttonName }) {
  const { id, open, securityName } = pass || {};

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/security/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Request Failed");

      const data = await response.json();
      console.log(data);

      if (data.success) {
        Swal.fire({
          title: "Exited Successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="visitor-pass">
      <h3>OTP Verified!</h3>
      <h2>{pass?.otp?.code}</h2>
      <div>
        <h4>Tenant Details:</h4>
        <p>
          <strong>Full Name : {pass?.otp?.userFullName}</strong>
        </p>
        <p>
          <strong>Phone Number:</strong> {pass?.otp?.userPhoneNumber}
        </p>
        <p>
          <strong>Apartment Id:</strong> {pass?.otp?.apartmentId}
        </p>

        <h4>Visitor Pass:</h4>
        <p>
          <strong>Pass Id:</strong> {id}
        </p>
        <p>
          <strong>Visitor's Name:</strong> {pass?.otp?.visitorName}
        </p>

        <p>
          <strong>Time In:</strong> {dateTime}
        </p>
        <p>
          <strong>Open:</strong> {open ? "True" : "False"}
        </p>
        <p>
          <strong>Time Out:</strong> {timeOut || "N/A"}
        </p>
        <p>
          <strong>Security On Duty:</strong> {securityName}
        </p>
        {buttonName === "Exit" ? (
          <button
            className="exitButton"
            onClick={handleExit}
            value={buttonName}
          >
            {buttonName}
          </button>
        ) : (
          <button
            className="exitButton"
            onClick={handleRefresh}
            value={buttonName}
          >
            {buttonName}
          </button>
        )}
      </div>
    </div>
  );
}

export default VisitorPass;
