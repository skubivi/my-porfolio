const Transition = (props) => {
    const className = 'transition' + (props.slideout ? ' transition-out' : '')
    const styleObj = {
        zIndex: props.index + '',
        backgroundColor: props.color
    }
    return (
        <div className={className} style={styleObj}>

        </div>
    )
}

export default Transition