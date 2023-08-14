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
					return (<li><Link to={`/wizarding-schools/${e.id}`}>{e.name}</Link><DeleteCampus campusId={e.id}/><img src={e.imageUrl}/></li>);
				}));
			})
	}, [render])


	if(campusLIs.length == 0){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<>
				<CampusRender.Provider value={{render, setRender}}>
					<ul>{campusLIs}</ul>
					<CreateCampus/>
				</CampusRender.Provider>
			</>
		);
	}
};

export default CampusList;
