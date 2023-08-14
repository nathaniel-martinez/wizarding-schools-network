import React, { useContext } from "react";
import { CampusRender } from "./RenderContext.js";
import axios from "axios";


const CreateCampus = () => {
	const { render, setRender } = useContext(CampusRender);
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
		axios.post(target, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(document.getElementById("createCampus").reset()).then(setRender(!render));
	}

  return (
    <div>
	  <div>Create Campus</div>
	  <form
	  	action={"http://localhost:3000/api/createCampus"}
	  	onSubmit={submitForm}
	  	method="POST"
	  	id="createCampus">
	  		<div><input type="text" placeholder="Campus Name" name="name" required/></div>
	  		<div><input type="text" placeholder="Address" name="address" required/></div>
	  		<div><input type="text" placeholder="Image url" name="imageUrl" required/></div>
	  		<div><textarea placeholder="Description" name="description" required/></div>
	  		<div><button type="submit">Create Campus</button></div>
	  </form>
    </div>
  );
};

export default CreateCampus;
