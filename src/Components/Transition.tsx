import * as React from 'react'

type TransitionType = {
    slidein: boolean
    slideout: boolean
    index: number
    color: string
}

const Transition: React.FC<TransitionType> = ({slidein, slideout, index, color}) => {
    const className: string = (slidein ? 'transition' : '') + (slideout ? ' transition-out' : '')
    type StyleObjType = {
        zIndex: string
        backgroundColor: string
    }
    const styleObj:StyleObjType = {
        zIndex: index + '',
        backgroundColor: color
    }
    return (
        <div className={className} style={styleObj}>

        </div>
    )
}

export default Transition