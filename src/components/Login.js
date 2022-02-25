import { useState } from "react";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onLogin(email, password)
    }

    function handleMailInput(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value)
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" placeholder="Email" type="email" onChange={handleMailInput} required></input>
                    <input className="login__input" placeholder="Пароль" type="password" onChange={handlePasswordInput} required></input>
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </section>
        </>
    )
}

export default Login