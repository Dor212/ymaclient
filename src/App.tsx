import { HelmetProvider } from "react-helmet-async";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import LegalPage from "./Pages/LegalPage/LegalPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CookieBanner from "./components/Cookies/CookieBanner";
import SocialFloatingBar from "./components/ui/SocialFloatingBar";
import "./App.css";
import AboutSitePage from "./Pages/AboutSitePage/AboutSitePage";
import AdminLoginPage from "./Pages/AdminPage/AdminLoginPage";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

function App() {
  return (
    <HelmetProvider>
      <div className="relative min-h-screen text-white">
        <div className="fixed inset-0 -z-10 bg-[url('/background4.png')] bg-center bg-cover bg-fixed" />

        <a
          href="#main"
          className="rounded sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:bg-black/70 focus:text-white focus:px-3 focus:py-2"
        />

        <Header />
        <SocialFloatingBar />

        <main id="main" className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/about-site/:id" element={<AboutSitePage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <AdminPage />
                </AdminProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <CookieBanner />
      </div>
    </HelmetProvider>
  );
}

export default App;
