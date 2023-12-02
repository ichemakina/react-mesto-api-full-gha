import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `photo-grid__delete-button ${isOwn && 'photo-grid__delete-button_visible'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `photo-grid__like-button ${isLiked && 'photo-grid__like-button_active'}`
    );

    function handleCardClick() {
        { onCardClick(card) }
    }

    function handleLikeClick() {
        { onCardLike(card) }
    }

    function handleDeleteClick() {
        { onDeleteClick(card) }
    }

    return (
        <li className="photo-grid__element">
            <button type="submit" className={cardDeleteButtonClassName} aria-label="Удалить" onClick={handleDeleteClick}></button>
            <img className="photo-grid__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="photo-grid__caption">
                <h2 className="photo-grid__name">{card.name}</h2>
                <div className="photo-grid__likes">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleLikeClick}></button>
                    <p className="photo-grid__count-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;