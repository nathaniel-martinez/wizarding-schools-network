import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import Navbar from "./Navbar.js";
import CampusList from "./CampusList.js";
import StudentList from "./StudentList.js";
import Campus from "./Campus.js";
import Student from "./Student.js";

const Root = () => {
  return (
    <div className="navigation">
	<Navbar/>
      <Routes>
        <Route path="/" element={<Main />} />
	  <Route path="/wizarding-schools" element={<CampusList/>}/>
	  <Route path="/students" element={<StudentList/>}/>
	  <Route path="/wizarding-schools/:wizardingSchoolId" element={<Campus/>}/>
	  <Route path="/students/:studentId" element={<Student/>}/>
      </Routes>
    </div>
  );
};

export default Root;
