import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Courses Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 rounded-full">
            <img src={assets.appointments_icon} alt="Courses" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-800">
              {dashboardData.totalCourses}
            </p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-50 rounded-full">
            <img src={assets.earning_icon} alt="Earnings" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <p className="text-2xl font-semibold text-gray-800">
              {currency}{dashboardData.totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Enrollment Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-50 rounded-full">
            <img src={assets.patients_icon} alt="Enrollments" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Enrollment</p>
            <p className="text-2xl font-semibold text-gray-800">
              {dashboardData.enrolledStudentsData.length}
            </p>
          </div>
        </div>
      </div>

      {/* Latest Enrollment Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Latest Enrollment</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={item.student.imageUrl} 
                          alt={item.student.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.student.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.courseTitle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;