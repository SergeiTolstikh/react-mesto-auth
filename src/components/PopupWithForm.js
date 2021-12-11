function PopupWithForm(props) {
    return (
        <div id={props.popupid} className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <form className={`popup__form popup__form_${props.name}`}   name={`${props.name}-form`} id={props.idform} onSubmit={props.onSubmit} noValidate>
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