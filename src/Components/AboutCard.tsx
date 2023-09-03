import * as React from 'react';

export type AboutCardType = {
    title: string
    text: string
    active: boolean
    func: React.MouseEventHandler
    images?: Array<string>
}

const AboutCard: React.FC<AboutCardType> = ({title, text, active, func, images}: AboutCardType) => {
    const imagesJSX: Array<React.ReactNode> = []
    if (images) {
        for (let i = 0; i < images.length; i++) {
            imagesJSX.push(<img key={i} src={images[i]} alt=""/>)
        }
    }

    return (
        <div className={"round" + (active ? ' active': '')} onClick={func}>
            <div className="title">
                {title}
            </div>
            <div className="body">
                <p className="text">
                    {text}
                </p>
                <p className="stack">Стэк</p>
                <hr />
                <div className="images">
                    {imagesJSX}
                </div>
            </div>
        </div>
    )
}

export default AboutCard