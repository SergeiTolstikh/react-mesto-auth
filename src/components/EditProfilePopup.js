import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../constexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function changeName(evt) {
        setName(evt.target.value)
    }

    function changeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()

        props.onUpdateUser({
            nameProfile: name,
            aboutProfile: description
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
    }, [props.isOpen, currentUser])

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
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
                        onChange={changeName}
                        value={name}
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
                        onChange={changeDescription}
                        value={description}
                        required
                    />
                    <span className="popup__error popup__info-error" />
                </fieldset>
            </>

        </PopupWithForm>


    )
}

export default EditProfilePopup