const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const uuid = require('uuid');


/*
    Inserting to DB
*/

router.post("/create", (req, res) => {
    const { courseName } = req.body;

    console.log(courseName)

    if (!courseName) return res.status(400).json({ msg: "Enter a course name" });

    let sqlDbCheck = `Select * from courses where slug = ?`;
    let sqlDbInsert = `INSERT INTO courses SET ?`;

    const slugString = slugify(courseName).toLowerCase();

    db.query(sqlDbCheck, slugString, (err, course) => {
        if (course.length > 0) return res.status(400).json({ msg: "Course exists" });

        const data = {
            uid: uuid.v4(),
            course_name: courseName.toLowerCase(),
            slug: slugString,
        }

        db.query(sqlDbInsert, data, (err, result) => {

            console.log(err)
            if (err) return res.status(400).json({ msg: "Insert course error" });

            return res.status(200).json({ data });
        })
    })
});

/*
    Get all courses
*/

router.get("/", (req, res) => {
    let dbGetQuery = `SELECT * FROM courses`;

    db.query(dbGetQuery, (err, results) => {

        if (err) return res.status(400).json({ msg: "Get data error" });

        return res.status(200).json(results);
    })
})

/*
    Delete course
*/

router.delete("/", (req, res) => {

    const { courseId } = req.body;

    let sqlDbDelete = "DELETE FROM courses WHERE course_id = ?";

    db.query(sqlDbDelete, courseId, (err, results) => {

        if (err) return res.status(400).json({ msg: "Delete course error" });

        return res.status(200).json({ success: true });
    })
})


/*
    Update course
*/

router.put("/", (req, res) => {

    const { courseName, students, slug } = req.body;

    console.log(req.body)

    const newSlug = slugify(courseName).toLowerCase();

    console.log(newSlug)

    if (students.length == 0)
        return res.status(400).json({ msg: "Add students to this course" });

    let sqlDbUpdate = `UPDATE courses SET course_name = ?, course_students = ?, slug = ? WHERE slug = ?`;

    db.query(sqlDbUpdate,
        [
            courseName.toLowerCase(),
            students.toString().toLowerCase(),
            newSlug,
            slug
        ],
        (err) => {
            return err
                ? res.status(400).json({ msg: "Unable to update this course" })
                : res.status(200).json({ msg: "Course was updated" })
        }
    )

});

module.exports = router;

