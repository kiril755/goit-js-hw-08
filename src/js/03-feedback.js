import throttle from 'lodash.throttle';

const FEEDBACK_LOCALSTORAGE = 'localstorage';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSumbit);
refs.input.addEventListener('input', throttle(onFormInput, 500));
refs.textarea.addEventListener('input', throttle(onFormInput, 500));

const formData = {};

function onFormSumbit(e) {
  e.preventDefault();

  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert('Please fill in all fields!');
  }
  const inputData = {
    email: e.currentTarget.email.value,
    message: e.currentTarget.message.value,
  };
  console.log(inputData);
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_LOCALSTORAGE);
}

function getMessage() {
  const localMessage = localStorage.getItem(FEEDBACK_LOCALSTORAGE);
  if (localMessage) {
    const getParse = JSON.parse(localMessage);
    refs.input.value = getParse.email;
    refs.textarea.value = getParse.message;
  }
}
function onFormInput(e) {
  formData['email'] = refs.input.value;
  formData['message'] = refs.textarea.value;
  localStorage.setItem(FEEDBACK_LOCALSTORAGE, JSON.stringify(formData));
}

getMessage();

console.log(formData);
