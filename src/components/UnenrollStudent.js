import React, { useContext } from "react";
import { SingleCampusRender } from "./RenderContext.js";
import axios from "axios";


const UnenrollStudent = ({ studentId }) => {
	const { render, setRender } = useContext(SingleCampusRender);

	const unenrollStudentFunc = () => {
		axios.patch(`http://localhost:3000/api/updateStudent/${studentId}`, {campusId: null}, {headers: {'Content-Type': 'application/json'}}).then(setRender(!render));
	}

  return (
  	<button onClick={unenrollStudentFunc}>Unenroll</button>
  );
};

export default UnenrollStudent;
