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
import Vendors from './Vendors/Vendors';
import Sell from './Sell/Sell';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [

      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/login",
        element: <Login />,
        
      },

      {
        path: "/shop",
        element: <Shop />,
        loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/product/:id",
        element: <ProductDetails />,
        // loader: () => fetch("http://localhost:5000/products")
      },

      {
        path: "/pcBuilder",
        element: <PCBuilder />,
      },

      {
        path: "/Vendors",
        element: <Vendors />,
      },

      {
        path: "/sell",
        element: <Sell />,
      },

      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
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