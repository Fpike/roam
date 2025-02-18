import { LoginPage } from './pages/Login/LoginPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Homepage } from './pages/Homepage/Homepage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { BuildProfilePage } from './pages/BuildProfilePage/BuildProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NewBlogPage } from './pages/NewBlog/NewBlogPage'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// react routes:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },

  {
    path: "/login",
    element: <LoginPage />
  },

  {
    path: "/signup",
    element: <SignUpPage />
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },

  {
    path: "/build-profile",
    element: <ProtectedRoute><BuildProfilePage /></ProtectedRoute>
  },

  {
    path: "/new-blog",
    element: <ProtectedRoute><NewBlogPage /></ProtectedRoute>
  }
  
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App