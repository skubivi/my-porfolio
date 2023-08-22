import { useEffect, useRef } from "react"
import useWindowSize from "../Hooks/useWindowSize"

const Canvas = (props) => {
    const windowSize = useWindowSize()
    const maxWidth = 1200
    const width = maxWidth < windowSize[0] ? maxWidth : windowSize[0]
    const height = windowSize[1]

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        const maxRadius = 200
        for (let i = 0; i < props.dots.length; i++) {
            for (let j = i+1; j < props.dots.length; j++) {
                const deltaX = props.dots[i].x - props.dots[j].x
                const deltaY = props.dots[i].y - props.dots[j].y
                const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                if (radius <= maxRadius) {
                    context.beginPath()
                    context.strokeStyle = 'rgba(255, 255, 51, ' + (Math.floor((1 - radius / maxRadius) * 100)) / 100 + ')'
                    context.lineWidth = (Math.floor((1 - radius / maxRadius) * 100)) / 50
                    context.moveTo(Math.floor(props.dots[i].x - props.dots[i].r / 2), Math.floor(props.dots[i].y - props.dots[i].r / 2))
                    context.lineTo(Math.floor(props.dots[j].x - props.dots[j].r / 2), Math.floor(props.dots[j].y - props.dots[j].r / 2))
                    context.stroke()
                }
            }
        }
    }, [canvasRef, windowSize, props.dots, width, height])

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Canvas