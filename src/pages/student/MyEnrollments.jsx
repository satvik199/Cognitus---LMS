import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateDuration, navigate } = useContext(AppContext);
  
  // Mock progress data - in a real app, this would come from your backend
  const progressArray = enrolledCourses.map((_, index) => ({
    lectureCompleted: [2, 1, 3, 7, 2, 5, 5, 2, 3, 7, 3, 8][index] || 0,
    totalLecture: [4, 8, 9, 9, 4, 5, 6, 7, 4, 9, 4, 9][index] || 1
  }));

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">My Enrollments</h1>
          </div>
          
          {/* Responsive table container */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrolledCourses.map((course, index) => {
                  const progress = progressArray[index];
                  const percent = (progress.lectureCompleted * 100) / progress.totalLecture;
                  const isCompleted = percent === 100;
                  
                  return (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => navigate('/player/' + course._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-36 rounded-lg overflow-hidden">
                            <img 
                              className="h-full w-full object-cover" 
                              src={course.courseThumbnail} 
                              alt={course.courseTitle} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {course.courseTitle}
                            </div>
                            <div className="text-sm text-gray-500 sm:hidden">
                              {calculateDuration(course)}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {calculateDuration(course)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 sm:w-32 mr-3">
                            <Line 
                              percent={percent} 
                              strokeWidth={3} 
                              strokeColor={isCompleted ? "#10B981" : "#3B82F6"} 
                              trailColor="#E5E7EB" 
                              strokeLinecap="round"
                            />
                          </div>
                          <div className="text-sm text-gray-500">
                            {progress.lectureCompleted}/{progress.totalLecture}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isCompleted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {enrolledCourses.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-500">You haven't enrolled in any courses yet.</div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;