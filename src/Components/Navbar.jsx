import { useLocation } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation()

    const list = [['home', '', '/'], ['person', '', '/about'], ['overview_key', '', '/works'], ['chat', '', '/contact']]
    for (let i = 0; i < list.length; i++) {
        if (list[i][2] === location.pathname) {
            list[i][1] = 'active'
        }
    }

    const handleClick = (e) => {
        if(props.active) {
            for (let i = 0; i < list.length; i++) {
                if (list[i][0] === e.target.id && location.pathname !== list[i][2])
                    props.handleClick(list[i][2])
            }
        }
    }

    const resultList = list.map((element, index) => {
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