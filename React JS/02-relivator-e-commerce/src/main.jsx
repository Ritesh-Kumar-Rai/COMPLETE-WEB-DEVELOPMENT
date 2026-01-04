import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
const Home = lazy(() => import('./pages/Home'));
const BrowseProducts = lazy(() => import('./pages/BrowseProducts'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      index: true,
      element: <Home />
    },
    {
      path: '/browse-products',
      element: <BrowseProducts />,
      // loader: () => new Promise((resolve) => setTimeout(() => resolve(true), 15000))
    },
    {
      path: '/browse-products/:id',
      element: <ProductDetails />
    },
    {
      path: "auth",
      children: [
        {
          // This handles the exact path "/auth" or "/auth/"
          index: true,
          element: <Navigate to='sign-in' replace />
        },
        {
          path: 'sign-in',
          element: <SignIn />
        },
        {
          path: 'sign-up',
          element: <SignUp />
        }
      ]
    },
    {
      path: '*',
      element: <ErrorPage />
    }]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
