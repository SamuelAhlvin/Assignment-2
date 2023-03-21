import { useState, useEffect } from "react";
import { useStates } from './utilities/states';
import { Link } from 'react-router-dom';

export default function ScreeningsOverview() {
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  //const s = useStates('main');

  useEffect(() => {
    async function fetchScreenings() {
      const response = await fetch("/api/screenings_overview");
      const screeningData = await response.json();
      setScreenings(screeningData);
    }
    async function fetchMovies() {
      const movieRes = await fetch("/api/movies")
      const movieData = await movieRes.json();
      setMovies(movieData);
    }

    fetchScreenings();
    fetchMovies();
  }, []);

  const sortedScreenings = screenings.sort(
    (a, b) => new Date(a.screeningTime) - new Date(b.screeningTime)
  );

  const groupedScreenings = {};
  sortedScreenings.forEach((screening) => {
    const date = new Date(screening.screeningTime).toLocaleDateString();
    if (!groupedScreenings[date]) {
      groupedScreenings[date] = [];
    }
    groupedScreenings[date].push(screening);
  });

  const getPosterImage = (movieTitle) => {
    const movie = movies.find((m) => m.title === movieTitle);
    if (movie) {

      return 'https://cinema-rest.nodehill.se' + movie.description.posterImage;
    }
    return null;
  };

  const getLength = (movieTitle) => {
    const movie = movies.find((m) => m.title === movieTitle);
    if (movie) {

      return movie.description.length;
    }
    return null;
  };

  const categoryChange = (category) => {
    setCategoryFilter(category);
    const filteredMovies = movies.filter(movie => movie.description.categories.includes(category));
    const movieIds = filteredMovies.map(movie => movie.title);

    const filteredScreenings = screenings.filter(screening => movieIds.includes(screening.movie));

    setMovies([])
    setMovies(filteredMovies);
    setScreenings([])
    setScreenings(filteredScreenings)
  }

  return (
    <div>
      <div>
        <select value={categoryFilter} onChange={(e) => categoryChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          {/* add more categories here */}
        </select>
      </div>
      {Object.keys(groupedScreenings).map((date) => (
        <div key={date}>
          <h2>{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
          <ul>
            {groupedScreenings[date].map((screening) => (
              <li key={screening.screeningId}>
                <Link
                  to={'/booking/'}>
                  <img id="screening-img" src={getPosterImage(screening.movie)} alt="Movie Poster" /></Link>
                {new Date(screening.screeningTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {screening.movie} ({screening.auditorium})
                <p>Length: - {getLength(screening.movie)} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}