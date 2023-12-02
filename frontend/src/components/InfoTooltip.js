import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";

function InfoTooltip({ isSuccess, isOpen, onClose }) {
    return (
        <div className={isOpen ? "popup popup_opened" : "popup"}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className={`popup__close-button`}
                    aria-label="Закрыть"></button>
                <div className="info-tooltip">
                    <img className="info-tooltip__icon" src={isSuccess ? successIcon : failIcon} alt={isSuccess ? "Черная галочка в кружочке" : "Красный крестик в кружочке"}></img>
                    <p className="info-tooltip__message">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;