import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import AnimeListInput from './components/AnimeListInput';
import UserAnimeList from './components/UserAnimeList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route
            index
            element={
              <>
                <AnimeListInput />
                <UserAnimeList />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
