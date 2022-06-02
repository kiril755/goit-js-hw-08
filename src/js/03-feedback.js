import throttle from 'lodash.throttle';

const FEEDBACK_LOCALSTORAGE = 'localstorage';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const formData = {};

getMessage();

function onFormSumbit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_LOCALSTORAGE);
  console.log(formData);
}

function getMessage() {
  const localMessage = localStorage.getItem(FEEDBACK_LOCALSTORAGE);
  const getParse = JSON.parse(localMessage);
  if (localMessage) {
    refs.input.value = getParse.email;
    refs.textarea.value = getParse.message;
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_LOCALSTORAGE, JSON.stringify(formData));
}
