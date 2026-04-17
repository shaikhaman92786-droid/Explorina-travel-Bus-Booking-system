import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Layouts/Navbar'
import Home from './Components/Home'
import SearchBus from './Components/SearchBus'
import RecentBooking from './Components/RecentBooking'
import Contact from './Components/Contact'
import About from './Components/About'
import Login from './Components/Login'
import TravelsLogin from './Components/TravelsLogin'
import Registration from './Components/Registration'
import ProtectedRoute from '../Route/ProtectedRoute'
import AdminRoute from '../Route/AdminRoute'
import Footer from './Layouts/Footer'
import BusPage from './Components/BusPage'
import AddBus from './Components/AddBus'
import UpdateBus from './Components/UpdateBus'
import AllBuses from './Components/AllBus'
import EditProfile from './Components/EditProfile'
import ForgotPassword from './Components/ForgotPassword'
import NotFound from "./Components/NotFound";


function App() {

  const isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/travelslogin" element={<TravelsLogin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* PROTECTED ROUTES */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/searchbus" element={
            <ProtectedRoute>
              <SearchBus />
            </ProtectedRoute>
          } />

          <Route path="/bus/:id" element={
            <ProtectedRoute>
              <BusPage />
            </ProtectedRoute>
          } />

          <Route path="/recentbooking" element={
            <ProtectedRoute>
              <RecentBooking />
            </ProtectedRoute>
          } />

          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />

          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />

          <Route path="/edit-profile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />

          {/* Only Admin can access */}

          <Route path='/addbus' element={

            <ProtectedRoute>
              <AdminRoute>
                <AddBus />
              </AdminRoute>
            </ProtectedRoute>
          } />

          <Route path='/allbus' element={

            <ProtectedRoute>
              <AdminRoute>
                <AllBuses />
              </AdminRoute>
            </ProtectedRoute>
          } />

          <Route path='/updatebus/:id' element={

            <ProtectedRoute>
              <AdminRoute>
                <UpdateBus />
              </AdminRoute>
            </ProtectedRoute>
          } />

          {/* NotFound Page */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App