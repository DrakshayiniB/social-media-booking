import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './booking.css';
import { CinemaList } from '../../components/cinemalist/CinemaList';
import { MovieList } from '../../components/movielist/MovieList';
import { SeatSelection } from '../../components/seatselection/SeatSelection';



const Booking = () => {
    const [cinemas, setCinemas] = useState([]);
    const [movies, setMovies] = useState([]);
    const [seats, setSeats] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);



    useEffect(() => {
      const fetchCinemas = async () => {
        try {
          const response = await axios.get('http://localhost:8800/api/cinemas');
          setCinemas(response.data);
        } catch (error) {
          console.error('Error fetching cinemas:', error);
        }
      };
      fetchCinemas();
    }, []);
  
    const handleSelectCinema = async (cinema) => {
      setSelectedCinema(cinema);
      setSelectedMovie(null);
      setSelectedSeats([]);
      try {
        const response = await axios.get(`http://localhost:8800/api/movies?cinemaId=${cinema._id}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    const handleSelectMovie = async (movie) => {
      setSelectedMovie(movie);
      setSelectedSeats([]);
      try {
        const response = await axios.get(`http://localhost:8800/api/seats?movieId=${movie._id}`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };
  
    const handleSelectSeat = async (seat) => {
      if (seat.status === "available") {
        if (selectedSeats.find(s => s._id === seat._id)) {
          setSelectedSeats(selectedSeats.filter(s => s._id !== seat._id));
        } else {
          setSelectedSeats([...selectedSeats, seat]);
        }
      }
    };
  
    const handleBooking = async () => {
      if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
      }
      try {
        const bookingData = {
          cinemaId: selectedCinema._id,
          movieId: selectedMovie._id,
          seatIds: selectedSeats.map(seat => seat._id)
        };
        const response = await axios.post('http://localhost:8800/api/bookings', bookingData);
        alert('Booking successful!');
        // Reset selections after successful booking
        setSelectedCinema(null);
        setSelectedMovie(null);
        setSelectedSeats([]);
      } catch (error) {
        console.error('Error making booking:', error);
        alert('Booking failed. Please try again.');
      }
     
    };

    
    return (
      <div className="booking-app">
        <h1>Cinema Booking Application</h1>
        <div className="booking-container">
          <CinemaList cinemas={cinemas} onSelectCinema={handleSelectCinema} />
          {selectedCinema && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {selectedMovie && (
            <SeatSelection seats={seats} onSelectSeat={handleSelectSeat} />
          )}
        </div>
        {selectedSeats.length > 0 && (
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p>Cinema: {selectedCinema.name}</p>
            <p>Movie: {selectedMovie.title}</p>
            <p>Seats: {selectedSeats.map(seat => seat.number).join(', ')}</p>
            <button onClick={handleBooking}>Confirm Booking</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Booking;