import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [activeTab, setActiveTab] = useState("curriculum");

  useEffect(() => {
    const matchedCourse = enrolledCourses.find(
      (course) => course._id === courseId
    );
    if (matchedCourse) {
      setCourseData(matchedCourse);
    }
  }, [enrolledCourses, courseId]);

  const handlePreviewClick = ({
    lectureUrl,
    chapterIndex,
    lectureIndex,
    lectureTitle,
  }) => {
    const videoId = lectureUrl.split("/").pop();
    setPlayerData({
      videoId,
      chapter: chapterIndex + 1,
      lecture: lectureIndex + 1,
      lectureTitle,
    });
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-4 sm:p-8">
        {/* Left column */}
        <div className="md:col-span-3 text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Course Structure</h2>
          <div className="bg-white rounded-2xl shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`w-full sm:w-auto py-3 px-6 text-sm font-medium transition border-b-2 ${
                    activeTab === "curriculum"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setActiveTab("description")}
                  className={`w-full sm:w-auto py-3 px-6 text-sm font-medium transition border-b-2 ${
                    activeTab === "description"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Description
                </button>
              </nav>
            </div>
            <div className="p-6">
              {activeTab === "curriculum" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                  <div className="space-y-4">
                    {courseData &&
                      courseData.courseContent.map((chapter, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <div
                            className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer hover:bg-gray-200"
                            onClick={() => toggleSection(index)}
                          >
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold">
                                {chapter.chapterTitle}
                              </h3>
                              <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-500 border border-gray-200">
                                {chapter.chapterContent.length} lectures •{" "}
                                {calculateChapterTime(chapter)}
                              </span>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transition-transform ${
                                openSection[index] ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              openSection[index] ? "max-h-screen" : "max-h-0"
                            }`}
                          >
                            <div className="p-4 border-t border-gray-200 space-y-3">
                              {chapter.chapterContent.map((lecture, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50"
                                >
                                  <div className="mt-1 text-blue-500">
                                    {lecture.lectureUrl ? (
                                      <button
                                        onClick={() =>
                                          handlePreviewClick({
                                            lectureUrl: lecture.lectureUrl,
                                            chapterIndex: index,
                                            lectureIndex: idx,
                                            lectureTitle: lecture.lectureTitle,
                                          })
                                        }
                                      >
                                        <svg
                                          className="w-5 h-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                      </button>
                                    ) : (
                                      <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 15l8-8m0 0l-8-8m8 8H4"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <h4 className="text-sm font-medium text-gray-800">
                                        {lecture.lectureTitle}
                                      </h4>
                                      <span className="text-xs text-gray-500">
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          {
                                            units: ["h", "m"],
                                          }
                                        )}
                                      </span>
                                    </div>
                                    {lecture.isPreviewFree && (
                                      <span
                                        onClick={() =>
                                          handlePreviewClick({
                                            lectureUrl: lecture.lectureUrl,
                                            chapterIndex: index,
                                            lectureIndex: idx,
                                            lectureTitle: lecture.lectureTitle,
                                          })
                                        }
                                        className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer"
                                      >
                                        Watch
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

              {activeTab === "description" && courseData && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    About This Course
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: courseData.courseDescription,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 py-3 mt-10">
  <h1 className="text-2xl font-bold">Rate this Course : </h1>
  <Rating initialRating={0} />
</div>

        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6 py-4">
          {playerData ? (
            <div className="space-y-9">
              <YouTube
                videoId={playerData.videoId}
                iframeClassName="w-full aspect-video rounded-xl shadow-lg"
              />
              <div className="p-4 bg-white rounded-xl shadow flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700 flex items-center">
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                  Mark Complete
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl shadow">
              <img
                src={courseData ? courseData.courseThumbnail : ""}
                alt=""
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
