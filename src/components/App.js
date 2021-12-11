import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../constexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
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


  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Не удалось обновить профиль: ${err}`)
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
        .then((newAvatar) => {
          setCurrentUser(newAvatar)
          closeAllPopups()
        })
        .catch((err) => {
            console.log(`Не удалось обновить аватар: ${err}`)
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
        />
        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
