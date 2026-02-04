import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingScreen from '../components/ui/LoadingScreen'
import AdminLogin from '../components/AdminLogin';
import Signin from '../components/SignIn';

// Lazy load all components for better code splitting
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Portfolio = React.lazy(() => import('../pages/Portfolio'));
const ScrollStackDemo = React.lazy(() => import('../pages/ScrollStackDemo'));
const Services = React.lazy(() => import('../pages/Services'));
const Login = React.lazy(() => import('../pages/Login'));
const Signup = React.lazy(() => import('../components/Signup'));
const AuthPage = React.lazy(() => import('../pages/AuthPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const Admin = React.lazy(() => import('../pages/Admin'));



const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
            <Route path="/scroll-stack-demo" element={<ScrollStackDemo/>}/>
            <Route path="/stack-demo" element={<ScrollStackDemo/>}/> {/* Alternative route */}
            <Route path="/services" element={<Services/>}/>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/register" element={<AuthPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/admin" element={<Admin/>}/>

            {/* Catch-all route for 404 - must be last */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainRoutes
