import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import CourseCard from '../../components/student/CourseCard';
import Footer from '../../components/student/Footer';


const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const navigate = useNavigate();
  const { category } = useParams();

  const [input, setInput] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      if (input) {
        const filtered = tempCourses.filter(item =>
          item.courseTitle.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses(tempCourses);
      }

      // Trigger animation
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [allCourses, input]);

  return (
    <>
    <div className="relative md:px-36 px-8 pt-20 text-left pb-24">
      {/* Header and search */}
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500 text-sm mt-1">
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Home
            </span>{' '}
            / <span>Course List</span>
          </p>
        </div>
        <SearchBar data={input} setData={setInput} />
      </div>

      {/* Courses */}
      <div
        className={`grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10 transition-all duration-300 ease-in-out ${
          animate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No courses found.</p>
        )}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default CoursesList;
