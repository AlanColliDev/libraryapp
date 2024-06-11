import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { LibrosList } from "./components/Libro/LibrosList";
import { LibroForm } from "./components/Libro/LibroForm";
import { PrestamoList } from "./components/Prestamo/PrestamoList";
import { PrestamoForm } from "./components/Prestamo/PrestamoForm";
import { Welcome } from "./components/Welcome";

const router = createBrowserRouter([
  
   ...["/","/login", "/Login"].map(route => ({
        path: route,
        element: <Login />
    })) 
  ,
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/",
        element: <Welcome />
      },
      {
        path: "/dashboard/libros",
        element: <LibrosList />,
      },
      {
        path: "/dashboard/libros/add",
        element: <LibroForm />,
      },
      {
        path: "/dashboard/prestamo",
        element: <PrestamoList />,
      },
      {
        path: "/dashboard/prestamo/add",
        element: <PrestamoForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
