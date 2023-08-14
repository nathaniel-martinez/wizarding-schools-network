"use strict";
const router = require("express").Router();
const { db, Sequelize } = require("../db/index.js");
const bodyParser = require("body-parser");
const SeqWrap = require("../db/seqWrap.js");

// require your database and place your routes here
async function loadAsyncPaths(){
	await SeqWrap.seedDb(db, Sequelize);

	router.use(bodyParser.urlencoded({ extended: true }));
	router.use(bodyParser.json());
	
	
	router.get("/studentList", (req, res) => {
		const getStudents = async () => {
			res.json(JSON.stringify(await SeqWrap.getStudents()));
		}
		getStudents();
	});

	router.get("/campusList", (req, res) => {
		const getCampuses = async () => {
			res.json(JSON.stringify(await SeqWrap.getCampuses()));
		}
		getCampuses();
	});

	router.get("/singleStudent/:id", (req, res) => {
		const getStudent = async () => {
			res.json(JSON.stringify(await SeqWrap.getCampusByStudentId(req.params.id)));
		}
		getStudent();
	});

	router.get("/singleCampus/:id", (req, res) => {
		const getCampus = async () => {
			res.json(JSON.stringify(await SeqWrap.getStudentsByCampusId(req.params.id)));
		}
		getCampus();
	});

	router.post("/createStudent", (req, res) => {
		const createStudent = async () => {
			await SeqWrap.createStudent(req.body);
			res.send(`Created Student: ${JSON.stringify(req.body)}`);
		}
		createStudent();
	})

	router.post("/createCampus", (req, res) => {
		const createCampus = async () => {
			await SeqWrap.createCampus(req.body);
			res.send(`Created Campus: ${JSON.stringify(req.body)}`);
		}
		createCampus();
	})

	router.delete("/deleteStudent/:id", (req, res) => {
		const deleteStudent = async () => {
			await SeqWrap.deleteStudent(req.params.id);
			res.send("Deleted Student!");
		}
		deleteStudent();
	});

	router.delete("/deleteCampus/:id", (req, res) => {
		const deleteCampus = async () => {
			await SeqWrap.deleteCampus(req.params.id);
			res.send("Deleted Campus!");
		}
		deleteCampus();
	});

	router.patch("/updateStudent/:id", (req, res) => {
		const updateStudent = async () => {
			await SeqWrap.updateStudent(req.params.id, req.body);
			res.send(`Updated student id: ${req.params.id}`);
		}
		updateStudent();
	});

	router.patch("/updateCampus/:id", (req, res) => {
		const updateCampus = async () => {
			await SeqWrap.updateCampus(req.params.id, req.body);
			res.send(`Updated campus id: ${req.params.id}`);
		}
		updateCampus();
	});
}

loadAsyncPaths();
module.exports = router;
