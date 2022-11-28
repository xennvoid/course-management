import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../store/slices/coursesSlice';
import Course from './Course/Course';
import Search from '../../components/Search/Search';
import EmptyInfo from '../../components/EmptyInfo/EmptyInfo';
import styles from './Courses.module.scss';
import slugify from 'slugify';
import useDebounceSearch from '../../hooks/useDebounceSearch';

const Courses = () => {

    const [searchValue, debouncedResults] = useDebounceSearch();
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);

    let coursesList = courses;

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    if (searchValue !== "") {
        coursesList = courses?.filter((course) => {
            const courseSlug = slugify(searchValue.toLowerCase());
            return course?.slug.includes(courseSlug);
        });
    }

    return (
        <div className={styles.courses}>
            <Search onChange={debouncedResults} placeholder={"Input course name..."} />
            {
                coursesList?.length > 0
                    ?
                    <ul className={styles.list}>
                        {
                            coursesList?.map(course => <Course key={course.course_id} courseName={course.course_name} courseId={course.course_id} />)
                        }
                    </ul>
                    : <EmptyInfo>List of courses is empty</EmptyInfo>
            }
        </div>
    )
}

export default Courses;