import { useEffect, useRef, useState } from "react"

import * as React from 'react' 

type ProjectCardType = {
    title: string
    url: string
    description: string
    active: boolean
    image: string
    func: React.MouseEventHandler,
    effect?: (n: number) => void
    left?: number
}

const ProjectCard: React.FC<ProjectCardType> = ({title, url, description, active, image, func, effect, left}) => {
    const className: string = 'item' + (active ? ' active': '')
    let style: {backgroundImage?: string, marginLeft?: string} = {}
    if (image) {
        style={
            backgroundImage: "url(" + image + ")"
        }
    }
    if (left) {
        style={
            ...style,
            marginLeft: left + 'px'
        }
    }

    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)
    useEffect(() => {
        console.log(typeof setTimeout);
        
        const id: ReturnType<typeof setTimeout> = setTimeout(() => {
            setWidth(ref.current.offsetWidth)
        }, 400)
        
        if (effect) {
            effect(width)
        }

        return () => {
            clearTimeout(id)
        }
    }, [width, active])

    return (
        <div className={className} style={style} onClick={func} ref={ref}>
            <div className="item-desc">
                <h3>{title}</h3>
                <a href={url} target="_blank">{url}</a>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ProjectCard