import React, { useContext } from "react";
import { CampusRender } from "./RenderContext.js";
import axios from "axios";


const DeleteCampus = ({ campusId }) => {
	const { render, setRender } = useContext(CampusRender);

	const deleteCampusFunc = () => {
		axios.delete(`http://localhost:3000/api/deleteCampus/${campusId}`).then(() => setRender(!render));
	};
	const buttonLinkStyle = {
  	display: "inline-block",
        fontSize: "30px",
	color: "#f44336",
	border: "none",
	borderRadius: "5px",
	textDecoration: "none",
	cursor: "pointer"
  };
  const buttonLinkHoverStyle = {
  	color: "#d32f2f"
  };


  return (
    <div className="d-flex justify-content-end align-items-start" style={{marginTop: "5px"}}>
	  <button onClick={deleteCampusFunc} className="bg-dark text-right mt-0" style={buttonLinkStyle} onMouseEnter={(e) => e.target.style.color = buttonLinkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = buttonLinkStyle.color}>X</button>
    </div>
  );
};

export default DeleteCampus;
