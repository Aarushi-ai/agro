import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import FarmAdvisory from "./pages/FarmAdvisory";
import OmniChannels from "./pages/OmniChannels";
import MarketLinkages from "./pages/MarketLinkages";
import AgroWidget from "./components/AgroWidget";
import LoaderScreen from "./components/LoaderScreen";

export default function App() {
  return (
    <>
      <LoaderScreen />
      <BrowserRouter>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/farm-advisory" element={<FarmAdvisory />} />
        <Route path="/omni-channels" element={<OmniChannels />} />
        <Route path="/market-linkages" element={<MarketLinkages />} />
      </Routes>
      <AgroWidget />
    </BrowserRouter>
    </>
  );
}
