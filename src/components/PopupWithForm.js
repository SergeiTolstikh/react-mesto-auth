function PopupWithForm(props) {
    return (
        <div id={props.popupid} className={`popup ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <form className={`popup__form ${props.name}`}   name={props.form} id={props.idform} novalidate>
                    <button type="button" className="popup__close" title="Закрыть форму без сохранения" onClick={props.onClose} />
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" id={props.idsubmit} className="popup__button"
                        title="Сохранить изменения">{props.submit}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm