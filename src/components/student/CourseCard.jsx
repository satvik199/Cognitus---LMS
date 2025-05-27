import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets';


const CourseCard = ({course}) => {

const {currency, calculateRating} = useContext(AppContext)

  return (
    <Link
  to={`/course/${course._id}`}
  onClick={() => scrollTo(0, 0)}
  className="border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"

>
  <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full object-cover" />

  <div className="p-3 text-left">
    <h3 className="text-base font-semibold">{course.courseTitle}</h3>
    <p className="text-gray-500">
  {course.educator.name || "Unknown Educator"}
</p>




    <div className="flex items-center space-x-2 mt-1">
      <p>{calculateRating(course)}</p>
      <div className="flex">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}  
          alt="star" />
))}

      </div>
      <p className="text-gray-500">{course.courseRatings.length}</p>
    </div>

    <p className="text-base font-semibold text-gray-800 mt-2">
      {currency}
      {(course.coursePrice - (course.discount * course.coursePrice / 100)).toFixed(2)}
    </p>
  </div>
</Link>

  )
}

export default CourseCard
