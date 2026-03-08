import FAQ from "./components/FAQ"
import Features from "./components/Features"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import Navbar from "./components/Navbar"
import SocialProof from "./components/SocialProof"
import Testimonials from "./components/Testimonials"

const App = () => {
  return (
    <div className='w-full flex flex-col gap-20'>
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
