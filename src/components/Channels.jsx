import marvel from '../assets/marvel.png'
import disney from '../assets/disney.png'
import pixar from '../assets/pixar.png'
import starWars from '../assets/starwar.png'
import natGeo from '../assets/nationalG.png'

import starwarV from '../assets/star-wars.mp4'
import disneyV from '../assets/disney.mp4'
import marvelV from '../assets/marvel.mp4'
import nationalGeographicV from '../assets/national-geographic.mp4'
import pixarV from '../assets/pixar.mp4'
export function Channels(){

    const channel = [
        {
            src : disney, 
            name: "Disney", 
            vid : disneyV
        },
        {
            src : marvel,
            name : 'Marvel',
            vid : marvelV
        },
        {
            src : natGeo,
            name : 'National Geographi',
            vid : nationalGeographicV
        },
        {
            src : pixar,
            name : 'Pixar',
            vid : pixarV
        },
        {
            src : starWars,
            name : 'StarWar',
            vid : starwarV
        }
    ]

    return (
        <div className=' flex gap-6  md:mx-12 mx-4 my=2'>
            {channel.map((ch) => (<Channel src={ch.src} vid={ch.vid}/>))}
        </div>
    )
}

function Channel({src, vid}){

    return (
        <div className='relative rounded-md border-2 border-gray-500 hover:border-gray-100 hover:scale-110 ease-in-out cursor-pointer duration-300 shadow-lg shadow-gray-700'>
            <video src={vid} autoPlay loop muted playsInline className='absolute z-0 rounded-sm opacity-0 hover:opacity-50'/>
            <img className='' src={src}/>
        </div>
    )
}