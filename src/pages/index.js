import Card from '../scripts/components/Card';
import PopupWithImage from '../scripts/components/PopupWithImage';
import UserInfo from '../scripts/components/UserInfo';
import PopupWithForm from '../scripts/components/PopupWithForm';
import Section from '../scripts/components/Section';
import FormValidator from '../scripts/components/FormValidator';
import './index.css';

// селекторы для аргументов классов
const cardContainerSelector = '.places__list';
const profileNameSelector = '.profile__title';
const profileInfoSelector = '.profile__description';
const editProfileModalSelector = '.popup_type_edit';
const newPlaceModalSelector = '.popup_type_new-card';
const cardSelector = '.card-template';
// form names
const FormName = {
  EDIT_USER_DATA: 'edit-profile',
  ADD_CARD: 'new-place'
};
// fieldsNames
const FieldName = {
  USER_NAME: 'name',
  USER_DESCRIPTION: 'description',
  PLACE_NAME: 'place-name',
  IMG_LINK: 'link'
};

const FormFields = {
  [FormName.EDIT_USER_DATA]: [FieldName.USER_NAME, FieldName.USER_DESCRIPTION],
  [FormName.ADD_CARD]: [FieldName.PLACE_NAME, FieldName.IMG_LINK]
};

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// // Врапперы
const editFormModalWindow = document.querySelector(editProfileModalSelector);
// С submit ребята еще плохо работают.

// DOM узлы профиля
const profileTitle = document.querySelector(profileNameSelector);
const profileDescription = document.querySelector(profileInfoSelector);
// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');

const editFormValidator = new FormValidator(FormName.EDIT_USER_DATA, FormFields[FormName.EDIT_USER_DATA]);
const addCardFormValidator = new FormValidator(FormName.ADD_CARD, FormFields[FormName.ADD_CARD]);
editFormValidator.setValidityControl();
addCardFormValidator.setValidityControl();

const formEditSubmitHandler = (formData) => {
  if (editFormValidator.getValidityState()) {
    userInfo.setUserInfo({
      name: formData.get(FieldName.USER_NAME),
      info: formData.get(FieldName.USER_DESCRIPTION)
    });
    profileTitle.textContent = formData.get(FieldName.USER_NAME);
    profileDescription.textContent = formData.get(FieldName.USER_DESCRIPTION);
    editFormModal.close();
    editFormValidator.sendBtnStateControl();
  }
};

const cardFormSubmitHandler = (formData) => {
  if (addCardFormValidator.getValidityState()) {
    cardSection.addItem(renderCard(
      {
        name: formData.get(FieldName.PLACE_NAME),
        link: formData.get(FieldName.IMG_LINK)
      }
    ));
    newPlaceAddModal.close();
    addCardFormValidator.sendBtnStateControl();
  }
};

const userInfo = new UserInfo(profileNameSelector, profileInfoSelector);
const editFormModal = new PopupWithForm(editProfileModalSelector, formEditSubmitHandler);
const newPlaceAddModal = new PopupWithForm(newPlaceModalSelector, cardFormSubmitHandler);
editFormModal.setEventListeners();
newPlaceAddModal.setEventListeners();


const renderCard = (data) => {
  const popup = new PopupWithImage(data.name, data.link);
  popup.setEventListeners();
  const onCardImageClick = () => popup.open();
  return new Card(data, cardSelector, onCardImageClick).getView();
};
const cardSection = new Section({
  items: initialCards, 
  renderer: renderCard
}, cardContainerSelector);

// EventListeners
openEditFormButton.addEventListener('click', () => {
  const {name, info} = userInfo.getUserInfo();
  titleInputValue.value = name;
  descriptionInputValue.value = info;
  editFormModal.open();
});
openCardFormButton.addEventListener('click', () => {
  newPlaceAddModal.open();
});

// Инициализация
cardSection.renderItemsList();

