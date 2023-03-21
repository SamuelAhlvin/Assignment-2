import { useParams } from 'react-router-dom';
import { useStates } from './utilities/states';
import { useEffect } from 'react';

export default function () {

  // read the id param from the url
  const { id } = useParams();

  // read the shared state/context main
  // that was set in App and contains the movie list
  const s = useStates('main');

  // find our movie and deconstruct properties from it to variables
  const movie = s.movies.find(movie => movie.id == id);
  const screenings = s.screenings.filter(screening => screening.movieId == id);
  const { title, description } = movie;
  const { length, categories, posterImage } = description;

  return <div className="movie-detail">
    <h3>{title}</h3>
    <h4>Length: {length} minutes</h4>
    <h4>Categories: {categories.join(', ')}</h4>
    <h4>Dates Showing:</h4>
    {screenings.map(screening => (
      <h4>{new Date(screening.time).toLocaleTimeString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</h4>
    ))}
    <img src={'https://cinema-rest.nodehill.se' + posterImage} />
    <hr />
  </div>
}