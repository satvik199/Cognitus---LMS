import React from 'react';
import { dummyTestimonial, assets } from '../../assets/assets';

const TestimonialSection = () => {
  return (
    <div className="pb-16 px-4 md:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Testimonials</h2>
      <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
        Here's what learners are saying about our courses. We take pride in the feedback we receive.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {dummyTestimonial.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-72 h-72 p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 mb-3"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>

            <p className="text-gray-600 text-sm italic mt-4">"{item.comment || 'This course was amazing and exceeded my expectations!'}"</p>
            <a href="#" className='text-blue-500 underline px-5 text-sm  mt-4'>Read More</a>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(item.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5 mx-0.5"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
