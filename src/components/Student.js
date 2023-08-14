import axios from "axios";
import React, { useState, useEffect } from "react";
import { SingleStudentRender } from "./RenderContext.js";
import { useParams, Link } from "react-router-dom";
import UpdateStudent from "./UpdateStudent.js";

const Student = () => {
	const { studentId } = useParams();
	const [studentObj, setStudentObj] = useState(null);
	const [studentLI, setStudentLI] = useState(null);
	const [render, setRender] = useState(true);

	useEffect(() => {
		axios.get(`http://localhost:3000/api/singleStudent/${studentId}`)
			.then((res) => {
				let data = JSON.parse(res.data);
				setStudentObj(data)
				return data;
			})
			.then((data) => {
				setStudentLI(<li>
					<div>{data.dataValues.firstName}</div>
					<img src={data.dataValues.imageUrl}/>
					<div>{data.dataValues.email}</div>
					<div>{data.dataValues.magicabilityscore}</div>
					<div>School</div>
					<Link to={`/wizarding-schools/${data.dataValues.campusId}`}>{data.campus}</Link>
				</li>);
			})
	}, [render])

	if(studentLI == null){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<>
				<SingleStudentRender.Provider value={{render, setRender}}>
					<ul>{studentLI}</ul>
					<UpdateStudent studentId={studentId}/>
				</SingleStudentRender.Provider>
			</>
		);
	}
};

export default Student;
