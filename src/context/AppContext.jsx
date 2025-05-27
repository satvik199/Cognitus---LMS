import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);

  // Fetch all courses
  const fetchAllCourses = async () => {
    // In a real app, fetch from backend
    setAllCourses(dummyCourses);
  };

  // Fetch user's enrolled courses
  const fetchUserEnrolledCourses = async () => {
    // In a real app, fetch from backend
    setEnrolledCourses(dummyCourses);
  };

  // Calculate rating for a course
  const calculateRating = (course) => {
    // Check if course and ratings exist
    if (!course || !course.courseRatings || !Array.isArray(course.courseRatings)) {
      return 0;
    }
    
    // If no ratings, return 0
    if (course.courseRatings.length === 0) {
      return 0;
    }
    
    // Calculate average rating
    const totalRating = course.courseRatings.reduce((sum, rating) => {
      // Handle potentially malformed rating objects
      const ratingValue = parseFloat(rating.rating || 0);
      return sum + (isNaN(ratingValue) ? 0 : ratingValue);
    }, 0);
    
    const averageRating = totalRating / course.courseRatings.length;
    
    // Return with one decimal place precision
    return parseFloat(averageRating.toFixed(1));
  };

  // Calculate duration of a chapter
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Calculate total course duration
  const calculateDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Calculate total lectures in course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
    // In a real app, you would check the user's role here
    // For now, we'll set it to true for demonstration
    setIsEducator(true); // Or false, depending on your needs
  }, []);

  const value = {
    currency,
    navigate,
    allCourses,
    enrolledCourses,
    isEducator,
    fetchUserEnrolledCourses,
    calculateChapterTime,
    calculateDuration,
    calculateNoOfLectures,
    calculateRating, // Added the new function to context
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};