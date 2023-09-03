import '../styles/about.scss'

import reactLogo from '../Images/react-2.svg'
import reduxLogo from '../Images/redux.svg'
import jsLogo from '../Images/logo-javascript.svg'
import cssLogo from '../Images/css-3.svg'
import htmlLogo from '../Images/html-1.svg'
import cLogo from '../Images/c.svg'
import javaLogo from '../Images/java.svg'
import androidLogo from '../Images/android.svg'
import pythonLogo from '../Images/python-5.svg'
import djangoLogo from '../Images/django.svg'
import jqueryLogo from '../Images/jquery-1.svg'

import useWindowSize from "../Hooks/useWindowSize";
import AboutCard from '../Components/AboutCard'
import { useEffect, useState } from 'react'

import * as React from 'react';

const About:React.FC = () => {
    const windowSize:WindowSizeType = useWindowSize()

    const [active, setActive] = useState<Array<boolean>>([false, false, false, false, false])

    const [navigationActive, setNavigationActive] = useState<number>(2)

    type SetNewActiveType = (i: number) => void
    const setNewActive: SetNewActiveType = (i) => {
        if(windowSize[0] < 1015)
            setNavigationActive(i)
        if (active[i]) setActive([false, false, false, false, false])
        else {
            setActive(prev => prev.map((element, index) => index === i ? true : false))
        }
    }

    type InfoType = {
        func: React.MouseEventHandler
        title: string,
        text: string,
        images?: Array<string>
    }
    const info: Array<InfoType> = [
        {
            func: (e) => {setNewActive(0)},
            title: '2019 год',
            text: 'В этом году начался мой путь программиста. Первым моим языком стал C++, который я учил по видеоурокам с YouTube канала #SimpleCode.',
            images: [cLogo]
        },
        {
            func: (e) => {setNewActive(1)},
            title: '2020 год',
            text: 'Став студентом университета, я прошёл отбор на дополнительные курсы от Samsung по созданию Android приложений на языке Java.',
            images: [javaLogo, androidLogo]
        },
        {
            func: (e) => {setNewActive(2)},
            title: '2021 год',
            text: 'Решив уйти из университета, я занялся изучением Python. Изучал я его, читая следующие книги: "Укус Питона", "Грокаем Алгоритмы", "Python К вершинам мастерства". После чего приступил к изучению django. На этом этапе началось моё знакомство с Web разработкой.',
            images: [pythonLogo, djangoLogo]
        },
        {
            func: (e) => {setNewActive(3)},
            title: '2022 год',
            text: 'В этом году я решил попроовать создать свой сайт портфолио, на который я хотел заливать интересные для себя проекты. Для бэкенда я использовал django(бэкенда, как такового, на том сайте не оказалось вовсе <3), а для фронтенда было принято решение использовать jQuery, за изучение которого я и принялся',
            images: [pythonLogo, djangoLogo, htmlLogo, jsLogo, jqueryLogo]
        },
        {
            func: (e) => {setNewActive(4)},
            title: '2023 год',
            text: 'После первой пробы создания своего сайта, фронтенд меня довольно сильно заинтересовал и мой глаз пал на React, изучением которого я и занимаюсь, и на котором написан данный сайт. В будущем я планирую начать изучение Next, а также TypeScript',
            images: [reactLogo, reduxLogo, jsLogo, cssLogo, htmlLogo]
        },
    ]

    const infoJSX: Array<React.ReactNode> = []
    for (let i = 0; i < info.length; i++) {
        infoJSX.push(<AboutCard key={i * 2} title={info[i].title} text={info[i].text} active={active[i]} func={info[i].func} images={info[i].images}/>)
        if (active[i] || active[i+1]) {
            infoJSX.push(<hr key={i * 2 + 1} className='activeLine'/>)
        }
        else {
            infoJSX.push(<hr key={i * 2 + 1}/>)
        }
    }
    infoJSX.pop()

    const handleClick: React.MouseEventHandler = (e) => {
        if ((e.target as Element).className === 'cardsContainer') setActive([false, false, false, false, false])
    }

    
    const points: Array<React.ReactNode> = []
    for (let i = 0; i < info.length; i++) {
        let style: {backgroundColor?: string} = {}
        if (i === navigationActive) style = {backgroundColor: 'red'}
        points.push(
            <div className='point' style={style} key={i}/>
        )
    }

    const next: React.MouseEventHandler = (e) => {
        setActive([false, false, false, false, false])
        setNavigationActive(prev => {
            if (prev + 1 >= info.length) return prev
            return prev + 1
        })
    }

    const prev: React.MouseEventHandler = (e) => {
        setActive([false, false, false, false, false])
        setNavigationActive(prev => {
            if (prev - 1 >= info.length) return prev
            return prev - 1
        })
    }

    const elementWidth: number = 90
    const activeElementWidth: number = 300
    const hrWidth: number = 40;
    const activeHrWidth: number = 1000
    let currentActive: number = -1
    for (let i = 0; i < info.length; i++) {
        if (active[i]) {
            currentActive = i
            break
        }
    }

    type GetLeftType = () => number
    const getLeft: GetLeftType = () => {
        if (currentActive < 0 && navigationActive === 2) return -1
        if (currentActive < 0) {
            let result = navigationActive * (elementWidth + hrWidth) + elementWidth / 2
            return result
        }
        let result = currentActive * (elementWidth + hrWidth) + activeElementWidth / 2
        if (currentActive > 0) result += activeHrWidth - hrWidth
        return result
    }
    let style: {transform?: string} = {}
    if (getLeft() > 0) {
        style = {
            transform: 'translateX(' + -getLeft() + 'px)'
        }
    }

    const windowWidth: number = windowSize[0]
    useEffect(() => {
        setActive([false, false, false, false, false])
        setNavigationActive(2)
    }, [windowWidth])
    

    return (
        <div className='about'>
            <div className='cardsContainer' onClick={handleClick} style={style}>
                {infoJSX}
            </div>
            <div className={'navigation' + (currentActive === -1 ? '' : 'disable')}>
                <div className='arrow'>
                    <span className="material-symbols-outlined" onClick={prev}>
                        arrow_back_ios
                    </span>
                </div>
                {points}
                <div className='arrow'>
                    <span className="material-symbols-outlined" onClick={next}>
                        arrow_forward_ios
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About