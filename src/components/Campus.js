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
	  const buttonLinkStyle = {
		display: "inline-block",
		padding: "10px 20px",
		fontSize: "16px",
		color: "#f8f9fa",
		backgroundColor: "#3e444b",
		border: "none",
		borderRadius: "5px",
		textDecoration: "none",
		cursor: "pointer"
	  };
	  const buttonLinkHoverStyle = {
		backgroundColor: "#292e33"
	  };
	useEffect(() => {
		axios.get(`http://localhost:3000/api/singleCampus/${wizardingSchoolId}`)
			.then((res) => {
				let data = JSON.parse(res.data);
				setCampusObj(data)
				return data;
			})
			.then((data) => {
				setCampusLI(<li className="container">
					<div className="row"><h1 className="text-center text-light col">{data.dataValues.name}</h1></div>
					<div className="row" style={{ position: "relative" }}><img style={{ heigt: "300px", width: "300px" }} className={`col ${centerStyle}`} src={data.dataValues.imageUrl}/></div>
					<div className="row text-center"><h3 className="col text-light">Students</h3><br /> <br /></div>
					<div className="row text-center">
						<div className="col">
						{data.students.map((e) => {
							return(<div><Link to={`/students/${e.id}`} style={{marginRight: "10px"}}>{e.firstName}</Link>  <UnenrollStudent studentId={e.id}/></div>);
						})}
						</div>
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
					<br />
					<div className={`d-flex align-items-center justify-content-center ${buttonLinkStyle}`} style={{ width: "17%", minHeight: "70px", marginLeft: "10px", backgroundColor: "#3e444b"}} onMouseEnter={(e) => e.target.style.backgroundColor = buttonLinkHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = buttonLinkStyle.backgroundColor}><Link to="/wizarding-schools">{"<-- All Campuses"}</Link></div><br />
					<div className="d-flex justify-content-center">
							<ul className="flex-fill">{campusLI}</ul>
					</div>
				</SingleCampusRender.Provider>
			</div>
		);
	}
};

export default Campus;
