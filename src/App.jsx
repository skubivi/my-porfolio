import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import './styles/app.scss';
import Home from './Pages/Home';
import About from './Pages/About';
import Works from './Pages/Works';
import Contact from './Pages/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/works' Component={Works} />
        <Route path='contact' Component={Contact} />
      </Routes>
      <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
