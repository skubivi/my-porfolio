import { useLocation } from "react-router-dom";

import * as React from 'react';

type NavbarType = {
    active: boolean
    transition: TransitionFuncType
}

const Navbar: React.FC<NavbarType> = ({active, transition}) => {
    const location: LocationState = useLocation()

    const list: Array<Array<string>> = [['home', '', '/'], ['person', '', '/about'], ['overview_key', '', '/works'], ['chat', '', '/contact']]
    for (let i = 0; i < list.length; i++) {
        if (list[i][2] === location.pathname) {
            list[i][1] = 'active'
        }
    }

    const handleClick: React.MouseEventHandler = (e) => {
        if(active) {
            for (let i = 0; i < list.length; i++) {
                if (list[i][0] === (e.target as Element).id && location.pathname !== list[i][2])
                    transition(list[i][2])
            }
        }
    }

    const resultList: Array<React.ReactNode> = list.map((element: Array<string>, index: number) => {
        return (
            <div key={index} id={element[0]} onClick={handleClick}>
                <span className={"material-symbols-outlined " + element[1]} id={element[0]}>
                        {element[0]}
                </span>
            </div>
        )
    })

    return (
        <div className="navbar">
            {resultList}
        </div>
    )
}

export default Navbar