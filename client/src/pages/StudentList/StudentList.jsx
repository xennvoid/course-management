import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import { getAllStudents } from '../../store/slices/studentsSlice';
import StudentCard from './StudentCard/StudentCard';
import styles from './StudentList.module.scss';
import slugify from 'slugify';
import useDebounceSearch from '../../hooks/useDebounceSearch';
import EmptyInfo from '../../components/EmptyInfo/EmptyInfo';

const StudentsList = () => {

    const [searchValue, debouncedResults] = useDebounceSearch();
    const dispatch = useDispatch();
    const { students } = useSelector(state => state.students);
    let studentsList = students;

    useEffect(() => {
        dispatch(getAllStudents());
    }, [dispatch])

    if (searchValue !== "") {
        studentsList = students?.filter((student) => {
            const studentSlug = slugify(searchValue.toLowerCase());
            return student?.slug.includes(studentSlug);
        });
    }

    return (
        <div>
            <Search onChange={debouncedResults} placeholder="Input student`s name..." />
            {
                studentsList?.length > 0
                    ?
                    <ul className={styles.list}>
                        {
                            studentsList?.map(student => <StudentCard key={student.student_id} student={student} />)
                        }
                    </ul>
                    : <EmptyInfo>List of students is empty</EmptyInfo>
            }
        </div>
    )
}

export default StudentsList;