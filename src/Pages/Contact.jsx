import '../styles/contact.scss'

const Contact = () => {
    return (
        <div className="contact">
            <p>Напиши <font color='red'>мне.</font></p>
            <div className='form'>
                <div className='formHeader'>
                    <textarea className='areaHeader' placeholder='Name' maxLength={25}/>
                    <textarea className='areaHeader' placeholder='Email'maxLength={25}/>
                </div>
                <textarea className='areaBody' placeholder='Subject' maxLength={56}/>
                <textarea className='areaBody' id='message' placeholder='Message'/>
                <button>Отправить</button>
            </div>
        </div>
    )
}

export default Contact