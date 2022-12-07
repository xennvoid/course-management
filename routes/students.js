const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");

/**
    Add student
**/

router.post("/create", (req, res) => {

    const { name, surname, middleName, email, age, group, courses } = req.body;

    let sqlCheck = `SELECT * from students WHERE slug = ?`;
    let sqlInsertStudent = "INSERT INTO students SET ?;";

    let sqlInsertCourses = new Array(courses.length).fill("INSERT INTO joined_courses SET ?;").join('');

    const fullName = name + " " + surname + " " + middleName;
    const slug = slugify(fullName).toLowerCase();

    db.query(sqlCheck, slug, async (err, course) => {
        if (course.length > 0)
            return res.status(400).json({ msg: "Student Exists" });

        const data = {
            student_name: name,
            student_surname: surname,
            student_middlename: middleName,
            student_email: email,
            slug,
            student_age: age,
            student_group: group,
        };

        db.query(sqlInsertStudent, data, (err, result) => {
            if (err) {
                return res.status(401).json({ msg: "Unable to store data" });
            }

            const insertID = result.insertId;

            const joinedCourses = courses?.map(course => ({ student_id: insertID, course_id: course.course_id, grade: course.course_grade }));

            db.query(sqlInsertCourses, [...joinedCourses], (err, result) => {
                if (err) {
                    return res.status(401).json({ msg: "Unable to store data" });
                }

                return res.status(200).json({ data });
            });
        });
    });
});

/**
    Get all students
**/

router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM students`;

    db.query(getQuery, (err, result) => {

        if (!result) return res.status(200).json([]);

        return res.status(200).json(result);
    });
});

/**
    Get student by id
**/

router.get("/:id", (req, res) => {

    const { id } = req.params;

    let getSingle = `SELECT * FROM students WHERE student_id = ?`;

    db.query(getSingle, id, (err, result) => {
        return res.status(200).json(result);
    });
});

/**
    Get student courses
**/

router.get("/:id/courses", (req, res) => {

    const { id } = req.params;

    let getCoursesByStudentIDQuery = `SELECT * FROM joined_courses WHERE student_id = ?;`;

    let getQueryCourses = `SELECT * FROM courses WHERE course_id = ? UNION `;

    db.query(getCoursesByStudentIDQuery, id, (err, results) => {

        if (err) return res.status(400).json({ msg: "Get data error" });

        const coursesIDs = results.map(res => res.course_id);

        const grades = results.map(res => res.grade);

        let getCoursesByIDsQuery = new Array(results.length).fill(getQueryCourses).join('').slice(0, -6); // concating results data into 1 array, deleting UNION str at the end

        db.query(getCoursesByIDsQuery, [...coursesIDs], (err, results) => {

            if (!results) return res.status(200).json([]);

            if (err) return res.status(400).json({ msg: "Get data error" });

            const data = grades.map((grade, i) => ({ ...results[i], course_grade: grade }));

            return res.status(200).json(data);
        });
    });
});

/** 
    Update student
**/

router.put("/", (req, res) => {

    const { id, name, surname, middleName, email, age, group, courses } = req.body;

    const fullName = name + " " + surname + " " + middleName;
    const newSlug = slugify(fullName).toLowerCase();

    const updatedata = "UPDATE students SET student_name = ?, student_surname= ?, student_middlename = ?, student_email = ?, student_age = ?, student_group = ?, slug = ? WHERE student_id = ?";

    let updateCourses = "DELETE FROM joined_courses WHERE student_id = ?;"

    let sqlInsertCourses = new Array(courses.length).fill("INSERT INTO joined_courses SET ?;").join('');

    db.query(
        updatedata,
        [
            name,
            surname,
            middleName,
            email,
            age,
            group,
            newSlug,
            id
        ],
        (error) => {
            if (error) return res.status(400).json({ msg: "Unable to update" });

            db.query(updateCourses, id, (error, result) => {

                const joinedCourses = courses?.map(course => ({ student_id: id, course_id: course.course_id, grade: course.course_grade }));

                if (joinedCourses?.length === 0)
                    return res.status(200).json({ name, surname, middleName, email, age, group, courses, newSlug, updated: true, id });

                db.query(sqlInsertCourses, [...joinedCourses], (error, result) => {

                    if (error) return res.status(400).json({ msg: "Unable to update" });

                    return res.status(200).json({ name, surname, middleName, email, age, group, courses, newSlug, updated: true, id });
                });
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    let deleteQuery = "DELETE FROM students WHERE student_id = ?;"; //DELETE FROM joined_courses WHERE student_id = ?; 

    db.query(deleteQuery, [id, id], (err) => {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json({ success: true }).status(200);
        }
    });
});

module.exports = router;
