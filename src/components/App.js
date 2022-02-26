import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Authorizacion";
import InfoTooltip from "./InfoTooltip";
import checkOK from "../images/checkOK.svg"
import checkFail from "../images/checkFail.svg"

import api from "../utils/Api";
import { CurrentUserContext } from "../constexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const history = useHistory()
    const [infoTooltip, setInfoTooltip] = React.useState(false)
    const [popupTitle, setPopupTitle] = React.useState('')
    const [popupImage, setPopupImage] = React.useState('')
    const [mailName, setMailName] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loader, setLoader] = React.useState(false)

    
    useEffect(() => { //Проверяем локальное хранилище
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            setLoader(true)
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        setMailName(res.data.email)
                    }
                })
                .catch((err) => {
                    console.log(`Не удалось получить токен: ${err}`)
                })
                .finally(() => { setLoader(false) })
        }
    }, [])


    useEffect(() => {  //Оставаться на главной странице если залогинен
        if (isLoggedIn === true) {
            history.push('/')
        }
    }, [isLoggedIn, history])


    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user)
                setCards(cards)
            })
            .catch((err) => {
                console.log(`Ошибка загрузки данных: ${err}`)
            })
    }, [])


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)

        if (!isLiked) {
            api.putCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(`Ошибка при установке лайка: ${err}`)
                })
        } else {
            api.deleteCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(`Ошибка при отмене лайка: ${err}`)
                })
        }
    }


    function handleDeleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((items) => items.filter((c) => c._id !== card._id && c))
            })
            .catch((err) => {
                console.log(`Ошибка удаления карточки: ${err}`)
            })
    }


    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка обновления профиля: ${err}`)
            })
    }


    function handleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка обновления аватара: ${err}`)
            })
    }


    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка при добавлении карточки: ${err}`)
            })
    }


    function handleCardClick(card) {
        setSelectedCard(card)
    }


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }


    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
        setInfoTooltip(false)
    }


    function handleInfoTooltip() {
        setInfoTooltip(true)
    }


    function onRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setPopupImage(checkOK)
                setPopupTitle("Вы успешно зарегистрировались!")
                history.push('/sign-in')
            })
            .catch(() => {
                setPopupImage(checkFail)
                setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
            })
            .finally(handleInfoTooltip)
    }


    function onLogin(email, password) {
        auth.login(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token)
                setIsLoggedIn(true)
                setMailName(email)
                history.push('/')
            })
            .catch(() => {
                setPopupImage(checkFail)
                setPopupTitle('Не верные имя пользователя или пароль.')
                handleInfoTooltip()
            })
    }


    function onSignOut() {
        localStorage.removeItem("jwt")
        setIsLoggedIn(false)
        setMailName("null")
        history.push("/sign-in")
    }


    return (<CurrentUserContext.Provider value={currentUser} >

        <div className="App" >


            <Switch>

                <Route path="/sign-in">
                    <Header title={loader ? "" : "Регистрация"} route="/sign-up" />
                    <Login onLogin={onLogin} />
                </Route>


                <Route path="/sign-up">
                    <Header title="Войти" route="/sign-in" />
                    <Register onRegister={onRegister} />
                </Route>


                <Route exact path="/">
                    <Header title={isLoggedIn ? "Выйти" : ""} mail={isLoggedIn ? mailName : ""} onClick={onSignOut} route='' />
                    <ProtectedRoute
                        component={Main}
                        isLogged={isLoggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        cards={cards}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                    />
                    <Footer />
                </Route>


                <Route path="*">
                    <Redirect to={isLoggedIn ? "/" : "/sign-in"} />
                </Route>

            </Switch>


            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />


            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />


            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} />


            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />


            <InfoTooltip
                isOpen={infoTooltip}
                title={popupTitle}
                image={popupImage}
                onClose={closeAllPopups} />

        </div>


    </CurrentUserContext.Provider>);
}


export default App;