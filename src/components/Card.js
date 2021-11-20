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
            <img className="gallery__image" src="#" alt="#" onClick={handleClick}/>
            <h2 className="gallery__text"></h2>
            <button className="gallery__like" type="button"></button>
            <p className="gallery__like-counter"></p>

        </div>
        
    )
}

export default Card