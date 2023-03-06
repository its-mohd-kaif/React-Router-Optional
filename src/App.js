import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
import Delete from "./components/Delete";
import Edit from "./components/AddEdit";
import Error from "./components/Error";
import LandingPage from "./components/LandingPage";
// Context Data
export const dataContext = createContext();

function App() {
  // Data that holds API data
  const [data, setData] = useState([]);
  // Clone State for helping in Searching Data
  const [clone, setClone] = useState([]);
  // Routing
  let router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error />,
      children: [
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/delete",
          element: <Delete />,
        },
        {
          path: "/addEdit",
          element: <Edit />,
        },
      ],
    },
  ]);
  return (
    <div>
      <dataContext.Provider value={{ data, setData, clone, setClone }}>
        <RouterProvider router={router} />
      </dataContext.Provider>
    </div>
  );
}

export default App;
