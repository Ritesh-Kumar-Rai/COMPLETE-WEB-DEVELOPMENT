import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className='py-8'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
