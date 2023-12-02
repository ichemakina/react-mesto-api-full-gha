function ImagePopup({ card, onClose }) {
    return (
        <div className={card ? "popup popup_type_card-img popup_opened" : "popup popup_type_card-img"}>
            <div className="popup__card-img-content">
                <button onClick={onClose} type="button" className="popup__close-button popup__close-button_form_card-img"
                    aria-label="Закрыть"></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={card?.link} alt={card?.name} />
                    <figcaption className="popup__caption">{card?.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;