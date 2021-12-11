import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    function handleSubmit(evt) {
        evt.preventDefault()

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={"avatar"}
            idform={'avatar-popup-form'}
            title={'Обновить аватар'}
            popupid={'popup-avatar'}
            idsubmit={'popup-button-avatar'}
            onSubmit={handleSubmit}
            submit={'Сохранить'}>

            <>
                <fieldset className="popup__input-container">
                    <input
                        ref={avatarRef}
                        type="url"
                        name="avatar"
                        className="popup__input"
                        id="popup__avatar-input"
                        placeholder="Ссылка на аватар"
                        minLength="2"
                        maxLength="200"
                        required
                    />
                    <span className="popup__error popup__error_position popup__avatar-input-error" />
                </fieldset>
            </>

        </PopupWithForm>


    )
}

export default EditAvatarPopup