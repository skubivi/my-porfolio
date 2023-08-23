import { useEffect, useRef, useState } from "react"

const ProjectCard = (props) => {
    const className = 'item' + (props.active ? ' active': '')
    let style = {}
    if (props.image) {
        style={
            backgroundImage: "url(" + props.image + ")"
        }
    }
    if (props.left) {
        style={
            ...style,
            marginLeft: props.left + 'px'
        }
    }

    const handleClick = (e) => {
        props.func()
    }

    const ref = useRef(null)
    const [width, setWidth] = useState(0)
    useEffect(() => {
        const id = setTimeout(() => {
            setWidth(ref.current.offsetWidth)
        }, 400)
        
        if (props.effect) {
            props.effect(width)
        }

        return () => {
            clearTimeout(id)
        }
    }, [width, props])

    return (
        <div className={className} style={style} onClick={handleClick} ref={ref}>
            <div className="item-desc">
                <h3>{props.title}</h3>
                <a href={props.url} target="_blank">{props.url}</a>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default ProjectCard