import React, { useContext } from "react";
import { CampusRender } from "./RenderContext.js";
import axios from "axios";


const DeleteCampus = ({ campusId }) => {
	const { render, setRender } = useContext(CampusRender);

	const deleteCampusFunc = () => {
		axios.delete(`http://localhost:3000/api/deleteCampus/${campusId}`).then(setRender(!render));
	}

  return (
    <div>
	  <button onClick={deleteCampusFunc}>X</button>
    </div>
  );
};

export default DeleteCampus;
