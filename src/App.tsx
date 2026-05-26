import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Overview from './pages/Overview';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="devices" element={<Devices />} />
          <Route path="devices/:id" element={<DeviceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
