
import "./seatselect.css";

export  const SeatSelection =({ seats, onSelectSeat }) => {
    return (
      <div className="seat-selection">
        <h2>Select Your Seats</h2>
        <div className="seat-grid">
          {seats.map(seat => (
            <div
              key={seat._id}
              className={`seat ${seat.status}`}
              onClick={() => onSelectSeat(seat)}
            >
             
              {seat.number}
            </div>
          ))}
        </div>
      </div>
    );
  };