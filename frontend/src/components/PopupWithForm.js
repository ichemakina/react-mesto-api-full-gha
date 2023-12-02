function PopupWithForm({ title, name, isOpen, onClose, submitButtonText, children, onSubmit }) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className={`popup__close-button popup__close-button_form_${name}`}
                    aria-label="Закрыть"></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit-button">{submitButtonText || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;