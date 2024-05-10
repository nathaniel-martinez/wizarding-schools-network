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
		axios.get(`http://localhost:3000/api/singleStudent/${studentId}`)
			.then((res) => {
				let data = JSON.parse(res.data);
				setStudentObj(data)
				return data;
			})
			.then((data) => {
				setStudentLI(
					<>
					<br />
					<Link className={`d-flex align-items-center justify-content-center ${buttonLinkStyle}`} style={{ width: "17%", minHeight: "70px", marginLeft: "10px", backgroundColor: "#3e444b"}} onMouseEnter={(e) => e.target.style.backgroundColor = buttonLinkHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = buttonLinkStyle.backgroundColor} to={`/wizarding-schools/${data.dataValues.campusId}`}>{"<-- Campus"}</Link><br />
					<h1 className="text-center text-light">{`${data.dataValues.firstName} ${data.dataValues.lastName}`}</h1>
					<br />
					<div style={{ position: "relative" }} className="d-flex justify-content-center align-items-center"><img style={{ height: "300px", width: "300px" }} className="centerStyle" src={data.dataValues.imageUrl}/></div>
					<br />
					<h3 className="text-center text-light">{data.dataValues.email}</h3>
					</>
				);
			})
	}, [render])

	if(studentLI == null){
		return(<div>Loading ...</div>);
	}
	else{
		return(
			<div className="bg-dark">
				<SingleStudentRender.Provider value={{render, setRender}}>
					<div>{studentLI}</div>
					<br />
					<br />
					<h4 className="text-light text-center">Update Student</h4>
					<div className="d-flex justify-content-center align-items-center">
						<UpdateStudent studentId={studentId}/>
					</div>
					<br />
					<br />
				</SingleStudentRender.Provider>
			</div>
		);
	}
};

export default Student;
