// Node modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Project files
import Modal from "components/Modal";
import Admin from "pages/Admin";
import AdminMedia from "pages/AdminMedia";
import AdminTVSeries from "pages/AdminDetailsOther";
import Media from "pages/Media";
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
            <Route path="/media/:code" element={<Media />} />
            <Route path="/video/:code" element={<VideoPlayer />} />
            <Route path="/admin-media/:code" element={<AdminMedia />} />
            <Route path="/admin-tv-series/:code" element={<AdminTVSeries />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          {/* To handle the modal/popups of the website */}
          <Modal />
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}
