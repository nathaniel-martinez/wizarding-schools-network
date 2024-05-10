import React, { useContext } from "react";
import { StudentRender } from "./RenderContext.js";
import axios from "axios";


const DeleteStudent = ({ studentId }) => {
	const { render, setRender } = useContext(StudentRender);

	const deleteStudentFunc = () => {
		axios.delete(`http://localhost:3000/api/deleteStudent/${studentId}`).then(() => setRender(!render));
	}

  return (
    <div style={{ position: "absolute", right: "0" }}>
	  <button onClick={deleteStudentFunc}>X</button>
    </div>
  );
};

export default DeleteStudent;
