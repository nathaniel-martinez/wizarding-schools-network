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
	const centerStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	};
	useEffect(() => {
		axios.get(`http://localhost:3000/api/singleCampus/${wizardingSchoolId}`)
			.then((res) => {
				let data = JSON.parse(res.data);
				setCampusObj(data)
				return data;
			})
			.then((data) => {
				setCampusLI(<li>
					<h1 className="text-center text-light">{data.dataValues.name}</h1>
					<img style={{ heigt: "500px", width: "500px" }} className={centerStyle} src={data.dataValues.imageUrl}/>
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
			<div className="bg-dark">
				<SingleCampusRender.Provider value={{ render, setRender }}>
					<div className="d-flex justify-content-center">
							<ul className="flex-fill">{campusLI}</ul>
							<div className="flex-fill"><UpdateCampus campusId={wizardingSchoolId}/></div>
					</div>
				</SingleCampusRender.Provider>
			</div>
		);
	}
};

export default Campus;
