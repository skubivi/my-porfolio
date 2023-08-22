import ParticleContainer from "../Components/ParticleContainer"
import '../styles/home.scss'

const Home = (props) => {
    return (
        <div className="home">
            <ParticleContainer mouseXY={props.mouseXY} />
        </div>
    )
}

export default Home