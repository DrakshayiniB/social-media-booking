import "./movielist.css";

export const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <div className="movie-list">
      <h2>Select a Movie</h2>
      <div className="movie-list__container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-item" onClick={() => onSelectMovie(movie)}>
            <h3>{movie.title}</h3>
            <p>Duration: {movie.duration} minutes</p>
            <p>Genre: {movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};