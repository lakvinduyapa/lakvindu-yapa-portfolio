import Loader from './components/layout/Loader'
import Navigation from './components/layout/Navigation'
import CustomCursor from './components/ui/CustomCursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Story from './components/sections/Story'
import FeaturedProjects from './components/sections/FeaturedProjects'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Story />
        <FeaturedProjects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
