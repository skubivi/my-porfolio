import { useEffect, useState } from "react"
import useWindowSize from "../Hooks/useWindowSize";
import Canvas from "./Canvas";
import * as React from 'react'

type ParticleContainerType = {
    mouseXY: MouseXYType
}

const ParticleContainer: React.FC<ParticleContainerType> = ({mouseXY}) => {
    const maxWidth = 1200
    let windowSize: WindowSizeType = useWindowSize()
    let width: number = maxWidth < windowSize[0] ? maxWidth : windowSize[0]
    let height: number = windowSize[1]

    const styleObj = {
        width: width + 'px',
        left: windowSize[0] - width + 'px'
    }
    
    const [points, setPoints] = useState<Array<PointType>>([])

    type RunFromMouseType = (point: PointType, mouseX: number, mouseY: number) => PointType
    const runFromMouse: RunFromMouseType = (point, mouseX, mouseY) => {
        if (isNaN(mouseX)) return point
        const radius: number = 150
        const deltaX: number = point.x - mouseX
        const deltaY: number = point.y - mouseY
        const hypo: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (hypo > radius) return point
        const ratio: number = hypo / radius
        const newX: number = deltaX / ratio + point.x
        const newY: number = deltaY / ratio + point.y
        return {
            ...point,
            target: [newX, newY]
        }
    }

    const pointsInComponent: Array<React.ReactNode> = []
    for (let i = 0; i < points.length; i++) {
        const pointStyle = {
            left: Math.floor(points[i].x - points[i].r) + 'px',
            top: Math.floor(points[i].y - points[i].r) + 'px',
            width: points[i].r + 'px',
            height: points[i].r + 'px',
            borderRadius: points[i].r / 2 + 'px'
        }
        pointsInComponent.push(
            <div key={i} style={pointStyle} className="point" />
        )
    }

    useEffect(() => {
        type MakePointType = () => PointType
        const makePoint: MakePointType = () => {
            const x: number = Math.floor(Math.random() * width)
            const y: number = Math.floor(Math.random() * height)
            const vX: number = Math.random() - 0.5
            const vY: number = Math.random() - 0.5
            const r: number = Math.floor(Math.random() * 5 + 5)
            return {
                x, y, vX, vY, r, target: 'none'
            }
        }

        type MakePointsType = () => Array<PointType>
        const makePoints: MakePointsType = () => {
            let maxPointsLength: number = 100
            if (width < maxWidth) {
                maxPointsLength = Math.floor(maxPointsLength * width / maxWidth)
            }
            const result: Array<PointType> = []
            for (let i = 0; i < maxPointsLength; i++) {
                result.push(makePoint())
            }
            return result
        }

        type MakeMoveType = (point: PointType) => PointType
        const makeMove: MakeMoveType = (point) => {
            if (isNaN(point.x)) return makePoint()
            let newVX: number = point.vX
            let newVY: number = point.vY
            if (point.target !== 'none') {
                if (point.target[0] < 1) point.target[0] = 2
                if (point.target[1] < 1) point.target[1] = 2
                if (point.target[0] > width) point.target[0] = width - 1
                if (point.target[1] > height) point.target[1] = height - 1
                const deltaX: number = -point.x + point.target[0]
                const deltaY: number = -point.y + point.target[1]
                const hypo: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                if (hypo <= 20) {
                    point.target = 'none'
                    newVX = Math.random() - 0.5
                    newVY = Math.random() - 0.5
                }
                else {
                    newVX = deltaX / 16
                    newVY = deltaY / 16
                }
            }
            let newX: number = point.x + newVX
            if (newX + 2 * point.r > width) {
                newX = width - 2 * point.r
                newVX = -Math.abs(newVX)
            }
            if (newX < 1) {
                newX = 1
                newVX = Math.abs(newVX)
            }
            let newY: number = point.y + newVY
            if (newY + 2 * point.r > height) {
                newY = height - 2 * point.r
                newVY = -Math.abs(newVY)
            }
            if (newY < 1) {
                newY = 1
                newVY = Math.abs(newVY)
            }
            return {
                ...point,
                x: newX,
                y: newY,
                vX: newVX,
                vY: newVY,
            }
        }

        if (points.length === 0) setPoints(makePoints)
        const id: ReturnType<typeof setTimeout> = setTimeout(()=> {
            const mouseX: number | null = mouseXY[0] - (windowSize[0] - width)
            const mouseY: number | null = mouseXY[1]
            setPoints(prev => prev.map((point) => runFromMouse(point, mouseX, mouseY)))
            setPoints(prev => prev.map((point) => makeMove(point)))
        }, 16)
        return () => clearTimeout(id)
    }, [windowSize, points, mouseXY, width, height])

    return (
        <div className="particleContainer" style={styleObj}>
            <Canvas dots={points}/>
            {pointsInComponent}
        </div>
    )
}

export default ParticleContainer