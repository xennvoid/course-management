const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const uuid = require('uuid').v4;

router.post("/create", (req, res) => {

    console.log(req.body);

    const { name, age, courses, className } = req.body;

    //   Simple validation
    if (!name || !age || !courses || !className) {
        return res.status(400).json({ msg: "Please enter class name" });
    }

    // sql for user
    let sqlCheck = `SELECT * from students WHERE slug = ?`;
    let sql = "INSERT INTO students SET ?";

    const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, slug, async (err, course) => {
        if (course.length > 0)
            return res.status(400).json({ msg: "Student Exists" });

        const data = {
            student_name: name,
            uid: uuid(),
            slug,
            student_age: age.toString(),
            student_course: courses.toString().toLowerCase(),
            student_class: className.toLowerCase(),
        };

        db.query(sql, data, (err) => {
            if (err) {
                return res.status(401).json({ msg: "Unable to store data" });
            }

            return res.status(200).json({ data });
        });
    });
});

router.get("/", (req, res) => {
    let getQuery = `SELECT * FROM students`;

    db.query(getQuery, (err, result) => {
        return res.status(200).json(result);
    });
});

router.put("/", (req, res) => {
    const { name, age, courses, className, uid } = req.body;
    const newSlug = slugify(name).toLowerCase();

    const updatedata =
        "UPDATE students SET student_name = ?, student_age = ?, student_course = ?, student_class = ?, slug = ? WHERE uid = ?";

    db.query(
        updatedata,
        [
            name,
            age,
            courses.toString(),
            className.toLowerCase(),
            newSlug,
            uid,
        ],
        function (error) {
            if (error) return res.status(400).json({ msg: "Unable to update" });

            res
                .status(200)
                .json({ name, age, courses, className, newSlug, updated: true, uid });
        }
    );
});

router.get("/:uid", (req, res) => {

    const { uid } = req.params;

    console.log(uid)

    let getSingle = `SELECT * FROM students WHERE uid = ?`;

    db.query(getSingle, [uid], (err, result) => {
        console.log(result)
        return res.status(200).json(result);
    });
});

router.delete("/:uid", (req, res) => {
    const { uid } = req.params;
    let delQuery = "DELETE FROM students WHERE uid = ?";
    db.query(delQuery, [uid], (err) => {
        if (err) {
            res.send(err).status(400);
        } else {
            res.json({ success: true }).status(200);
        }
    });
});

module.exports = router;
