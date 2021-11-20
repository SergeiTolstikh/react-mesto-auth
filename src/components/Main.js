//import api from "../utils/Api";
import Card from "./Card";
function Main(props) {
    return (

        <main className="content">

            <section className="profile">

                <img src="#" className="profile__image" alt="Изображение профиля" />
                <button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar" title="Сменить аватар"></button>
                <h1 className="profile__title">Жак-Ив Кусто</h1>
                <button onClick={props.onEditProfile} type="button" title="Редактировать профиль" className="profile__edit-button"></button>
                <p className="profile__subtitle">исследователь океана</p>
                <button onClick={props.onAddPlace} type="button" title="Новое место" className="profile__add-button"></button>

            </section>


            <section className="gallery">
                <Card
                    onCardClick={props.onCardClick}
                    onCardDelete={props.onCardDelete} />
            </section>


        </main>)

    //function handleEditAvatarClick() { document.querySelector('#popup-avatar').classList.add('popup_opened') }

    //function handleEditProfileClick() { document.querySelector('#profile-popup').classList.add('popup_opened') }

    //function handleAddPlaceClick() { document.querySelector('#gallery-popup').classList.add('popup_opened') }




}

export default Main