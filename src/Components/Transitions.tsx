import { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import * as React from 'react'

import Transition from "./Transition"
    
type TransitionsType = {
    link: string
}

const Transitions: React.FC<TransitionsType> = ({link}) => {
    const navigate: NavigateFunction = useNavigate()
    const location: LocationState = useLocation()

    const [slidein, setSlidein] = useState<boolean>(false)
    const [slideoutFirst, setSlideoutFirst] = useState<boolean>(false)
    const [slideoutSecond, setSlideoutSecond] = useState<boolean>(false)

    useEffect(() => {
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
    }, [link, location, navigate, slidein])
    return (
        <div>
            <Transition slidein={slidein} slideout={slideoutFirst} index={3} color={'rgb(38,26,93)'} />
            <Transition slidein={slidein} slideout={slideoutSecond} index={1} color={'rgb(58,46,113)'} />
        </div>
    )
}

export default Transitions