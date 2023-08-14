import React, { useContext } from "react";
import { SingleCampusRender } from "./RenderContext.js";
import axios from "axios";


const UpdateCampus = ({ campusId }) => {
	const { render, setRender } = useContext(SingleCampusRender);
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
		axios.patch(target, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(document.querySelector(".updateCampus").reset()).then(setRender(!render));
	}

  return (
    <div>
	  <div>Update Campus</div>
	  <form
	  	action={`http://localhost:3000/api/updateCampus/${campusId}`}
	  	onSubmit={submitForm}
	  	method="POST"
	  	className="updateCampus">
	  		<div><input type="text" placeholder="Campus Name" name="name"/></div>
	  		<div><input type="text" placeholder="Address" name="address"/></div>
	  		<div><input type="text" placeholder="Image url" name="imageUrl"/></div>
	  		<div><textarea placeholder="Description" name="description"/></div>
	  		<div><button type="submit">Update Campus</button></div>
	  </form>
    </div>
  );
};

export default UpdateCampus;
