import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import BrowseProducts from './pages/BrowseProducts'
import ProductDetails from './pages/ProductDetails'
import SignIn from './pages/SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/',
      element: <Home />
    },
    {
      path: '/browse-products',
      element: <BrowseProducts />
    },
    {
      path: '/browse-products/:id',
      element: <ProductDetails />
    },
    {
      path: "auth",
      children: [{
        path: 'sign-in',
        element: <SignIn />
      }]
    }]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
