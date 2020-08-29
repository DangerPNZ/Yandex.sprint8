import PopupWithImage from './PopupWithImage';

export default class Card extends PopupWithImage {
  constructor({name, link}, cardSelector, handleCardClick) {
    super(name, link);
    this._text = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._likeBtnElement = this._element.querySelector('.card__like-button');
    this._imageElement = this._element.querySelector('.card__image');
    this._deleteBtnElement = this._element.querySelector('.card__delete-button');
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this._handleLikeIcon = this._handleLikeIcon.bind(this);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._likeBtnElement.addEventListener('click', this._handleLikeIcon);
    this._deleteBtnElement.addEventListener('click', this._handleDeleteCard);
    this._imageElement.addEventListener('click', this._handleCardClick); // this._handlePreviewPicture()
  }
  _removeEventListeners() {
    this._likeBtnElement.removeEventListener('click', this._handleLikeIcon);
    this._deleteBtnElement.removeEventListener('click', this._handleDeleteCard);
    this._imageElement.removeEventListener('click', this._handleCardClick);
  }
  _handleLikeIcon() {
    this._element.querySelector('.card__like-button').
      classList.toggle('card__like-button_is-active');
  }

  _handleDeleteCard() {
    this._removeEventListeners();
    this._element.remove();
    // Посоветовать занулять элемент
    this._element = null;
  }

  getView() {
    // Публичный метод, возвращащий представление карточки;
    this._setEventListeners();
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._text;
    return this._element;
  }
}
