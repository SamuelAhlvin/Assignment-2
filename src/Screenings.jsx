import { useState, useEffect } from "react";
import { useStates } from './utilities/states';

export default function ScreeningsOverview() {
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);

  const s = useStates('main');

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

  return (
    <div>
      {Object.keys(groupedScreenings).map((date) => (
        <div key={date}>
          <h2>{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
          <ul>
            {groupedScreenings[date].map((screening) => (
              <li key={screening.screeningId}>
                <img id="screening-img" src={getPosterImage(screening.movie)} alt="Movie Poster" />
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