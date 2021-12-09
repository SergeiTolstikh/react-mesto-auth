import React from "react";
import { CurrentUserContext } from "../constexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id
    const isLiked = props.card.likes.some(i => i._id === currentUser._id)

    const cardDeleteButtonClassName = (
        `gallery__delete-card ${isOwn ? 'gallery__delete-card_visible' : 'gallery__delete-card_hidden'}`
    );

    const cardLikeButtonClassName = (`gallery__like ${isLiked ? 'gallery__like_on' : ''}`)

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <div className="gallery__card">

            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
            <div className="gallery__image" onClick={handleClick} style={{ backgroundImage: `url(${props.link})` }} />
            <h2 className="gallery__text">{props.name}</h2>
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="gallery__like-counter">{props.likes}</p>

        </div>

    )
}

export default Card