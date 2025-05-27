import React from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'
import Companies from '../../components/student/companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialSection from '../../components/student/TestimonialSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'


const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      
     <Hero></Hero>
     <SearchBar></SearchBar>
     <Companies></Companies>
     <CoursesSection></CoursesSection>
     <TestimonialSection></TestimonialSection>
     <CallToAction></CallToAction>
      <Footer></Footer>
    </div>
  )
}

export default Home
