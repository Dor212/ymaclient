import { HelmetProvider } from "react-helmet-async";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { AuthProvider } from "./auth/AuthProvider";
import ProjectBriefPage from "./Pages/ProjectBriefPage/ProjectBriefPage";
import GraphicsLabPage from "./Pages/GraphicsLabPage/GraphicsLabPage";

function AppLayout() {
  const location = useLocation();
  const isBriefPage = location.pathname === "/project-brief";
  const isGraphicsLabPage = location.pathname === "/graphics-lab";
  const isImmersivePage = isBriefPage || isGraphicsLabPage;

  return (
    <div className="relative min-h-[100svh] text-white">
      <div className="fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat bg-[url('/BgYMAm.png')] md:bg-[url('/BgYMA.png')] bg-scroll md:bg-fixed" />
      <div className="fixed inset-0 -z-10 bg-black/35" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:rounded focus:bg-black/80 focus:text-white focus:px-3 focus:py-2"
      >
        דלג לתוכן
      </a>

      {!isImmersivePage ? <Header /> : null}
      {!isImmersivePage ? <SocialFloatingBar /> : null}

      <main id="main" className={isImmersivePage ? "" : "pt-20"}>
        <CookieBanner />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/about-site/:id" element={<AboutSitePage />} />
          <Route path="/project-brief" element={<ProjectBriefPage />} />
          <Route path="/graphics-lab" element={<GraphicsLabPage />} />
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

      {!isImmersivePage ? <Footer /> : null}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <AppLayout />
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
