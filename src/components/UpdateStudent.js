import React, { useContext, useState } from "react";
import { SingleStudentRender } from "./RenderContext.js";
import axios from "axios";


const UpdateStudent = ({ studentId }) => {
	const { render, setRender } = useContext(SingleStudentRender);
	const [ email, setEmail ] = useState('');
	const [ isValid, setIsValid ] = useState(true);

	const submitForm = (e) => {
		e.preventDefault();
		const emailField = e.target.elements.email.value;
		const isValidEmail = emailField.includes('@') && emailField.match(/\.\w{3}$/);
		if(!isValidEmail){
			alert('Enter valid email!');
			return;
		}
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

		axios.patch(target, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(() => document.querySelector(".updateStudent").reset()).then(() => setRender(!render));
	}

  return (
    <div>
	  <form
	  	action={`http://localhost:3000/api/updateStudent/${studentId}`}
	  	onSubmit={submitForm}
	  	method="POST"
	  	className="updateStudent">
	  		<div><input className="form-control" type="text" placeholder="First Name" name="firstName"/></div>
	  		<div><input className="form-control" type="text" placeholder="Last Name" name="lastName"/></div>
	  		<div><input className="form-control" type="text" placeholder="Email" name="email"/></div>
			<br />
	  		<div class="d-flex justify-content-center align-items-center"><button className="btn btn-light" type="submit">Update</button></div>
	  </form>
    </div>
  );
};

export default UpdateStudent;
