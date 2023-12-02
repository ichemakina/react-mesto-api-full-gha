import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, submitButtonText, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm title="Новое место" name="add-card" isOpen={isOpen} onClose={onClose} submitButtonText={submitButtonText} onSubmit={handleSubmit}>
            <label className="popup__label">
                <input className="popup__field popup__field_type_card-name" type="text" placeholder="Название"
                    name="name" id="card-name-field" required minLength="2" maxLength="30" value={name} onChange={handleNameChange} />
                <span className="popup__field-error card-name-field-error"></span>
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_type_card-img-link" type="url"
                    placeholder="Ссылка на картинку" name="link" id="card-img-link-field" required value={link} onChange={handleLinkChange} />
                <span className="popup__field-error card-img-link-field-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;