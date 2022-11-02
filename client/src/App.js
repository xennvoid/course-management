import styles from './App.module.scss';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses/Courses';
import Box from './components/Box/Box';
import CourseCreate from './pages/CourseCreate/CourseCreate';
import { ToastContainer } from 'react-toastify';
import StudentAdd from './pages/StudentAdd/StudentAdd';
import StudentsList from './pages/StudentsList/StudentsList';
import StudentUpdate from './pages/StudentUpdate/StudentUpdate';
import CurrentCourse from './pages/CurrentCourse/CurrentCourse';
import Header from './components/Header/Header';
import CourseUpdate from './pages/CourseUpdate/CourseUpdate';

const App = () => {

  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.wrap}>
          <Header />
          <Box>
            <Routes>
              <Route index element={<Home />} />
              <Route path="create" element={<p>qwerty</p>} />
              <Route path="manage/courses" element={<Courses />} />
              <Route path="manage/students" element={<StudentsList />} />
              <Route path="add/course" element={<CourseCreate />} />
              <Route path="add/student" element={<StudentAdd />} />
              <Route path="update/student/:id" element={<StudentUpdate />} />
              <Route path="update/course/:id" element={<CourseUpdate />} />
              <Route path="course/:id" element={<CurrentCourse />} />
            </Routes>
          </Box>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
