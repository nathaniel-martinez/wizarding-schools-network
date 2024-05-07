import React, { useState, useEffect } from "react";
import { CampusRender } from "./RenderContext.js";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateCampus from "./CreateCampus.js";
import DeleteCampus from "./DeleteCampus.js";

/* 
    This is you entry point for your routes
*/
const CampusList = () => {
	const [campusObjs, setCampusObjs] = useState([]);
	const [campusLIs, setCampusLIs] = useState([]);
	const [render, setRender] = useState(true);

	useEffect(() => {
		axios.get("http://localhost:3000/api/campusList")
			.then((res) => {
				let data = JSON.parse(res.data);
				setCampusObjs(data)
				return data;
			})
			.then((data) => {
				setCampusLIs(data.map((e) => {
					return (<li style={{ marginLeft: "40px", marginTop: "40px", marginBottom: "40px" }}><Link to={`/wizarding-schools/${e.id}`}>{e.name}</Link><DeleteCampus campusId={e.id}/><img style={{ width: "200px", height: "200px" }} src={e.imageUrl}/></li>);
				}));
			})
	}, [render])


	if(campusLIs.length == 0){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<div className="bg-dark">
				<CampusRender.Provider value={{render, setRender}}>
					<h1 className="text-center text-light">Campus List</h1>
					<div className="d-flex justify-content-center">
							<ul className="flex-fill">{campusLIs}</ul>
							<div className="flex-fill"><CreateCampus/></div>
					</div>
				</CampusRender.Provider>
			</div>
		);
	}
};

export default CampusList;
