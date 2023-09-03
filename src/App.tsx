import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import './styles/app.scss';
import Home from './Pages/Home';
import About from './Pages/About';
import Works from './Pages/Works';
import Contact from './Pages/Contact';
import { useEffect, useState, MouseEvent, MouseEventHandler } from 'react';
import useWindowSize from './Hooks/useWindowSize';
import Transitions from './Components/Transitions';
import topLeftImg from './Images/top-left-img.png'
import circlesImg from './Images/circles.png'
import * as React from 'react';

const App: React.FC = () => {
  let mouseXY: MouseXYType = [null, null]
  const onMouseMoveHandler: MouseEventHandler = (e: MouseEvent) => {
    mouseXY[0] = e.pageX
    mouseXY[1] = e.pageY
  }
  const windowSize: WindowSizeType = useWindowSize()

  const location: LocationState = useLocation()
  const [link, setLink] = useState<string>(location.pathname)
  
  const transition: TransitionFuncType = (link: string) => {
    setLink(link)
  }

  useEffect(() => {

  }, [windowSize])

  return (
    <div className="app" onMouseMove={onMouseMoveHandler}>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route path='/' Component={() => (<Home mouseXY={mouseXY} redirect={transition}/>)} />
          <Route path='/about' Component={About} />
          <Route path='/works' Component={Works} />
          <Route path='contact' Component={Contact} />
        </Routes>
        <Transitions link={link}/>
      </div>
      <Navbar transition={transition} active={true}/>
      <img className="topLeftImg" src={topLeftImg} alt='' />
      <img className="circlesImg" src={circlesImg} alt='' />
    </div>
  );
}

export default App;
