const AboutCard = ({title, text, active, func, images}) => {
    const imagesJSX = []
    console.log(images);
    if (images) {
        for (let i = 0; i < images.length; i++) {
            imagesJSX.push(<img key={i} src={images[i]} alt=""/>)
        }
    }
    console.log(imagesJSX);
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