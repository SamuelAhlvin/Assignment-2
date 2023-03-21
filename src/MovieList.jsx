import { useStates } from './utilities/states';
import { Link } from 'react-router-dom';

export default function MovieList() {

  const s = useStates('main');

  return <>
    {s.movies.map(({ id, title, description: d }) => <Link
      to={'/movie-detail/' + id}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="movie">
              <h3>{title}</h3>
              <img src={'https://cinema-rest.nodehill.se' + d.posterImage} />
              <p>Length {d.length}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </Link>
    )}
  </>;

}