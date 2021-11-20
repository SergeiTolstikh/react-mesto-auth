import React, { useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";
function Main(props) {

    const [userAvatar, setUserAvatar] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');

    const [cards, setCards] = React.useState([])
    useEffect(() => {
        api.getPageInfo()
            .then(([user, cards]) => {
                setUserAvatar(user.avatar);
                setUserName(user.name);
                setUserDescription(user.about);
                setCards(cards);
            })
            .catch((err) => { console.log(`Ошибка загрузки: ${err}`) })
    }, [])

    return (

        <main className="content">

            <section className="profile">

                <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__image"  />
                <button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar" title="Сменить аватар"></button>
                <h1 className="profile__title">{userName}</h1>
                <button onClick={props.onEditProfile} type="button" title="Редактировать профиль" className="profile__edit-button"></button>
                <p className="profile__subtitle">{userDescription}</p>
                <button onClick={props.onAddPlace} type="button" title="Новое место" className="profile__add-button"></button>

            </section>


            <section className="gallery">

                {cards.map((card, id) => (
                    <Card
                        key={id}
                        card={card}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>


        </main>)

    //function handleEditAvatarClick() { document.querySelector('#popup-avatar').classList.add('popup_opened') }

    //function handleEditProfileClick() { document.querySelector('#profile-popup').classList.add('popup_opened') }

    //function handleAddPlaceClick() { document.querySelector('#gallery-popup').classList.add('popup_opened') }
}

export default Main