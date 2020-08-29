import Popup from './Popup';
/*
Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:

- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
- Перезаписывает родительский метод `setEventListeners`. 
Метод `setEventListeners` класса `PopupWithForm` должен не только добавлять обработчик клика иконке закрытия, 
но и добавлять обработчик сабмита формы.
- Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
*/

// константы, которые должны быть переопределены при переносе класса в другой проект
const popupFormSelector = '.popup__form';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupElement = document.body.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector(popupFormSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._getInputValues = this._getInputValues.bind(this);
  }
  _getInputValues() {
    return new FormData(this._formElement);
  }
  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  close() {
    // console.log(this._getInputValues().get('place-name'))
    this._formElement.reset();
    super.close();
  }
}