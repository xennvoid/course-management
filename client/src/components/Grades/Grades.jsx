import React from 'react';
import styles from './Grades.module.scss';

const Grades = ({ selectedCourses, setSelectedCourses }) => {

    const changeCourseGrade = (grade, courseID) => {
        setSelectedCourses(courses => courses.map(course => {
            if (course.course_id === courseID)
                course.course_grade = grade;
            return course;
        }))
    }

    return (
        <>
            <h3>Grades:</h3>
            {
                selectedCourses.map((selectedCourse, i) => (
                    <div className={styles.course} key={selectedCourse.course_id}>
                        <label htmlFor={`course${i}`}>{selectedCourse.course_name}</label>
                        <br />
                        <input
                            className={styles.input}
                            type="number"
                            value={selectedCourse.course_grade}
                            onChange={(e) => changeCourseGrade(e.target.value, selectedCourse.course_id)}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default Grades;