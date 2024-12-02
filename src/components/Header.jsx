import React, { useState } from "react";
import logo from "../assets/logo.webp";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaStar } from "react-icons/fa";
import { PiFilmReelFill, PiTelevisionSimpleFill } from "react-icons/pi";
import { IoTrashBin } from "react-icons/io5";

const API_KEY = "fe101b219fc647c9b01337079aaeb22e";


export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [isWatchlistLoaded, setIsWatchlistLoaded] = useState(false);

  const menu = [
    { icon: AiFillHome, title: "HOME" },
    { icon: FaPlus, title: "WATCHLIST" },
    { icon: FaStar, title: "ORIGINALS" },
    { icon: PiFilmReelFill, title: "MOVIES" },
    { icon: PiTelevisionSimpleFill, title: "SERIES" },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchRandomMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();
      const randomMovies = data.results.slice(0, 5).filter(
        (movie) => !watchlist.some((m) => m.id === movie.id)
      );
      setWatchlist((prev) => [...prev, ...randomMovies]);
    } catch (error) {
      console.error("Error fetching random movies:", error);
    }
  };

  const toggleWatchlist = () => {
    setShowWatchlist(!showWatchlist);
    if (!isWatchlistLoaded) {
      fetchRandomMovies();
      setIsWatchlistLoaded(true);
    }
  };

  const addMovieToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeMovieFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="h-18 py-2 px-4 bg-[rgb(0, 0, 39)] flex flex-col items-center relative">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full gap-4 md:justify-around">
        {/* Logo */}
        <img src={logo} className="h-8 md:h-12" alt="App Logo" />

        {/* Menu */}
        <div className="flex gap-4 text-white font-semibold">
          {menu.map((item) => (
            <button
              key={item.title}
              className="flex items-center gap-2 text-xl md:text-sm"
              onClick={item.title === "WATCHLIST" ? toggleWatchlist : undefined}
            >
              <item.icon />
              <span className="hidden md:block">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Profile and Search */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div
            className={`transition-all duration-300 flex items-center ${
              isSearchExpanded ? "w-96" : "w-10"
            } bg-white rounded-full shadow-md`}
          >
            <form
              className="flex items-center w-full"
              onSubmit={handleSearch}
              onClick={() => setIsSearchExpanded(true)}
            >
              {isSearchExpanded && (
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="p-2 flex-grow outline-none text-black placeholder-gray-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery.trim() && setIsSearchExpanded(false)}
                />
              )}
              <button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-full"
              >
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Profile */}
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full"
            alt="User Profile"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute top-16 w-full max-w-lg bg-white shadow-lg rounded-lg p-4 z-50">
          <ul className="max-h-64 overflow-y-auto">
            {searchResults.map((movie) => (
              <li
                key={movie.id}
                className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "https://via.placeholder.com/92x138?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-12 h-18 rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-md font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">
                    {movie.release_date?.slice(0, 4) || "Unknown Year"}
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                  onClick={() => addMovieToWatchlist(movie)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Watchlist */}
      {showWatchlist && (
        <div className="absolute top-16 right-0 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
          <h3 className="text-lg font-bold mb-4 text-center">Your Watchlist</h3>
          <ul className="max-h-64 overflow-y-auto">
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <li
                  key={movie.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-12 h-18 rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="text-md font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-600">
                      {movie.release_date?.slice(0, 4) || "Unknown Year"}
                    </p>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeMovieFromWatchlist(movie.id)}
                  >
                    <IoTrashBin />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">Watchlist is empty.</p>
            )}
          </ul>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
            onClick={fetchRandomMovies}
          >
            Add Random Movies
          </button>
        </div>
      )}
    </div>
  );
}
