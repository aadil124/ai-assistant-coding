import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

// Contexts
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

// Guards
import {
  GuestRoute,
  ProtectedRoute,
  PatientRoute,
  DoctorRoute,
  AdminRoute,
} from "./components/global/RouteGuards.jsx";

// Global Fallbacks
import ErrorBoundary from "./components/global/ErrorBoundary.jsx";
import SessionExpiredModal from "./components/global/SessionExpiredModal.jsx";

// Pages - Public
import LandingPage from "./pages/public/LandingPage.jsx";
import AboutUs from "./pages/public/AboutUs.jsx";
import FAQ from "./pages/public/FAQ.jsx";
import ContactUs from "./pages/public/ContactUs.jsx";
import NotFound from "./pages/public/NotFound.jsx";

// Pages - Auth & Fallbacks
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import AdminLogin from "./pages/auth/AdminLogin.jsx";
import Unauthorized from "./pages/auth/Unauthorized.jsx";
import Forbidden from "./pages/auth/Forbidden.jsx";

// Pages - Patient Module
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import DoctorListing from "./pages/patient/DoctorListing.jsx";
import DoctorProfile from "./pages/patient/DoctorProfile.jsx";
import SelectSlot from "./pages/patient/SelectSlot.jsx";
import BookingSummary from "./pages/patient/BookingSummary.jsx";
import BookingSuccess from "./pages/patient/BookingSuccess.jsx";
import WaitingRoom from "./pages/patient/WaitingRoom.jsx";
import ConsultationCompleted from "./pages/patient/ConsultationCompleted.jsx";
import MyAppointments from "./pages/patient/MyAppointments.jsx";
import AppointmentDetails from "./pages/patient/AppointmentDetails.jsx";
import MyPrescriptions from "./pages/patient/MyPrescriptions.jsx";
import MedicalRecordViewer from "./pages/patient/MedicalRecordViewer.jsx";
import MedicalRecordsList from "./pages/patient/MedicalRecordsList.jsx";
import WriteReview from "./pages/patient/WriteReview.jsx";
import Notifications from "./pages/patient/Notifications.jsx";
import MyProfile from "./pages/patient/MyProfile.jsx";
import PatientSettings from "./pages/patient/PatientSettings.jsx";

// Pages - Doctor Module
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorProfileSettings from "./pages/doctor/DoctorProfileSettings.jsx";
import DoctorAvailability from "./pages/doctor/DoctorAvailability.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorConsultation from "./pages/doctor/DoctorConsultation.jsx";
import DoctorPrescriptionGen from "./pages/doctor/DoctorPrescriptionGen.jsx";
import DoctorRecordUpload from "./pages/doctor/DoctorRecordUpload.jsx";
import DoctorReviews from "./pages/doctor/DoctorReviews.jsx";
import DoctorEarnings from "./pages/doctor/DoctorEarnings.jsx";
import DoctorSettings from "./pages/doctor/DoctorSettings.jsx";

// Pages - Admin Module
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import DoctorVerification from "./pages/admin/DoctorVerification.jsx";
import AdminAppointments from "./pages/admin/AdminAppointments.jsx";
import AdminReviews from "./pages/admin/AdminReviews.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminRefunds from "./pages/admin/AdminRefunds.jsx";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs.jsx";
// import AdminSettings from './pages/admin/AdminSettings.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <LoadingProvider>
                <div className="d-flex flex-column min-vh-100">
                  {/* Global Header Navigation */}
                  <Navbar />

                  {/* Main Route Outlet Container */}
                  <main className="flex-grow-1">
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<ContactUs />} />

                      {/* Guest only routes (Redirects if already authenticated) */}
                      <Route
                        path="/login"
                        element={
                          <GuestRoute>
                            <Login />
                          </GuestRoute>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <GuestRoute>
                            <Register />
                          </GuestRoute>
                        }
                      />
                      <Route
                        path="/forgot-password"
                        element={
                          <GuestRoute>
                            <ForgotPassword />
                          </GuestRoute>
                        }
                      />
                      <Route
                        path="/reset-password"
                        element={
                          <GuestRoute>
                            <ResetPassword />
                          </GuestRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <GuestRoute>
                            <AdminLogin />
                          </GuestRoute>
                        }
                      />
                      <Route
                        path="/admin/login"
                        element={
                          <GuestRoute>
                            <AdminLogin />
                          </GuestRoute>
                        }
                      />

                      {/* Access failure fallbacks */}
                      <Route path="/unauthorized" element={<Unauthorized />} />
                      <Route path="/forbidden" element={<Forbidden />} />

                      {/* Patient Portal Routes (Requires Role patient) */}
                      <Route
                        path="/patient/dashboard"
                        element={
                          <PatientRoute>
                            <PatientDashboard />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/doctors"
                        element={
                          <PatientRoute>
                            <DoctorListing />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/doctor/:id"
                        element={
                          <PatientRoute>
                            <DoctorProfile />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/booking/select-slot/:id"
                        element={
                          <PatientRoute>
                            <SelectSlot />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/booking/summary/:id"
                        element={
                          <PatientRoute>
                            <BookingSummary />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/booking/success"
                        element={
                          <PatientRoute>
                            <BookingSuccess />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/consultation/waiting-room/:id"
                        element={
                          <PatientRoute>
                            <WaitingRoom />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/consultation/completed/:id"
                        element={
                          <PatientRoute>
                            <ConsultationCompleted />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/appointments"
                        element={
                          <PatientRoute>
                            <MyAppointments />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/appointments/:id"
                        element={
                          <PatientRoute>
                            <AppointmentDetails />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/records/prescriptions"
                        element={
                          <PatientRoute>
                            <MyPrescriptions />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/records/view/:id"
                        element={
                          <PatientRoute>
                            <MedicalRecordViewer />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/medical-records"
                        element={
                          <PatientRoute>
                            <MedicalRecordsList />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/doctor/review/:id"
                        element={
                          <PatientRoute>
                            <WriteReview />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/notifications"
                        element={
                          <PatientRoute>
                            <Notifications />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/profile"
                        element={
                          <PatientRoute>
                            <MyProfile />
                          </PatientRoute>
                        }
                      />
                      <Route
                        path="/patient/settings"
                        element={
                          <PatientRoute>
                            <PatientSettings />
                          </PatientRoute>
                        }
                      />

                      {/* Doctor Portal Routes (Requires Role doctor) */}
                      <Route
                        path="/doctor/dashboard"
                        element={
                          <DoctorRoute>
                            <DoctorDashboard />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/profile"
                        element={
                          <DoctorRoute>
                            <DoctorProfileSettings />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/availability"
                        element={
                          <DoctorRoute>
                            <DoctorAvailability />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/appointments"
                        element={
                          <DoctorRoute>
                            <DoctorAppointments />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/consultation/:appointmentId"
                        element={
                          <DoctorRoute>
                            <DoctorConsultation />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/prescriptions/new"
                        element={
                          <DoctorRoute>
                            <DoctorPrescriptionGen />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/records/upload"
                        element={
                          <DoctorRoute>
                            <DoctorRecordUpload />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/reviews"
                        element={
                          <DoctorRoute>
                            <DoctorReviews />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/earnings"
                        element={
                          <DoctorRoute>
                            <DoctorEarnings />
                          </DoctorRoute>
                        }
                      />
                      <Route
                        path="/doctor/settings"
                        element={
                          <DoctorRoute>
                            <DoctorSettings />
                          </DoctorRoute>
                        }
                      />

                      {/* Admin Portal Routes (Requires Role admin) */}
                      <Route
                        path="/admin/dashboard"
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/doctors/pending"
                        element={
                          <AdminRoute>
                            <DoctorVerification />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/appointments"
                        element={
                          <AdminRoute>
                            <AdminAppointments />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/reviews"
                        element={
                          <AdminRoute>
                            <AdminReviews />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/users"
                        element={
                          <AdminRoute>
                            <AdminUsers />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/refunds"
                        element={
                          <AdminRoute>
                            <AdminRefunds />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/audit-logs"
                        element={
                          <AdminRoute>
                            <AdminAuditLogs />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/settings"
                        element={
                          <AdminRoute>
                            <AdminSettings />
                          </AdminRoute>
                        }
                      />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>

                  {/* Global Footer Layout */}
                  <Footer />

                  {/* Global Session Expiry popup */}
                  <SessionExpiredModal />
                </div>
              </LoadingProvider>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
