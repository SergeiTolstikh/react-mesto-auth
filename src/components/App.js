import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../constexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setisDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])


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

  function handleDeleteCardClick() {
    setisDeleteCardPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisDeleteCardPopupOpen(false)
    setSelectedCard(null)
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App" style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteCardClick}
          onCardLike={handleCardLike}
        />
        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name={"profile"}
          idform={'profile-popup-form'}
          title={'Редактировать профиль'}
          popupid={'profile-popup'}
          idsubmit={'popup-button-profile'}
          submit={'Сохранить'}>

          <>
            <fieldset className="popup__input-container">
              <input
                type="text"
                name="nameProfile"
                className="popup__input popup__input_item_name-profile-input"
                id="popup__nickname"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="popup__error popup__nickname-error" />
              <input
                type="text"
                name="aboutProfile"
                className="popup__input popup__input_item_about-profile-input"
                id="popup__info"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="popup__error popup__info-error" />
            </fieldset>
          </>

        </PopupWithForm>

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name={"gallery"}
          idform={'gallery-popup-form'}
          title={'Новое место'}
          popupid={'gallery-popup'}
          idsubmit={'popup-button-gallery'}
          submit={'Создать'}>

          <>
            <fieldset className="popup__input-container">
              <input
                type="text"
                name="name"
                className="popup__input popup__input_item_name-profile-input"
                id="popup__newplace"
                placeholder="Название"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="popup__error popup__newplace-error" />
              <input
                type="url"
                name="link"
                className="popup__input popup__input_item_url-gallery-input"
                id="popup__picture"
                placeholder="Ссылка на картинку"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="popup__error popup__picture-error" />
            </fieldset>
          </>

        </PopupWithForm>

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name={"avatar"}
          idform={'avatar-popup-form'}
          title={'Обновить аватар'}
          popupid={'popup-avatar'}
          idsubmit={'popup-button-avatar'}
          submit={'Сохранить'}>

          <>
            <fieldset className="popup__input-container">
              <input
                type="url"
                name="avatar"
                className="popup__input"
                id="popup__avatar-input"
                placeholder="Ссылка на аватар"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="popup__error popup__error_position popup__avatar-input-error" />
            </fieldset>
          </>

        </PopupWithForm>

        <PopupWithForm
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          name={"confirm"}
          idform={'confirm-popup-form'}
          title={'Вы уверены?'}
          popupid={'popup-delete-confirm'}
          idsubmit={'popup-button-delete-confirm'}
          submit={'Да'}
        />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
