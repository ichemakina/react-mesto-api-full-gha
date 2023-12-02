import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({ card, isOpen, onClose, submitButtonText, onCardDelete }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isOpen} onClose={onClose} submitButtonText={submitButtonText} onSubmit={handleSubmit} />
    )
}

export default PopupWithConfirm;