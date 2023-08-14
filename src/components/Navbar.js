import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
	  <Link to="/wizarding-schools">All Wizard Schools</Link>
	<Link to="/students">All Students</Link>
    </div>
  );
};

export default Navbar;
