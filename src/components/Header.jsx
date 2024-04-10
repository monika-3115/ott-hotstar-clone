import logo from '../assets/logo.webp';
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { PiFilmReelFill } from "react-icons/pi";
import { PiTelevisionSimpleFill } from "react-icons/pi";

export function Header(){
    const menu = [
        {
            icon: AiFillHome,
            title : 'HOME'
        },
        {
            icon : FiSearch,
            title : 'SEARCH'
        },
        {
            icon : FaPlus ,
            title : 'WATCHLIST'
        },
        {
            icon : FaStar,
            title : 'ORIGINALS'
        },
        {
            icon : PiFilmReelFill,
            title : 'MOVIES'
        },
        {
            icon : PiTelevisionSimpleFill,
            title : 'SERIES'
        }
    ]

    return (
        <div className='h-18 py-2  px-4 bg-[rgb(0, 0, 39)] flex items-center'>
            <div className=' p-2 px-0 w-full flex justify-between md:justify-around gap-2 items-center'>
                <img src={logo} className='h-8 md:h-12'/>
                <div className=' flex  gap-2 font-semibold  text-white'>
                    {menu.map((m) => <Nav Icon={m.icon} Title={m.title}/>)}
                </div>
                <div >
                    <img src='https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png' className='md:h-16 md:w-18 h-10 rounded-full  float-right '/>
                </div>
            </div>
        </div>
    )
}

function Nav({Icon, Title}){
    
    return (
        <div className='flex items-center gap-2 hover:underline underline-offset-8 text-xl md:text-[16px] cursor-pointer'>
            <Icon/>
            <p className='hidden md:block'>{Title}</p>
        </div>
    )
}