import { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf';
const screenWidth = window.innerWidth;


export function MovieList({gener_id}){

    const [movies, setMovies] = useState(null)
    const elementRef = useRef();
    function moveLeft(element){
        console.log(element)
        element.scrollLeft -= 400
    }

    function moveRight(element){
        element.scrollLeft += 400
    }

    useEffect(()=>{
        console.log(movieByGenreBaseURL + '&with_genres=' + gener_id)
        fetch(movieByGenreBaseURL + '&with_genres='+gener_id)
        .then(res => res.json())
        .then(json => {console.log(json.results); console.log(gener_id) ;setMovies(json.results); console.log(movies)})
    }, [])

    return (
        <div className="relative">
            <div ref={elementRef} className="flex gap-1 md:gap-8 overflow-auto mx-4  scroll-smooth scrollbar-none">
                <MdOutlineKeyboardArrowLeft className="hidden md:block absolute z-10 top-[40%] left-4 text-4xl text-white" onClick={() => {moveLeft(elementRef.current)}}/>
                {movies && movies.map((m, index) => index<=10&& (
                    <div className="h-full p-4 min-w-[150px] md:min-w-[220px] rounded-lg cursor-pointer hover:scale-110 ease-in-out duration-300">
                        <img className="rounded-lg hover:border-2 border-gray-600" src={IMAGE_BASE_URL + m.poster_path}/>
                        <h2 className="text-white">{m.title}</h2>
                    </div>
                ))}
                <MdOutlineKeyboardArrowRight className=" hidden md:block absolute z-10 top-[40%] right-8 text-4xl text-white" onClick={() => moveRight(elementRef.current)}/>
            </div>
        </div>
    )
}