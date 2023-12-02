import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, submitButtonText, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isOpen} onClose={onClose} submitButtonText={submitButtonText} onSubmit={handleSubmit}>
            <label className="popup__label">
                <input className="popup__field popup__field_type_avatar-link" type="url"
                    placeholder="Ссылка на новый аватар" name="avatar" id="avatar-link-field" required ref={avatarRef} />
                <span className="popup__field-error avatar-link-field-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;