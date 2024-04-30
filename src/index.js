import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.js'
import { Home } from './components/Home.js'
import About from './components/About.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Alert from './components/Alert.js'
import Userprofile from './components/Userprofile.js'
// import App from './App.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "userProfile",
        element: <Userprofile/>
      },
      {
        path: "alert",
        element: <Alert />
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "Signup",
        element: <Signup />
        
      }
      
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

