import React, { useContext } from "react";
import { StudentRender } from "./RenderContext.js";
import axios from "axios";


const CreateStudent = () => {
	const { render, setRender } = useContext(StudentRender);
	const submitForm = (e) => {
		e.preventDefault();
		const target = e.target.action;
		//const data = Array.from(e.target.elements)
		//	.map((e) => {Object.keys(e)});
			//.reduce((obj, input) => {Object.assign(obj, { [input.name]: input.value})}, {});
		const formData = new URLSearchParams();
		const dataObj = Array.from(e.target.elements)
				.forEach((e)=>{
					if(e.name !== ""){
						formData.append(e.name, e.value);
					}
				});
			//.map((e)=>{return {[e.name]: e.value}})
			//.filter((e)=>{return !(Object.keys(e)[0] === "")});
			//.reduce((obj, input) => {return {...obj, ...input}}, {});
		axios.post(target, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(document.getElementById("createStudent").reset()).then(setRender(!render));
	}

  return (
    <div>
	  <div>Create Student</div>
	  <form
	  	action={"http://localhost:3000/api/createStudent"}
	  	onSubmit={submitForm}
	  	method="POST"
	  	id="createStudent">
	  		<div><input type="text" placeholder="First Name" name="firstName" required/></div>
	  		<div><input type="text" placeholder="Last Name" name="lastName" required/></div>
	  		<div><input type="text" placeholder="Email" name="email" required/></div>
	  		<div><input type="text" placeholder="Image url" name="imageUrl" required/></div>
	  		<div><input type="text" placeholder="Campus Id" name="campusId" required/></div>
	  		<div><button type="submit">Create Student</button></div>
	  </form>
    </div>
  );
};

export default CreateStudent;
