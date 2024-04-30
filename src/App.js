import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NoteState from "./context/notes/NoteState";
import Layout from './Layout.js';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { Home } from './components/Home.js';
import About from './components/About.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Userprofile from './components/Userprofile.js';

// Create a browser router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'userprofile', element: <Userprofile /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ]
  }
]);

function App() {

  return (
    <NoteState>
      <router.RouterProvider>
        <Layout>
          <Navbar />
          <Alert  />
          <router.Outlet />
        </Layout>
      </router.RouterProvider>
    </NoteState>
  );
}

export default App;
