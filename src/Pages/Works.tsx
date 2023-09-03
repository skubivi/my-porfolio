import ProjectCard from '../Components/ProjectCard'
import '../styles/works.scss'
import tagImage from '../Images/tag.jpg'
import vkBot from '../Images/vkBot.png'
import pacman from '../Images/pacman.jpg'
import flappyBird from '../Images/flappy.png'
import math from '../Images/math.jpg'
import { useState } from 'react'

import * as React from 'react';

const Works: React.FC = () => {
    const [active, setActive] = useState<number>(0)
    const [width0, setWidth0] = useState<number>(0)
    const [width1, setWidth1] = useState<number>(0)
    const [width2, setWidth2] = useState<number>(0)
    const [width3, setWidth3] = useState<number>(0)
    const [current, setCurrent] = useState<number>(0)

    type ProjectType = {
        title: string
        url: string
        description: string
        func: React.MouseEventHandler
        effect?: (n: number) => void
        image: string
    }
    const projects: Array<ProjectType> = [
        {
            title: "Пятнашки",
            url: 'https://skubivi.github.io/TagSolution/',
            description: 'Pet-проект по нахождению решения игры "Пятнашки". Алгоритм поиска решения реализован на основе A* алгоритма.',
            func: () => {
                setActive(0)
            },
            effect: (n) => {
                setWidth0(n)
            },
            image: tagImage
        },
        {
            title: "ВК бот по управлению ПК",
            url: 'https://github.com/skubivi/ComputerControlVKBot',
            description: 'Pet-проект для управления компьютером с помощью бота во Вконтакте. Все доступные команды, как и их описание указаны на странице репозитория.',
            func: () => {
                setActive(1)
            },
            effect: (n) => {
                setWidth1(n)
            },
            image: vkBot
        },
        {
            title: "Копия игры Пакман",
            url: 'https://github.com/skubivi/PacMan',
            description: 'Pet-проект являющийся копией игры Пакман. Реализовано на С++ с библиотекой SFML. Игра реализована покадрово, призраки управляются алгоритмом A*.',
            func: () => {
                setActive(2)
            },
            effect: (n) => {
                setWidth2(n)
            },
            image: pacman
        },
        {
            title: "ИИ, проходящий Flappy Bird",
            url: 'https://github.com/skubivi/FlappyBirdAI',
            description: 'Pet-проект реализующий нейронную сеть(перцептрон), проходящий Flappy Bird. Обучение происходит на основе генетического алгоритма.',
            func: () => {
                setActive(3)
            },
            effect: (n) => {
                setWidth3(n)
            },
            image: flappyBird
        },
        {
            title: "Решение ЛНДУ",
            url: "https://github.com/skubivi/ILDESolving",
            description: "Курсовая работа, по решению ЛНДУ. Умеет решать ЛНДУ только если в правой части уравнения находится функция, являющаяся многочленом.",
            func: () => {
                setActive(4)
            },
            image: math
        }
    ]

    type LeftType = () => number
    const left: LeftType = () => {
        const margin: number = 30
        if (current === 0) return 0
        if (current === 1) return -(width0 + margin * 0.5)
        if (current === 2) return -(width0 + width1 + margin * 1.5)
        if (current === 3) return -(width0 + width1 + width2 + margin * 2.5)
        if (current === 4) return -(width0 + width1 + width2 + width3 + margin * 3.5)
    }

    const next: React.MouseEventHandler = (e) => {
        setCurrent(prev => {
            if (prev < 4) return prev + 1
            return 0
        })
    }

    const previous: React.MouseEventHandler = (e) => {
        setCurrent(prev => {
            if (prev === 0) return 4
            return prev - 1
        })
    }

    const projectCards: Array<React.ReactNode> = []
    for (let i = 0; i < projects.length; i++) {
        const currentActive: boolean = active === i
        if (i === 0) 
            projectCards.push(
                <ProjectCard 
                    key={i} 
                    title={projects[i].title} 
                    url={projects[i].url} 
                    description={projects[i].description} 
                    active={currentActive} 
                    image={projects[i].image} 
                    func={projects[i].func}
                    effect={projects[i].effect}
                    left={left()}
                />
            )
        else
            projectCards.push(
                <ProjectCard 
                    key={i} 
                    title={projects[i].title} 
                    url={projects[i].url} 
                    description={projects[i].description} 
                    active={currentActive} 
                    image={projects[i].image} 
                    func={projects[i].func}
                    effect={projects[i].effect}
                />
            )
    }
    for (let i = 0; i < projects.length; i++) {
        const currentActive = active === i
        projectCards.push(
            <ProjectCard 
                key={i + projects.length} 
                title={projects[i].title} 
                url={projects[i].url} 
                description={projects[i].description} 
                active={currentActive} 
                image={projects[i].image} 
                func={projects[i].func}
                effect={projects[i].effect}
            />
        )
    }

    const points: Array<React.ReactNode> = []
    for (let i = 0; i < projects.length; i++) {
        let style = {}
        if (i === current) style = {backgroundColor: 'red'}
        points.push(
            <div className='point' style={style} key={i}/>
        )
    }
    
    return (
        <div className='works'>
            <p className='title'><b>Мои <span>работы</span></b></p>
            <div className='projectContainer'>
                <div className='arrow' onClick={previous}>
                    <span className="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                </div>
                <div className='projectCards'>
                    {projectCards}
                </div>
                <div className='arrow' onClick={next}>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            </div>
            <div className='carousel'>
                {points}
            </div>
        </div>
        
    )
}

export default Works