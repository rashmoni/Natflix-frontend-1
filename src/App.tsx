// Node modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Project files
import Modal from "components/Modal";
import Admin from "pages/Admin";
import AdminContent from "pages/AdminContent";
import AdminDetailsOther from "pages/AdminDetailsOther";
import AdminDetailsSeries from "pages/AdminDetailsSeries";
import Content from "pages/Content";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import VideoPlayer from "pages/VideoPlayer";
import { ModalProvider } from "state/ModalContext";
import "styles/style.css";

export default function App() {
  return (
    <div className="App">
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/content/:code" element={<Content />} />
            <Route path="/video/:code" element={<VideoPlayer />} />
            <Route path="/admin-content/:code" element={<AdminContent />} />
            <Route
              path="/admin-details-other/:code"
              element={<AdminDetailsOther />}
            />
            <Route
              path="/admin-details-series/:code"
              element={<AdminDetailsSeries />}
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          {/* To handle the modal/popups of the website */}
          <Modal />
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}
