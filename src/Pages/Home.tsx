import ParticleContainer from "../Components/ParticleContainer"
import '../styles/home.scss'
import * as React from 'react';

import roundedText from '../Images/rounded-text.png'
import roundedStar from '../Images/circle-star.svg'

type HomeType = {
    redirect: TransitionFuncType
    mouseXY: MouseXYType
}

const Home: React.FC<HomeType> = ({redirect, mouseXY}) => {
    const handleClick = (e: React.MouseEvent) => {
        redirect('/works')
    }
    return (
        <div className="home">
            <ParticleContainer mouseXY={mouseXY} />
            <div>
                <p id="title"><b>Frontend React <span>Разработчик</span></b></p>
                <div className="imageContainer" onClick={handleClick}>
                    <img className="text" src={roundedText} alt="" />
                    <img className='star' src={roundedStar} alt="" />
                    <span className="material-symbols-outlined arrow">
                        arrow_right_alt
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home