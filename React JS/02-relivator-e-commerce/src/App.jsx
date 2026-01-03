import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {

  const path = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className={`${path.pathname !== "/auth/sign-in" ? 'py-8' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
