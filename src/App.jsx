import {Header} from './components/Header'
import {Slider} from './components/Slider'
import {Channels} from './components/Channels'
import { MovieGeners}  from './components/MovieGeners'
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
 
  return (
    <Analytics>
    <div className='hi h-full'>
      <Header />
      <Slider />
      <Channels/>
      <MovieGeners />
    </div>
    </Analytics>
  )
}

export default App
