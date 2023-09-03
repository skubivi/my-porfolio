import * as React from 'react';

const Header: React.FC = () => {
    return (
        <div className="header">
            <div>
                <p><b>СТЕПАН </b>ВАСИЛЬЕВ<span>.</span></p>
            </div>
            <div>
                <a href="https://vk.com/miracleme10k" target="_blank"><i className="fa fa-vk"></i></a>
                <a href="https://t.me/skubivi" target="_blank"><i className="fa fa-telegram"></i></a>
            </div>
        </div>
    )
}

export default Header