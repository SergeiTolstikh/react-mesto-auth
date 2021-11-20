import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
      }

    return (
        <div className="gallery__card">

            <button className="gallery__delete-card" type="button" onClick={handleCardDelete}></button>
            <div className="gallery__image" onClick={handleClick} style={{ backgroundImage: `url(${props.link})` }}/>
            <h2 className="gallery__text">{props.name}</h2>
            <button className="gallery__like" type="button"></button>
            <p className="gallery__like-counter">{props.likes}</p>

        </div>
        
    )
}

export default Card