import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EnquiryDialogProvider } from "@/components/EnquiryDialogContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Home from "@/pages/Home";
import Rooms from "@/pages/Rooms";
import RoomDetail from "@/pages/RoomDetail";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/Login";
import AdminOverview from "@/pages/admin/Overview";
import AdminEnquiries from "@/pages/admin/Enquiries";
import AdminRooms from "@/pages/admin/Rooms";
import AdminGallery from "@/pages/admin/Gallery";
import AdminSettings from "@/pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <EnquiryDialogProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="enquiries/:id" element={<AdminEnquiries />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </EnquiryDialogProvider>
    </BrowserRouter>
  );
}
