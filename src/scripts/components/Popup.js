const ESCAPE_BTN_KEY = 'Escape';

// константы, которые должны быть переопределены при переносе класса в другой проект
const popupShowCSSCls = 'popup_is-opened';
const popupCloseBtnCSSCls = 'popup__close';
const popupContainerCSSCls = 'popup';

export default class Popup {
  constructor (popupSelector) {
    this._popupElement = document.body.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  _handleEscClose(event) {
    if (event.key === ESCAPE_BTN_KEY) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener('click', (event) => {
      if (event.target.classList.contains(popupCloseBtnCSSCls)|| event.target.classList.contains(popupContainerCSSCls)) this.close();
    });
  }
  open() {
    /* 
    обработчик вешается тут ввиду противоречия в чек-листе и задании
    ничего не сказано о том, что метод должен иметь метод removeEventListeners
    и зачем тогда setEventListeners в публичных методах
     */
    window.addEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.add(popupShowCSSCls);
  }
  close() {
    /* 
    обработчик вешается тут ввиду противоречия в чек-листе и задании
    ничего не сказано о том, что метод должен иметь метод removeEventListeners
    и зачем тогда setEventListeners в публичных методах
     */
    window.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove(popupShowCSSCls);
  }
}