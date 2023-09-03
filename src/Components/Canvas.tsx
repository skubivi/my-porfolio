import { useEffect, useRef } from "react"
import useWindowSize from "../Hooks/useWindowSize"
import * as React from 'react'

type CanvasType = {
    dots: Array<PointType>
}

const Canvas: React.FC<CanvasType> = ({dots}) => {
    const windowSize: WindowSizeType = useWindowSize()
    const maxWidth: number = 1200
    const width: number = maxWidth < windowSize[0] ? maxWidth : windowSize[0]
    const height: number = windowSize[1]

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current
        canvas.width = width
        canvas.height = height
        const context: CanvasRenderingContext2D = canvas.getContext('2d')
        const maxRadius: number = 200
        for (let i = 0; i < dots.length; i++) {
            for (let j = i+1; j < dots.length; j++) {
                const deltaX: number = dots[i].x - dots[j].x
                const deltaY: number = dots[i].y - dots[j].y
                const radius: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                if (radius <= maxRadius) {
                    context.beginPath()
                    context.strokeStyle = 'rgba(255, 255, 51, ' + (Math.floor((1 - radius / maxRadius) * 100)) / 100 + ')'
                    context.lineWidth = (Math.floor((1 - radius / maxRadius) * 100)) / 50
                    context.moveTo(Math.floor(dots[i].x - dots[i].r / 2), Math.floor(dots[i].y - dots[i].r / 2))
                    context.lineTo(Math.floor(dots[j].x - dots[j].r / 2), Math.floor(dots[j].y - dots[j].r / 2))
                    context.stroke()
                }
            }
        }
    }, [canvasRef, windowSize, dots, width, height])

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Canvas