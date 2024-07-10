import "./cinemalist.css";

export const CinemaList = ({ cinemas, onSelectCinema }) => {
  return (
    <div className="cinema-list">
      <h2>Select a Cinema</h2>
      <div className="cinema-list__container">
        {cinemas.map(cinema => (
          <div key={cinema._id} className="cinema-item" onClick={() => onSelectCinema(cinema)}>
            <h3>{cinema.name}</h3>
            <p>{cinema.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};