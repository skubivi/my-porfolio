import ParticleContainer from "../Components/ParticleContainer"
import '../styles/home.scss'

import roundedText from '../Images/rounded-text.png'
import roundedStar from '../Images/circle-star.svg'

const Home = (props) => {
    const handleClick = (e) => {
        props.redirect('/works')
    }
    return (
        <div className="home">
            <ParticleContainer mouseXY={props.mouseXY} />
            <div>
                <p id="title"><b>Fronted React <font color='red'>Разработчик</font></b></p>
                <div className="imageContainer" onClick={handleClick}>
                    <img className="text" src={roundedText} alt="" />
                    <img className='star' src={roundedStar} alt="" />
                    <span class="material-symbols-outlined arrow">
                        arrow_right_alt
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home