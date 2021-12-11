import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleAddTitle(evt) {
        setTitle(evt.target.value)
    }
    function handleAddLinkPicture(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()

        props.onAddPlace({
            name: title,
            link: link
        })
    }

    React.useEffect(() => {
        if (props.isOpen) {
            setTitle('')
            setLink('')
        }
    }, [props.isOpen])

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={"gallery"}
            idform={'gallery-popup-form'}
            title={'Новое место'}
            popupid={'gallery-popup'}
            idsubmit={'popup-button-gallery'}
            submit={'Создать'}
            onSubmit={handleSubmit}
            onOverlayClick={props.onOverlayClick}>

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
                        value={title}
                        onChange={handleAddTitle}
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
                        onChange={handleAddLinkPicture}
                        value={link}
                    />
                    <span className="popup__error popup__picture-error" />
                </fieldset>
            </>

        </PopupWithForm>
    )
}

export default AddPlacePopup