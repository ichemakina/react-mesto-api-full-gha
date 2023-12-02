import { Link } from "react-router-dom";

function AuthForm({ title, name, submitButtonText, children, onSubmit, isRegisterForm }) {
    return (
        <div className="form-container">
            <h2 className="popup__title popup__title_type_auth">{title}</h2>
            <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                {children}
                <button type="submit" className="popup__submit-button popup__submit-button_type_auth">{submitButtonText || 'Сохранить'}</button>
            </form>
            {isRegisterForm &&
                <div className="form-container__register-signing">
                    <p className="form-container__already-register">Уже зарегистрированы?</p>
                    <Link to="../sign-in" className="form-container__login-link">Войти</Link>
                </div>}
        </div>
    );
}

export default AuthForm;