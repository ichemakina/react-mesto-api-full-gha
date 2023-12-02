import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, submitButtonText, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isOpen} onClose={onClose} submitButtonText={submitButtonText} onSubmit={handleSubmit}>
            <label className="popup__label">
                <input className="popup__field popup__field_type_name" type="text" placeholder="Имя" name="name"
                    id="name-field" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} />
                <span className="popup__field-error name-field-error"></span>
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_type_description" type="text" placeholder="О себе"
                    name="about" id="description-field" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} />
                <span className="popup__field-error description-field-error"></span>
            </label>
        </PopupWithForm>)
}

export default EditProfilePopup;