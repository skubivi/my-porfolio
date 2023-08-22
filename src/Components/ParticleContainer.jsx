import React, { useEffect, useState } from "react"
import useWindowSize from "../Hooks/useWindowSize";
import Canvas from "./Canvas";

const ParticleContainer = (props) => {
    const maxWidth = 1200
    let windowSize = useWindowSize()
    let width = maxWidth < windowSize[0] ? maxWidth : windowSize[0]
    let height = windowSize[1]
    const styleObj = {
        width: width + 'px',
        left: windowSize[0] - width + 'px'
    }

    const [points, setPoints] = useState([])

    const runFromMouse = (point, mouseX, mouseY) => {
        if (isNaN(mouseX)) return point
        const radius = 100
        const deltaX = point.x - mouseX
        const deltaY = point.y - mouseY
        const hypo = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (hypo > radius) return point
        const ratio = hypo / radius
        const newX = deltaX / ratio + point.x
        const newY = deltaY / ratio + point.y
        return {
            ...point,
            target: [newX, newY]
        }
    }

    const pointsInComponent = []
    for (let i = 0; i < points.length; i++) {
        const pointStyle = {
            position: 'absolute',
            zIndex: '-1',
            left: Math.floor(points[i].x - points[i].r) + 'px',
            top: Math.floor(points[i].y - points[i].r) + 'px',
            width: points[i].r + 'px',
            height: points[i].r + 'px',
            borderRadius: points[i].r / 2 + 'px',
            background: 'rgba(255, 255, 51, 0.5)'
        }
        pointsInComponent.push(
            <div key={i} style={pointStyle} />
        )
    }

    useEffect(() => {
        const makePoint = () => {
            const x = Math.floor(Math.random() * width)
            const y = Math.floor(Math.random() * height)
            const vX = Math.random() - 0.5
            const vY = Math.random() - 0.5
            const r = Math.floor(Math.random() * 5 + 5)
            return {
                x, y, vX, vY, r, target: 'none'
            }
        }

        const makePoints = () => {
            let maxPointsLength = 100
            if (width < maxWidth) {
                maxPointsLength = Math.floor(maxPointsLength * width / maxWidth)
            }
            const result = []
            for (let i = 0; i < maxPointsLength; i++) {
                result.push(makePoint())
            }
            return result
        }

        const makeMove = (point) => {
            if (isNaN(point.x)) return makePoint()
            let newVX = point.vX
            let newVY = point.vY
            if (point.target !== 'none') {
                if (point.target[0] < 1) point.target[0] = 2
                if (point.target[1] < 1) point.target[1] = 2
                if (point.target[0] > width) point.target[0] = width - 1
                if (point.target[1] > height) point.target[1] = height - 1
                const deltaX = -point.x + point.target[0]
                const deltaY = -point.y + point.target[1]
                const hypo = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                if (hypo <= 1) {
                    point.target = 'none'
                    newVX = Math.random() - 0.5
                    newVY = Math.random() - 0.5
                }
                else {
                    newVX = deltaX / 16
                    newVY = deltaY / 16
                }
            }
            let newX = point.x + newVX
            if (newX + 2 * point.r > width) {
                newX = width - 2 * point.r
                newVX = -Math.abs(newVX)
            }
            if (newX < 1) {
                newX = 1
                newVX = Math.abs(newVX)
            }
            let newY = point.y + newVY
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
        const id = setTimeout(()=> {
            const mouseX = props.mouseXY[0] - (windowSize[0] - width)
            const mouseY = props.mouseXY[1]
            setPoints(prev => prev.map((point) => runFromMouse(point, mouseX, mouseY)))
            setPoints(prev => prev.map((point) => makeMove(point)))
        }, 16)
        return () => clearTimeout(id)
    }, [windowSize, points, props.mouseXY, width, height])

    return (
        <div className="particleContainer" style={styleObj}>
            <Canvas dots={points}/>
            {pointsInComponent}
        </div>
    )
}

export default ParticleContainer