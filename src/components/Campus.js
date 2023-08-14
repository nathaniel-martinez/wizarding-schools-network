import axios from "axios";
import React, { useState, useEffect } from "react";
import { SingleCampusRender } from "./RenderContext.js";
import { useParams, Link } from "react-router-dom";
import UpdateCampus from "./UpdateCampus.js";
import UnenrollStudent from "./UnenrollStudent.js";

const Campus = () => {
	const { wizardingSchoolId } = useParams();
	const [campusObj, setCampusObj] = useState(null);
	const [campusLI, setCampusLI] = useState(null);
	const [render, setRender] = useState(true);

	useEffect(() => {
		axios.get(`http://localhost:3000/api/singleCampus/${wizardingSchoolId}`)
			.then((res) => {
				let data = JSON.parse(res.data);
				setCampusObj(data)
				return data;
			})
			.then((data) => {
				setCampusLI(<li>
					<div>{data.dataValues.name}</div>
					<img src={data.dataValues.imageUrl}/>
					<div>Students</div>
					<div>
						{data.students.map((e) => {
							return(<div><Link to={`/students/${e.id}`}>{e.firstName}</Link><UnenrollStudent studentId={e.id}/></div>);
						})}
					</div>
				</li>);
			})
	}, [render])

	if(campusLI == null){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<>
				<SingleCampusRender.Provider value={{ render, setRender }}>
					<ul>{campusLI}</ul>
					<UpdateCampus campusId={wizardingSchoolId}/>
				</SingleCampusRender.Provider>
			</>
		);
	}
};

export default Campus;
