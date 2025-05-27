import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "./Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [activeTab, setActiveTab] = useState("curriculum");

const calculateRatings = (course) => {
  if (!course?.courseRatings?.length) return 0;
  const sum = course.courseRatings.reduce((total, rating) => total + rating.rating, 0);
  return sum / course.courseRatings.length;
};

// Use it in your component
<p>{calculateRatings(courseData).toFixed(1)}</p>

  const {
    allCourses,
    calculateNoOfLectures,
    calculateDuration,
    calculateChapterTime,
    calculateCourseDuration,
    currency,
  } = useContext(AppContext);
  const ratingCount = courseData?.courseRatings?.length || 0;

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;

    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePreviewClick = (lectureUrl) => {
    const videoId = lectureUrl.split('/').pop();
    setPlayerData({ videoId });
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    },
  };

  return courseData ? (
    <div className="bg-gray-50 min-h-screen">
    {/* Hero Section */}
<div className="relative bg-gradient-to-r from-blue-300 to-gray-700 py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
      {/* Left Content */}
      <div className="md:w-2/3">
        {/* Category and Rating */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {courseData?.category && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {courseData.category}
            </span>
          )}
          <div className="flex items-center text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(calculateRatings(courseData)) ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-white">
              ({ratingCount || 0} {ratingCount === 1 ? 'rating' : 'ratings'})
            </span>
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {courseData?.courseTitle || 'Course Title'}
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6 max-w-3xl line-clamp-3">
          {courseData?.courseDescription?.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 600) || 'Course description'}
          {courseData?.courseDescription?.length > 600 && '...'}
        </p>

        {/* Course Stats */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {calculateCourseDuration || 'N/A'}
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {calculateNoOfLectures(courseData) || 0} lectures
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {courseData?.enrolledStudents?.length || 0} students
          </div>
        </div>
      </div>

      {/* Right Content - Course Card */}
      <div className="md:w-1/3 w-full sticky top-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-gray-800">
          {playerData ? (
            <div className="relative">
              <YouTube 
                videoId={playerData.videoId} 
                opts={{
                  ...opts,
                  playerVars: {
                    ...opts.playerVars,
                    modestbranding: 1,
                    rel: 0
                  }
                }}
                title="Course preview"
                className="aspect-video w-full"
              />
              <button 
                onClick={() => setPlayerData(null)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                aria-label="Close video"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative group aspect-video">
              <img
                src={courseData?.courseThumbnail || 'https://via.placeholder.com/800x450'}
                alt="Course Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x450';
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button 
                  onClick={() => handlePreviewClick(courseData?.courseContent?.[0]?.chapterContent?.[0]?.lectureUrl || '')}
                  className="bg-white/60 text-blue-900 px-4 py-2 rounded-full font-medium flex items-center hover:bg-white transition"
                  disabled={!courseData?.courseContent?.[0]?.chapterContent?.[0]?.lectureUrl}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  {courseData?.courseContent?.[0]?.chapterContent?.[0]?.lectureUrl ? 'Watch Preview' : 'No Preview'}
                </button>
              </div>
            </div>
          )}

          {/* Course Pricing and Enrollment */}
          <div className="p-6">
            {/* Price Section */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  {currency}
                  {(
                    (courseData?.coursePrice || 0) -
                    ((courseData?.discount || 0) * (courseData?.coursePrice || 0)) / 100
                  ).toFixed(2)}
                </span>
                {courseData?.discount > 0 && (
                  <span className="ml-3 text-gray-500 line-through">
                    {currency}
                    {courseData.coursePrice}
                  </span>
                )}
              </div>
              {courseData?.discount > 0 && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {courseData.discount}% OFF
                </span>
              )}
            </div>

            {/* Enrollment Button */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 days left at this price!</span>
              </div>
              <button
                className={`w-full py-3 rounded-lg font-bold text-white transition ${isAlreadyEnrolled ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => setIsAlreadyEnrolled(!isAlreadyEnrolled)}
              >
                {isAlreadyEnrolled ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Already Enrolled
                  </span>
                ) : (
                  'Enroll Now'
                )}
              </button>
            </div>

            {/* Course Includes */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">This course includes:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {calculateNoOfLectures(courseData) || 0} on-demand videos
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full lifetime access
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'curriculum' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Description
                  </button>
                  
                </nav>
              </div>
              <div className="p-6">
                {activeTab === 'curriculum' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                    <div className="space-y-4">
                      {courseData.courseContent.map((chapter, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div
                            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => toggleSection(index)}
                          >
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {chapter.chapterTitle}
                              </h3>
                              <span className="ml-3 text-sm text-gray-500 bg-white px-2 py-1 rounded">
                                {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                              </span>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-screen' : 'max-h-0'}`}
                          >
                            <div className="p-4 border-t border-gray-200">
                              {chapter.chapterContent.map((lecture, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start py-3 hover:bg-gray-50 px-2 rounded-lg transition"
                                >
                                  <div className="flex-shrink-0 mt-1">
                                    {lecture.isPreviewFree ? (
                                      <button 
                                        onClick={() => handlePreviewClick(lecture.lectureUrl)}
                                        className="text-blue-500 hover:text-blue-700"
                                      >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                      </button>
                                    ) : (
                                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l8-8m0 0l-8-8m8 8H4" />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-sm font-medium text-gray-900">
                                        {lecture.lectureTitle}
                                      </h4>
                                      <span className="text-xs text-gray-500">
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          { units: ["h", "m"] }
                                        )}
                                      </span>
                                    </div>
                                    {lecture.isPreviewFree && (
                                      <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Course</h2>
                    <div
                      className="prose max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: courseData.courseDescription,
                      }}
                    />
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-6">
                        <div className="text-4xl font-bold mr-4">
                          {calculateRatings(courseData).toFixed(1)}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < Math.floor(calculateRatings(courseData)) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">
                            Based on {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
                          </p>
                        </div>
                      </div>
                      {courseData.courseRatings.length > 0 ? (
                        <div className="space-y-6">
                          {courseData.courseRatings.map((rating, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                              <div className="flex items-center mb-3">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                    {rating.userName.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    {rating.userName}
                                  </h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                    <span className="ml-2 text-xs text-gray-500">
                                      {new Date(rating.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700">
                                {rating.review}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No reviews yet
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Be the first to review this course.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={courseData.instructor?.avatar || assets.default_avatar}
                    alt="Instructor"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Satvik & Swastiks</h3>
                  <p className="text-sm text-gray-600 mb-3">Senior Developers & Educators</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">4.8 Instructor Rating</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium">12,345 Students</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm font-medium">8 Courses</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Satvik and Swastiks are experienced developers with over 10 years of combined experience in web development, specializing in React, Node.js, and modern JavaScript frameworks. They have taught thousands of students worldwide and are passionate about making complex concepts easy to understand.
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                    View full profile
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What you'll learn</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {courseData.learningOutcomes?.slice(0, 6).map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic understanding of JavaScript</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Familiarity with HTML & CSS</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>A computer with internet access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-center">Certificate of Completion</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <span className="text-sm font-medium text-center">Lifetime Access</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-center">Access on Mobile</span>
                  </div>
                                   <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm font-medium text-center">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How long do I have access to the course?",
                answer: "After enrolling, you have unlimited access to this course for as long as you like - across any and all devices you own."
              },
              {
                question: "What if I am unhappy with the course?",
                answer: "We would never want you to be unhappy! If you are unsatisfied with your purchase, contact us in the first 30 days and we will give you a full refund."
              },
              {
                question: "When does the course start and finish?",
                answer: "The course starts now and never ends! It is a completely self-paced online course - you decide when you start and when you finish."
              },
              {
                question: "Can I download the course videos?",
                answer: "Currently, we don't support video downloads but you can access all videos through our mobile app even when offline."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition ${openSection[`faq-${index}`] ? 'bg-gray-50' : ''}`}
                  onClick={() => toggleSection(`faq-${index}`)}
                >
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection[`faq-${index}`] ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSection[`faq-${index}`] ? 'max-h-screen' : 'max-h-0'}`}
                >
                  <div className="p-4 pt-0 text-gray-700">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses?.filter(course => course._id !== id).slice(0, 3).map(course => (
              <div key={course._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative group">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-white/90 text-blue-600 px-4 py-2 rounded-full font-medium flex items-center hover:bg-white transition">
                      View Course
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">{course.category}</span>
                    <span className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {calculateRatings(course).toFixed(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.courseTitle}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.courseDescription.slice(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">
                        {currency}
                        {(
                          course.coursePrice -
                          (course.discount * course.coursePrice) / 100
                        ).toFixed(2)}
                      </span>
                      {course.discount > 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {currency}
                          {course.coursePrice}
                        </span>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     

      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;