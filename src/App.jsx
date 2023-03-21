import './App.css'
import { useEffect } from 'react';
import { useStates } from './utilities/states';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./header/NavBar";

function App() {
  const s = useStates('main', {
    movies: []
  });
  useEffect(() => {
    (async () => {
      s.movies = await (await fetch('/api/movies')).json();
    })();
  }, []);

  return s.movies.length === 0 ? null : <>
    <header>
      <Navbar />
    </header>
    <>
      <Routes>
        <Route path="/" element={<MovieList />}></Route>
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
      </Routes>
    </>
  </>;
}


export default App
