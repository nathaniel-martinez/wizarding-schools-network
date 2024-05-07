import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const buttonLinkStyle = {
  	display: "inline-block",
	padding: "10px 20px",
        fontSize: "16px",
	color: "#f8f9fa",
	backgroundColor: "#3e444b",
	border: "none",
	borderRadius: "5px",
	textDecoration: "none",
	cursor: "pointer"
  };
  const buttonLinkHoverStyle = {
  	backgroundColor: "#292e33"
  };
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
      <h1>Welcome to the Wizarding Schools Network!</h1>
      <br />
      <br />
      <Link to="/wizarding-schools" style={buttonLinkStyle} onMouseEnter={(e) => e.target.style.backgroundColor = buttonLinkHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = buttonLinkStyle.backgroundColor}>Begin!</Link>
    </div>
  );
};

export default Main;
