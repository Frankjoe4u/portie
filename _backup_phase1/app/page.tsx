import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Home from '@/components/Home'
import About from '@/components/About'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Blog from '@/components/Blog'

const page = () => {
  return (
    <div className="bg-bg">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Services />
      <Process />
      <Blog />
      <Contact />
      <Footer />
    </div>
  )
}

export default page
