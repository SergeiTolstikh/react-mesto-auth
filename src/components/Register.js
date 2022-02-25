import { useState } from 'react'
import { Link } from "react-router-dom";
function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleMailInput(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onRegister(email, password)
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" placeholder="Email" type="email" onChange={handleMailInput} required></input>
                    <input className="login__input" placeholder="Пароль" type="password" onChange={handlePasswordInput} required></input>
                    <button type="submit" className="login__button">Зарегистрироваться</button>
                </form>
                <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
            </section>
        </>
    )
}

export default Register