var express = require('express');
var router = express.Router();
const fs = require('fs');
let students = JSON.parse(fs.readFileSync('./data/students.json', 'utf-8'));
let grades = JSON.parse(fs.readFileSync('./data/grades.json', 'utf-8'));

//    return all students information
router.get('/students', (req, res, next) => {
    res.status(200).json(students);
});

// add a new student
router.post('/students', (req, res, next) => {
    const student = {};
    const gradeObj = {};
    const { first_name, last_name, matric, email, grade } = req.body;
    if (first_name && last_name && matric && email && grade) {
        student.first_name = first_name;
        student.last_name = last_name;
        student.matric = matric;
        student.email = email;
        let id;
        if (students.length) id = students[students.length - 1]['id'] + 1;
        else id = 0;
        student.id = id;
        gradeObj.studentId = id;
        gradeObj.grade = grade;
    } else {
        return res.status(400).json({ msg: 'Insufficient data' });
    }
    students.push(student);
    grades.push(grade);
    res.status(200).json({ addedstudent: { grade, ...student } });
});

// effect change on all rows in your table
router.put('/students', (req, res, next) => {
    const { first_name, last_name, matric, email, grade } = req.body;
    if (first_name || last_name || matric || email) {
        students.map((student) => {
            student.email = email || student.email;
            student.first_name = first_name || student.first_name;
            student.last_name = last_name || student.last_name;
            student.matric = matric || student.matric;
            return student;
        });
    }
    if (grade) {
        grades.map((el) => {
            el.grade = grade || el.grade;
            return grade;
        });
    }
    res.status(200).json({ students, grades });
});

// delete the entire table
router.delete('/students', (req, res, next) => {
    students.length = 0;
    res.status(204).json(students);
});

// get a particular student given its Id
router.get('/students/:studentId', (req, res, next) => {
    const student = students.find(
        (element) => element.id == req.params.studentId
    );
    if (!student) {
        return res
            .status(400)
            .json({ msg: `no student with id : ${req.params.studentId}` });
    }

    res.status(200).json(student);
});

//update one student
router.put('/students/:studentId', (req, res, next) => {
    const studentIndex = students.findIndex(
        (element) => element.id == req.params.studentId
    );
    if (studentIndex == -1) {
        return res
            .status(400)
            .json({ msg: `no student with id : ${req.params.studentId}` });
    }
    const { first_name, last_name, matric, email } = req.body;
    students[studentIndex];
    students[studentIndex].email = email || students[studentIndex].email;
    students[studentIndex].first_name =
        first_name || students[studentIndex].first_name;
    students[studentIndex].last_name =
        last_name || students[studentIndex].last_name;
    students[studentIndex].matric = matric || students[studentIndex].matric;

    res.status(200).json({
        student: students[studentIndex],
    });
});

//delete one student
router.delete('/students/:studentId', (req, res, next) => {
    const studentIndex = students.findIndex(
        (element) => element.id == req.params.studentId
    );
    if (studentIndex == -1) {
        return res
            .status(400)
            .json({ msg: `no student with id : ${req.params.studentId}` });
    }

    students.splice(studentIndex, 1);
    grades.splice(studentIndex, 1);

    res.status(204).json({});
});

//student grade
router.get('/students/:studentId/grades', (req, res, next) => {
    const grade = grades.find(
        (element) => element.studentId == req.params.studentId
    );
    if (!grade) {
        return res
            .status(400)
            .json({ msg: `no student with id : ${req.params.studentId}` });
    }

    res.status(200).json(grade);
});

//edit student grade
router.put('/students/:studentId/grades', (req, res, next) => {
    const studentIndex = grades.findIndex(
        (element) => element.studentId == req.params.studentId
    );
    if (studentIndex == -1) {
        return res
            .status(400)
            .json({ msg: `no student with id : ${req.params.studentId}` });
    }
    const { grade } = req.body;
    grades[studentIndex].grade = grade || grade[studentIndex].grade;

    res.status(200).json({ grade: grades[studentIndex].grade });
});

module.exports = router;
