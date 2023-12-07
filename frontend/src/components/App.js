import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { checkToken, register, authorize } from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [deleteCardPopup, setDeleteCardPopup] = useState({ isOpen: false, card: {} });

  const [selectedCard, setSelectedCard] = useState(null);

  const [submitButtonText, setSubmitButtonState] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, isSuccess: false });

  const navigate = useNavigate();

  useEffect(() => {
    function handleTokenCheck() {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        checkToken(token)
          .then((data) => {
            setLoggedIn(true);
            setUserName(data.email);
            navigate("/", { replace: true });
          })
          .catch(console.error);
      }
    }

    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleRegister(email, password) {
    register(email, password)
      .then((data) => {
        setInfoTooltip({ isOpen: true, isSuccess: true });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setInfoTooltip({ isOpen: true, isSuccess: false });
      });
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserName(email);
          navigate('/', { replace: true });
        }
      })
      .catch(console.error);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setSubmitButtonState('Сохранить');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setSubmitButtonState('Сохранить');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setSubmitButtonState('Создать');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopup({ isOpen: false, card: {} });
    setInfoTooltip({ isOpen: false, isSuccess: false });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleDeleteClick(card) {
    setDeleteCardPopup({ isOpen: true, card: card });
    setSubmitButtonState('Да');
  }

  function handleCardDelete(card) {
    setSubmitButtonState('Удаление...');
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setSubmitButtonState('Да');
      });
  }

  function handleUpdateUser(userInfo) {
    setSubmitButtonState('Сохранение...');
    api.updateUserInfo(userInfo)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setSubmitButtonState('Сохранить');
      });
  }

  function handleUpdateAvatar(avatarLink) {
    setSubmitButtonState('Сохранение...');
    api.updateUserAvatar(avatarLink)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setSubmitButtonState('Сохранить');
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    setSubmitButtonState('Создание...');
    api.addNewCard(cardInfo)
      .then(result => {
        setCards((state) => [result, ...state]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setSubmitButtonState('Создать');
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sign-up" element={(
            <>
              <Header>
                <nav className="header__navbar">
                  <Link to="/sign-in" className="header__navbar-link">Войти</Link>
                </nav>
              </Header>
              <Register handleRegister={handleRegister} submitButtonText={"Зарегистрироваться"}></Register>
            </>
          )}>
          </Route>
          <Route path="/sign-in" element={(
            <>
              <Header>
                <nav className="header__navbar">
                  <Link to="/sign-up" className="header__navbar-link">Регистрация</Link>
                </nav>
              </Header>
              <Login handleLogin={handleLogin} submitButtonText={"Войти"}></Login>
            </>
          )}>
          </Route>
          <Route path="/" element={
            <ProtectedRoute path="/" loggedIn={loggedIn} element={(
              <>
                <Header>
                  <nav className="header__navbar">
                    <p className="header__username">{username}</p>
                    <button type="button" onClick={handleLogout} className="header__navbar-link">Выйти</button>
                  </nav>
                </Header>
                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onDeleteClick={handleDeleteClick} />
                <Footer />
              </>
            )}>
            </ProtectedRoute>}>
          </Route>
        </Routes>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} submitButtonText={submitButtonText} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} submitButtonText={submitButtonText} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} submitButtonText={submitButtonText} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithConfirm card={deleteCardPopup.card} title="Вы уверены?" isOpen={deleteCardPopup.isOpen} onClose={closeAllPopups} submitButtonText={submitButtonText} onCardDelete={handleCardDelete} />
        <InfoTooltip isOpen={infoTooltip.isOpen} isSuccess={infoTooltip.isSuccess} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
