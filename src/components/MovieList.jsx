import { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const movieByGenreBaseURL = "https://api.themoviedb.org/3/discover/movie?api_key=fe101b219fc647c9b01337079aaeb22e";

export function MovieList({ gener_id }) {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track the selected movie
  const elementRef = useRef();
  const movieDetailsRef = useRef(); // Ref for the movie details panel

  // Function to scroll the element left
  function moveLeft(element) {
    element.scrollLeft -= 400;
  }

  // Function to scroll the element right
  function moveRight(element) {
    element.scrollLeft += 400;
  }

  // Fetch movies based on genre ID
  useEffect(() => {
    console.log(movieByGenreBaseURL + '&with_genres=' + gener_id);
    fetch(movieByGenreBaseURL + '&with_genres=' + gener_id)
      .then(res => res.json())
      .then(json => {
        console.log(json.results);
        setMovies(json.results);
      });
  }, [gener_id]);

  // Handle movie click
  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  // Handle click outside the movie details panel to close it
  useEffect(() => {
    // Function to handle outside clicks
    function handleClickOutside(event) {
      if (movieDetailsRef.current && !movieDetailsRef.current.contains(event.target)) {
        setSelectedMovie(null); // Close the details panel
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Movie List */}
      <div ref={elementRef} className="flex gap-1 md:gap-8 overflow-auto mx-4 scroll-smooth scrollbar-none">
        <MdOutlineKeyboardArrowLeft className="hidden md:block absolute z-10 top-[40%] left-4 text-4xl text-white" onClick={() => { moveLeft(elementRef.current) }} />
        {movies && movies.map((m, index) => index <= 10 && (
          <div key={m.id} className="h-full p-4 min-w-[150px] md:min-w-[220px] rounded-lg cursor-pointer hover:scale-110 ease-in-out duration-300" onClick={() => handleMovieClick(m)}>
            <img className="rounded-lg hover:border-2 border-gray-600" src={IMAGE_BASE_URL + m.poster_path} alt={m.title} />
            <h2 className="text-white">{m.title}</h2>
          </div>
        ))}
        <MdOutlineKeyboardArrowRight className="hidden md:block absolute z-10 top-[40%] right-8 text-4xl text-white" onClick={() => moveRight(elementRef.current)} />
      </div>

      {/* Movie Details */}
      {selectedMovie && (
        <div ref={movieDetailsRef} className="mt-8 flex flex-col items-center text-white bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xl">Rating: {selectedMovie.vote_average}</span>
          </div>
          <img
            className="mt-4 w-[300px] md:w-[400px] rounded-lg"
            src={IMAGE_BASE_URL + selectedMovie.poster_path}
            alt={selectedMovie.title}
          />
          {/* Display the image URL */}
          <div className="mt-4 text-sm text-gray-300">
            <span>Image URL: </span>
            <a 
              href={IMAGE_BASE_URL + selectedMovie.poster_path} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline text-blue-400"
            >
              {IMAGE_BASE_URL + selectedMovie.poster_path}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
