import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Transition from "./Transition"
    

const Transitions = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [slidein, setSlidein] = useState(false)
    const [slideoutFirst, setSlideoutFirst] = useState(false)
    const [slideoutSecond, setSlideoutSecond] = useState(false)

    const transition = (link) => {
        if (location.pathname === link || slidein) {
            return
        }
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
        transition(props.link)
    }, [props.link])
    return (
        <div>
            <Transition slidein={slidein} slideout={slideoutFirst} index={2} color={'rgb(38,26,93)'} />
            <Transition slidein={slidein} slideout={slideoutSecond} index={0} color={'rgb(58,46,113)'} />
        </div>
    )
}

export default Transitions