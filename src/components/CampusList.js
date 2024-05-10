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
					return (<li className="d-flex justify-content-center" style={{ minHeight: "350px", marginTop: "40px", marginBottom: "40px" }}><div className="container bg-secondary" style={{ width: "40%", position: "relative" }}><div className="row"><div style={{ position: "relative" }} className="col-10"><Link className="text-info" to={`/wizarding-schools/${e.id}`}>{e.name}</Link></div><div className="col-2"><DeleteCampus campusId={e.id}/></div></div><div className="row"><div className="col d-flex justify-content-center align-items-center"><img className="mt-4" style={{ width: "200px", height: "200px" }} src={e.imageUrl}/></div></div></div></li>);
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
					<div className=" d-flex justify-content-center">
							<ul className="col-md-6 flex-fill">{campusLIs}</ul>
					</div>
				</CampusRender.Provider>
			</div>
		);
	}
};

export default CampusList;
