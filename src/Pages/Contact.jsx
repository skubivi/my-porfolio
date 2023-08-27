import { useState } from 'react'
import '../styles/contact.scss'
import emailjs from 'emailjs-com'

const Contact = () => {
    const initialState = {
        from_name: '',
        from_email: '',
        email_subject: '',
        message: ''
    }
    const [data, setData] = useState(initialState)
    const [alert, setAlert] = useState('')

    const send = (e) => {
        e.preventDefault()
        emailjs.sendForm('service_107kr56', 'template_ln5dgmy', e.target, 'mcZ3KFKg2_99Q-qhx')
            .then((res) => {
                setAlert('Сообщение успешно доставлено')
                setTimeout(() => {
                    setAlert('')
                }, 3000)
            }, (error) => {
                setAlert('Что-то пошло не так')
                setTimeout(() => {
                    setAlert('')
                }, 3000)
            })
    }

    const handleInputChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div className="contact">
            <p><b>Напиши <font color='red'>мне</font></b></p>
            <form className='form' onSubmit={send}>
                <div className='formHeader'>
                    <textarea className='areaHeader' placeholder='Name' name='from_name' maxLength={25} value={data.from_name} onChange={handleInputChange}/>
                    <textarea className='areaHeader' placeholder='Email' name='from_email' maxLength={25} value={data.from_email} onChange={handleInputChange}/>
                </div>
                <textarea className='areaBody' placeholder='Subject' maxLength={56} name='email_subject' value={data.email_subject} onChange={handleInputChange}/>
                <textarea className='areaBody' id='message' placeholder='Message' name='message' value={data.message} onChange={handleInputChange}/>
                <input type='submit' value='Отправить' className='btn'/>
            </form>
            <div className={'alert' + (alert === '' ? ' disable' : '')}>
                {alert}
            </div>
        </div>
    )
}

export default Contact