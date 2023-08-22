const Header = () => {
    return (
        <div className="header">
            <div>
                <p id="name"><b>Степан</b></p>
                <p id="surname">Васильев</p>
                <p style={{color: 'red'}}>.</p>
            </div>
            <div>
                <a href="https://vk.com/miracleme10k" target="_blank"><i className="fa fa-vk" style={{color: 'white'}}></i></a>
                <a href="https://t.me/skubivi" target="_blank"><i className="fa fa-telegram" style={{color: 'white'}}></i></a>
            </div>
        </div>
    )
}

export default Header