import { Outlet, useLocation, useNavigation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Suspense } from 'react'
import LoadingPage from './components/LoadingPage'

function App() {

  const navigation = useNavigation();
  const path = useLocation();

  // The state can be "idle", "loading", or "submitting"
  const isLoading = navigation.state === "loading";

  const isAuth = path?.pathname === "/auth/sign-in" || path?.pathname === "/auth/sign-up";

  return (
    <>
      {isLoading && (<div className="fixed inset-0 z-[999] bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>)}
      <ScrollToTop />
      <Navbar />
      <main className={`${!isAuth ? 'py-8' : ''}`}>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
