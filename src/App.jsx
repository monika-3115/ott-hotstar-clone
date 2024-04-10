import {Header} from './components/Header'
import {Slider} from './components/Slider'
import {Channels} from './components/Channels'
import { MovieGeners}  from './components/MovieGeners'
import './App.css'

function App() {
 
  return (
    <div className='hi h-full'>
      <Header />
      <Slider />
      <Channels/>
      <MovieGeners />
    </div>
  )
}

export default App
