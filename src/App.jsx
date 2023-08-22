import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import './styles/app.scss';
import Home from './Pages/Home';
import About from './Pages/About';
import Works from './Pages/Works';
import Contact from './Pages/Contact';
import { useEffect, useState } from 'react';
import useWindowSize from './Hooks/useWindowSize';
import Transitions from './Components/Transitions';
import topLeftImg from './Images/top-left-img.png'

function App() {
  let mouseXY = []
  const onMouseMoveHandler = (e) => {
    mouseXY[0] = e.pageX
    mouseXY[1] = e.pageY
  }
  const windowSize = useWindowSize()

  const location = useLocation()
  const [link, setLink] = useState(location.pathname)
  const transition = (link) => {
    setLink(link)
  }

  useEffect(() => {

  }, [windowSize])

  return (
    <div className="app" onMouseMove={onMouseMoveHandler}>
      <div className='wrapper'>
        <Header />
        <Routes>
          <Route exact path='/' Component={() => (<Home mouseXY={mouseXY} redirect={transition}/>)} />
          <Route path='/about' Component={About} />
          <Route path='/works' Component={Works} />
          <Route path='contact' Component={Contact} />
        </Routes>
        <Transitions link={link}/>
      </div>
      <Navbar handleClick={transition} active={true}/>
      <img className="topLeftImg" src={topLeftImg} alt='' />
    </div>
  );
}

export default App;
