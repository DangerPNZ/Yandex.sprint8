import Popup from './Popup';

// константы, которые должны быть переопределены при переносе класса в другой проект
const popupSelector = '.popup_type_image';
const descriptionSelector = '.popup__caption';
const imageCSSCls = 'popup__image';
const prevImageElementSelector = '.popup_type_image .popup__close';

export default class PopupWithImage extends Popup {
  constructor(imgDescription, imgSrc) {
    super(popupSelector);
    this._popupElement = document.body.querySelector(popupSelector); 
    this._descriptionElement = this._popupElement.querySelector(descriptionSelector);
    this._imageSrc = imgSrc;
    this._imageDescription = imgDescription;
  }
  open() {
    this._descriptionElement.textContent = this._imageDescription;
    let image = this._popupElement.querySelector(`.${imageCSSCls}`);
    if (image) {
      image.src = this._imageSrc;
      image.alt = this._imageDescription;
    } else {
      image = document.createElement('img');
      image.classList.add(imageCSSCls);
      image.src = this._imageSrc;
      image.alt = this._imageDescription;
      document.querySelector(prevImageElementSelector)
        .insertAdjacentElement('afterend', image);
    }  
    super.open();
  }
}