import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Generation from './components/Generation';
import Home from './components/Home';
import Landing from './components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="/generate" element={<Generation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
