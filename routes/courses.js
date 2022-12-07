const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");

/*
    Inserting to DB
*/

router.post("/create", (req, res) => {
    const { courseName } = req.body;

    if (!courseName) return res.status(400).json({ msg: "Enter a course name" });

    let sqlDbCheck = `Select * from courses where slug = ?`;
    let sqlDbInsert = `INSERT INTO courses SET ?`;

    const slugString = slugify(courseName, { remove: /[*~'"!:@]/g }).toLowerCase();

    db.query(sqlDbCheck, slugString, (err, course) => {
        if (course.length > 0) return res.status(400).json({ msg: "Course exists" });

        const data = {
            course_name: courseName,
            slug: slugString,
        }

        db.query(sqlDbInsert, data, (err, result) => {

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
});

/* 
    Get course by ID
*/

router.get("/:id", (req, res) => {

    const { id } = req.params;

    let dbGetQuery = `SELECT * FROM courses WHERE course_id = ?`;

    db.query(dbGetQuery, id, (err, result) => {

        if (err) return res.status(400).json({ msg: "Get course data error" });

        return res.status(200).json(result);
    })
})


/* 
    Get course grades
*/

router.get("/:id/grades", (req, res) => {

    const { id } = req.params;

    let dbGetQuery = `SELECT * FROM joined_courses WHERE course_id = ?`;

    db.query(dbGetQuery, id, (err, result) => {

        if (err) return res.status(400).json({ msg: "Get course data error" });

        return res.status(200).json(result);
    })
});

/*
    Get course students
*/

router.get("/:id/students", (req, res) => {

    const { id } = req.params;

    let dbGetQuery = `SELECT * FROM joined_courses WHERE course_id = ?;`;

    let getQuery = `SELECT * FROM students WHERE student_id = ? UNION `;

    db.query(dbGetQuery, id, (err, results) => {

        if (err) return res.status(400).json({ msg: "Get data error" });

        const studentIDs = results.map(res => res.student_id);

        let getStudentsQuery = new Array(results.length).fill(getQuery).join('').slice(0, -6); // concating results data into 1 array, deleting UNION str at the end

        db.query(getStudentsQuery, [...studentIDs], (err, results) => {

            if (!results) return res.status(200).json([]);

            if (err) return res.status(400).json({ msg: "Get data error" });

            return res.status(200).json(results);
        });
    });
});

/*
    Delete course
*/

router.delete("/", (req, res) => {

    const { id } = req.body;

    let sqlDbDelete = "DELETE FROM courses WHERE course_id = ?;";

    db.query(sqlDbDelete, [id, id], (err, results) => {

        console.log(results)

        if (err) return res.status(400).json({ msg: "Delete course error" });

        return res.status(200).json({ success: true });
    });
});


/*
    Delete student from a course
*/

router.delete("/delete/student/:studentID", (req, res) => {

    const { studentID } = req.params;
    const { id } = req.body;

    let sqlDbDelete = "DELETE FROM joined_courses WHERE student_id = ? AND course_id = ?;";

    db.query(sqlDbDelete, [studentID, id], (err, results) => {

        if (err) return res.status(400).json({ msg: "Delete student from a course error" });

        return res.status(200).json({ success: true });
    });
});

/*
    Update course
*/

router.put("/", (req, res) => {

    const { courseName, courseId } = req.body;

    const newSlug = slugify(courseName).toLowerCase();

    let sqlDbUpdate = `UPDATE courses SET course_name = ?, slug = ? WHERE course_id = ?`;

    db.query(sqlDbUpdate,
        [
            courseName,
            newSlug,
            courseId
        ],
        (err) => {
            return err
                ? res.status(400).json({ msg: "Unable to update this course" })
                : res.status(200).json({ msg: "Course was updated" })
        }
    )

});

module.exports = router;

