const seed = require("../../seed.js");

let seqObjs;
let db;
let Seq;


//run first
/*async function setObjs(dataBase, SequelizeObj){
	db = dataBase;
	Seq = SequelizeObj;
	db.alfa = "property passed through enviroment";
	let v1 = await seedDb();
	console.log(`In parent initializer after running seed function wrapper ${db.models.student}`);
}*/

async function seedDb(dataBase, SequelizeObj){
	db = dataBase;
	Seq = SequelizeObj;
	let v2 = await seed(db, Seq);
	console.log(`in seed fnction wrapper: ${db.models.student}`);
}


async function getStudents(){
	console.log(`In sibbling function of initializer ${db.models.student}`);
	console.log(`is funtion defined?: ${typeof(db.models.student.findAll())}`);
	return db.models.student.findAll();
}

async function getCampuses(){
	return db.models.wizardingSchool.findAll();
}

async function getStudent(studentId){
	return db.models.student.findOne({ where: { id: studentId}});
}

async function getCampus(campusId){
	return db.models.wizardingSchool.findOne({ where: { id: campusId}});
}

async function getCampusByStudentId(studentId){
	let student = await db.models.student.findOne({ where: { id: studentId}});
	let campus = await db.models.wizardingSchool.findOne({ where: { id: student.campusId}});
	let studentAndCampus = {
		...student,
		campus: campus.name
	}
	return studentAndCampus;
}

async function getStudentsByCampusId(campusIdVal){
	let campus = await db.models.wizardingSchool.findOne({ where: { id: campusIdVal}});
	let students = await db.models.student.findAll({ where: {campusId: campusIdVal}});
	let campusAndStudents = {
		...campus,
		students: students
	}
	return campusAndStudents;
}

async function createStudent(e){
	return db.models.student.create(e);
}

async function createCampus(e){
	console.log("Called createCamput() in seqWrap")//delete later
	return db.models.wizardingSchool.create(e);
}

async function deleteStudent(studentIdVal){
	await db.models.student.destroy({ where: { id: studentIdVal } });
}

async function deleteCampus(campusIdVal){
	await db.models.wizardingSchool.destroy({ where: { id: campusIdVal } });
}

async function updateStudent(studentIdVal, e){
	await db.models.student.update(e, {where: {id: studentIdVal}});
}

async function updateCampus(campusIdVal, e){
	await db.models.wizardingSchool.update(e, {where: {id: campusIdVal}});
}
/*
async function createStudent(e){
	console.log("Object Passed into function" + e.name);
	return db.models.student.create({name: e.name, type: e.type, wizardingSchoolname: e.wizardingSchool, imageurl: e.image});
}

async function createCampuse(e){
	return db.models.wizardingSchool.create({firstname: e.firstName, lastname: e.lastName, team: e.team, imageurl: e.image});
}

async function deletePokemon(idVal){
	await db.models.student.destroy({ where: { id: idVal } });
}

async function deleteTrainer(idVal){
	await db.models.wizardingSchool.destroy({ where: { id: idVal } });
}

async function updatePokemon(idVal, e){
	await db.models.student.update({name: e.name, type: e.type, wizardingSchoolname: e.wizardingSchool, imageurl: e.image}, {where: {id: idVal}});
}

async function updateTrainer(idVal, e){
	await db.models.wizardingSchool.update({firstname: e.firstName, lastname: e.lastName, team: e.team, imageurl: e.image}, {where: {id: idVal}});
}

async function sync(){
	db.sync();
}
*/
module.exports = {seedDb, getStudents, getCampuses, getStudent, getCampus, getCampusByStudentId, getStudentsByCampusId, createStudent, createCampus, deleteStudent, deleteCampus, updateStudent, updateCampus};
