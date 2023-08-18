import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()

    const list = [['home', '', '/'], ['person', '', '/about'], ['overview_key', '', '/works'], ['chat', '', '/contact']]
    for (let i = 0; i < list.length; i++) {
        if (list[i][2] === location.pathname) {
            list[i][1] = 'active'
        }
    }
    const resultList = list.map((element, index) => {
        return (
            <Link key={index} to={element[2]}>
                <div id={element[0]}>
                    <span className={"material-symbols-outlined " + element[1]} id={element[0]}>
                            {element[0]}
                    </span>
                </div>
            </Link>
        )
    })
    return (
        <div className="navbar">
            {resultList}
        </div>
    )
}

export default Navbar