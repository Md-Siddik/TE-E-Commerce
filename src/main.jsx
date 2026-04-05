import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Main from './Layout/Main';
import Home from './Home/Home';
import Shop from './Shop/Shop';
import PCBuilder from './PCBuilder/PCBuilder';
import Dashboard from './Dashboard/Dashboard';
import ProductDetails from './components/ProductDetails';
import Login from './Authentication/Login';
import AuthProvider from './Authentication/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [

      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/login",
        element: <Login></Login>,
        
      },

      {
        path: "/shop",
        element: <Shop></Shop>,
        loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
        // loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/pcBuilder",
        element: <PCBuilder></PCBuilder>,
      },

      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },

      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        loader: () => fetch("http://localhost:5000/products")
      },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)