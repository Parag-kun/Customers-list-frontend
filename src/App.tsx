import { createBrowserRouter, RouterProvider as Router } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Cities from "./pages/Cities";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cities',
    element: <Cities />,
  },
  {
    path: '/customers/:id',
    element: <Customer />
  }
])

function App() {

  return (
    <>
      <Router router={router} />
    </>
  )
}

export default App
