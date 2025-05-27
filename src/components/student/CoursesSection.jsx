import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";




const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  console.log("Rendered CoursesSection: ", allCourses);

  return (
    <div className="py-16 md:px-30 px-8">
      <h2 className="text-3xl font-semibold text-gray-800">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3 ">
        Dive into expert-led courses designed to elevate your skills and empower your learning journey.
      </p>

      

 <div className="grid grid-cols-auto px-4 md:px-0 gap-6 md:my-14 my-10">
      {Array.isArray(allCourses) && allCourses.length > 0 ? (
  allCourses.slice(0, 4).map((course, index) => (
    <CourseCard key={index} course={course} />
  ))
) : (
  <p>No courses available</p>
)}

      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-block text-gray-700 border border-gray-300 hover:border-gray-500 px-8 py-3 rounded-lg transition duration-300"
      >
        Show all Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
