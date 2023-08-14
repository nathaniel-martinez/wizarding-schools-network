import React, { useState, useEffect } from "react";
import { StudentRender } from "./RenderContext.js";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateStudent from "./CreateStudent.js";
import DeleteStudent from "./DeleteStudent.js";

/* 
    This is you entry point for your routes
*/
const StudentList = () => {
	const [studentObjs, setStudentObjs] = useState([]);
	const [studentLIs, setStudentLIs] = useState([]);
	const [render, setRender] = useState(true);

	useEffect(() => {
		axios.get("http://localhost:3000/api/studentList")
			.then((res) => {
				let data = JSON.parse(res.data);
				setStudentObjs(data)
				return data;
			})
			.then((data) => {
				setStudentLIs(data.map((e) => {
					return (<li><Link to={`/students/${e.id}`}>{e.firstName}</Link><DeleteStudent studentId={e.id}/><img src={e.imageUrl}/></li>);
				}));
			})
	}, [render])


	if(studentLIs.length == 0){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<>
				<StudentRender.Provider value={{render, setRender}}>
					<ul>{studentLIs}</ul>
					<CreateStudent/>
				</StudentRender.Provider>
			</>
		);
	}
};

export default StudentList;
