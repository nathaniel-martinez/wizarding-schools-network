import React, { useContext } from "react";
import { SingleStudentRender } from "./RenderContext.js";
import axios from "axios";


const UpdateStudent = ({ studentId }) => {
	const { render, setRender } = useContext(SingleStudentRender);
	const submitForm = (e) => {
		e.preventDefault();
		const target = e.target.action;
		//const data = Array.from(e.target.elements)
		//	.map((e) => {Object.keys(e)});
			//.reduce((obj, input) => {Object.assign(obj, { [input.name]: input.value})}, {});
		const formData = new URLSearchParams();
		const dataObj = Array.from(e.target.elements)
				.forEach((e)=>{
					if(e.name !== "" && e.value !== ""){
						formData.append(e.name, e.value);
					}
				});
			//.map((e)=>{return {[e.name]: e.value}})
			//.filter((e)=>{return !(Object.keys(e)[0] === "")});
			//.reduce((obj, input) => {return {...obj, ...input}}, {});
		axios.patch(target, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(document.querySelector(".updateStudent").reset()).then(setRender(!render));
	}

  return (
    <div>
	  <div>Update Student</div>
	  <form
	  	action={`http://localhost:3000/api/updateStudent/${studentId}`}
	  	onSubmit={submitForm}
	  	method="POST"
	  	className="updateStudent">
	  		<div><input type="text" placeholder="First Name" name="firstName"/></div>
	  		<div><input type="text" placeholder="Last Name" name="lastName"/></div>
	  		<div><input type="text" placeholder="Email" name="email"/></div>
	  		<div><input type="text" placeholder="Image url" name="imageUrl"/></div>
	  		<div><input type="text" placeholder="Campus Id" name="campusId"/></div>
	  		<div><button type="submit">Update Student</button></div>
	  </form>
    </div>
  );
};

export default UpdateStudent;
