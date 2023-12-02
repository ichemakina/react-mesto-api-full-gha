import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__person-info">
                    <div className="profile__avatar">
                        <img className="profile__image" alt="Фотография пользователя" src={currentUser.avatar} />
                        <button onClick={onEditAvatar} type="button" className="profile__edit-avatar-button" aria-label="Обновить аватар"></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
            </section>
            <section className="photo-grid">
                <ul className="photo-grid__elements">
                    {
                        cards.map((card) => {
                            return (
                                <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onDeleteClick={onDeleteClick} />
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;