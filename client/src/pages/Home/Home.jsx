import React from 'react';
import styles from './Home.module.scss';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import courseImg from '../../assets/images/course.jpg';

const Home = () => {

    const navigate = useNavigate();

    const controls = [
        { linkTo: 'add/course', text: "Create a new course" },
        { linkTo: 'add/class', text: "Create a new class" },
        { linkTo: 'add/student', text: "Add a new student" }
    ];

    const manageControls = [
        { linkTo: "manage/students", text: "Manage Students" },
        { linkTo: "/", text: "Manage Classes" },
        { linkTo: "manage/courses", text: "Manage Courses" }
    ];

    return (
        <div className={styles.home}>
            <div className={styles.menu}>
                <div className={styles.info}>
                    <img src={courseImg} alt="" />
                </div>
                <div className={styles.controls}>
                    {
                        controls.map((control, i) =>
                            <CustomButton
                                key={i}
                                onClick={() => navigate(control.linkTo)}
                            >
                                {control.text}
                            </CustomButton>)
                    }
                    <div className={styles.manage}>
                        {
                            manageControls.map(((control, i) => <Link to={control.linkTo} className={styles.manage_control} key={i}>{control.text}</Link>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;