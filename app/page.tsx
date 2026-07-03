import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Home from '@/components/Home'
import About from '@/components/About'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import React from 'react'
import Skills from '@/components/Skills'
import Blog from '@/components/Blog'

const page = () => {
  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </div>
  )
}

export default page
