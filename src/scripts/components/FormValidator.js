// константы, которые должны быть переопределены при переносе класса в другой проект
const formSubmitBtnSelector = '.popup__button';
const sendBtnDisabledCls = 'popup__button_disabled';
const errorInputCSSCls = 'popup__input_type_error';
const errorVisibleCSSCls = 'popup__error_visible';

export default class FormValidator {
  constructor(formName, formElements) {
    this.formName = formName;
    this._formElements = formElements;
    this._formElement = document.body.querySelector(`form[name="${formName}"]`);
    this._formSubmitBtn = this._formElement.querySelector(`${formSubmitBtnSelector}`);
    this._handleInputValidityState = this._handleInputValidityState.bind(this);
  }
  _checkInputValidity(inputElement) {
    const errorDescriptionElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, errorDescriptionElement);
    } else {
      this._hideInputError(inputElement, errorDescriptionElement);
    }
  }

  _showInputError(inputElement, errorMessage, descriptionElement) {
    inputElement.classList.add(errorInputCSSCls);
    descriptionElement.textContent = errorMessage;
    descriptionElement.classList.add(errorVisibleCSSCls);
  }

  _hideInputError(inputElement, descriptionElement) {
    inputElement.classList.remove(errorInputCSSCls);
    descriptionElement.textContent = '';
    descriptionElement.classList.remove(errorVisibleCSSCls);
  }
  getValidityState() {
    return this._formElements.every((name) => document.forms[this.formName].elements[name].validity.valid);
  }
  sendBtnStateControl() {
    if (this.getValidityState()) {
      this._formSubmitBtn.classList.remove(sendBtnDisabledCls);
      this._formSubmitBtn.disabled = false;
      return;
    }
    this._formSubmitBtn.classList.add(sendBtnDisabledCls);
    this._formSubmitBtn.disabled = true;
  }
  _handleInputValidityState(event) {
    this.sendBtnStateControl();
    this._checkInputValidity(event.currentTarget);
  }
  _addEventListeners() {
    this._formElements.forEach((name) => {
      document.forms[this.formName].elements[name]
        .addEventListener('input', this._handleInputValidityState)
    });
  }
  setValidityControl() {
    this.sendBtnStateControl();
    this._addEventListeners();
  }
}
