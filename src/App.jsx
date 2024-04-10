import {Header} from './components/Header'
import {Slider} from './components/Slider'
import {Channels} from './components/Channels'
import { MovieGeners}  from './components/MovieGeners'
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
 
  return (
    
    <div className='hi h-full'>
      <Analytics mode={'production'} />
      <Header />
      <Slider />
      <Channels/>
      <MovieGeners />
    </div>
    
  )
}

export default App
