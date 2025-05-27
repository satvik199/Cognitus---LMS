import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Course', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Students Enrolled', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator ? (
    <div className="w-16 sm:w-20 md:w-48 min-h-screen bg-white border-r shadow-md p-2 sm:p-4 flex flex-col">
      <ul className="space-y-2 md:space-y-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center md:items-start gap-2 p-2 rounded-lg transition duration-300 group ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="hidden md:block text-sm truncate group-hover:underline">{item.name}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Sidebar;
