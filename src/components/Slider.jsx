import { useEffect, useRef, useState } from "react"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const url = 'https://api.themoviedb.org/3'

const screenWidth = window.innerWidth;

export function Slider(){

    const [data, setData] = useState()
    const elementRef = useRef()
    
    //https://api.themoviedb.org/3
    const movieBaseUrl="https://api.themoviedb.org/3"
    const api_key='fe101b219fc647c9b01337079aaeb22e'

    function moveLeft(element){
        // console.log(element)
        element.scrollLeft -= screenWidth - 80
    }

    function moveRight(element){
        element.scrollLeft += screenWidth - 80
    }
    useEffect(() => {
        
        fetch(movieBaseUrl + "/trending/all/day?api_key="+api_key)
        .then(response => response.json())
        .then(json => {
            setData(json.results);
        })
        .catch(() => setData('error'))

    }, [])

    return (
        <div className="relative ">
            <MdOutlineKeyboardArrowLeft className="hidden md:block absolute top-1/2 left-1 text-4xl text-white" onClick={() => {moveLeft(elementRef.current)}}/>  
            <div ref={elementRef} className="scroll-smooth flex gap-10 py-6 scrollbar-none px-14 w-full   overflow-x-auto">
                {data && data.map((d, index) => (index<10) ?
                    (<img className='md:h-[600px] min-w-full object-cover object-top rounded-lg border-white hover:border-2' src={'https://image.tmdb.org/t/p/original' + d.backdrop_path} title={d.title? d.title : d.name}/>)
                    : null
                )}
            </div>
            <MdOutlineKeyboardArrowRight className=" hidden md:block absolute top-1/2 right-2 text-4xl text-white" onClick={() => moveRight(elementRef.current)}/>
            
        </div>    
    )
}


function Image(){

    return (
        <div className="m-6">
             <div className="h-0 hover:h-40 w-40 bg-red-400 absolute flex justify-center items-center font-bold">Title</div>
            <div >
                <img className="h-40 w-40  hover:scale-110" src='https://images.ctfassets.net/hrltx12pl8hq/7JnR6tVVwDyUM8Cbci3GtJ/bf74366cff2ba271471725d0b0ef418c/shutterstock_376532611-og.jpg'/>
            </div>
           
        </div>
    )
}