import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Transition from './Components/Transition';
import './styles/app.scss';
import Home from './Pages/Home';
import About from './Pages/About';
import Works from './Pages/Works';
import Contact from './Pages/Contact';
import { useEffect, useState } from 'react';
import useWindowSize from './Hooks/useWindowSize';

function App() {
  const navigate = useNavigate()
  let mouseXY = []
  const onMouseMoveHandler = (e) => {
    mouseXY[0] = e.pageX
    mouseXY[1] = e.pageY
  }
  const windowSize = useWindowSize()

  const [slidein, setSlidein] = useState(false)
  const [slideoutFirst, setSlideoutFirst] = useState(false)
  const [slideoutSecond, setSlideoutSecond] = useState(false)

  const transition = (link) => {
    setTimeout(() => {
      navigate(link)
    }, 1000)
    setSlidein(true)
    setTimeout(() => {
      setSlideoutFirst(true)
    }, 2000)
    setTimeout(() => {
      setSlideoutSecond(true)
    }, 2500)
    setTimeout(() => {
      setSlideoutFirst(false)
      setSlideoutSecond(false)
      setSlidein(false)
    }, 3500)
  }

  useEffect(() => {

  }, [windowSize])

  return (
    <div className="app" onMouseMove={onMouseMoveHandler}>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route exact path='/' Component={() => (<Home mouseXY={mouseXY}/>)} />
          <Route path='/about' Component={About} />
          <Route path='/works' Component={Works} />
          <Route path='contact' Component={Contact} />
        </Routes>
        {slidein && <Transition slideout={slideoutFirst} index={2} color={'rgb(38,26,93)'} />}
        {slidein && <Transition slideout={slideoutSecond} index={0} color={'rgb(58,46,113)'} />}
        <Navbar handleClick={transition} active={!slidein}/>
      </div>
    </div>
  );
}

export default App;
