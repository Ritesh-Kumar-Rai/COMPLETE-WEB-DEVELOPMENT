import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <main className='py-8'>
        <Outlet />
      </main>
      <footer>lldsdsd</footer>
    </>
  )
}

export default App
