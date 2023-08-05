const form = document.forms.form;
const person = form.elements.Name;
const email = form.elements.Email;
const Age = document.querySelector('#Age');
const gender = form.elements.Gender;
const select = form.elements.Select;
const password = document.querySelector('#Password');
const secondPassword = document.querySelector('#secondPassword');
const checkbox = form.elements.checkbox;
const submit = form.elements.Button;
const checkboxError = document.getElementById('checkboxError');
const ageError = document.getElementById('age-error');
let errorDiv = document.querySelector('.errorsInfo');
let inputs = document.querySelectorAll("input");
let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/;

//Отменять действие по умолчанию для события `submit`
//Если форма проходит проверку валидности, выводите в консоль
//значения полей формы и очищайте форму

form.addEventListener('submit', function (evt) {

  evt.preventDefault(); // Отменяем действие по умолчанию для события submit

  // Проверка, чтобы все поля были заполнены
  if (person.value == "" || email.value == "" || Age.value == "" || gender.value == "" || select.value == "" || password.value == "" || secondPassword.value == "" || !checkbox.checked) {
    //alert("Все поля должны быть заполнены");
    document.querySelector('.errorsInfo').textContent = 'Все поля должны быть заполнены';
    return false;
  }

  // Проверка наличия Имени
  if (person.value == "") { //!person.match(personRegex)
    alert("Пожалуйста, введите имя");
    //document.querySelector('#name-error').textContent = 'Пожалуйста, введите имя';
    return false;
  }

  // Проверка валидности email
  if (email.value == "") {  //!email.match(emailRegex)
    alert("Пожалуйста, введите email");
    //document.querySelector('#email-error').textContent = 'Пожалуйста, введите email';
    return false;
  }

  // Проверка возраста 
  if (Age.value > 100 || Age.value < 18) {
    //alert("Ваш возраст должен быть в диапазоне от 18-100");
    document.querySelector('#age-error').textContent = 'Ваш возраст должен быть в диапазоне от 18-100'
    return false;
  }

  // Проверка наличия пола
  if (gender.value == "") {
    //alert("Пожалуйста, укажите Ваш пол");
    document.querySelector('#gender-error').textContent = 'Пожалуйста, укажите Ваш пол';
    return false;
  }

  // Проверка что выбрана профессия 
  if (select.value == "") {
    alert("Укажите Вашу профессию");
    //document.querySelector('#select-error').textContent = 'Пожалуйста, укажите Вашу профессию';
    return false;
  }

  // Проверка длинны пароля
  if (password.length < 8) { //!password.match(passwordRegex)
    alert("Пароль должен содержать минимум 8 символов");
    //document.querySelector('#password-error').textContent = 'Пароль должен содержать минимум 8 символов';
    return false;
  }

  // Проверка правильности повтора пароля
  if (secondPassword.value != password.value) {
    alert("Введите правильный пароль");
    //document.querySelector('#secondPassword-error').textContent = 'Введите правильный пароль';
    return false;
  }

  // Валидация успешна
  console.log('Имя:' + person.value);
  console.log('Email:' + email.value);
  console.log('Возраст:' + Age.value);
  console.log('Пол:' + gender.value);
  console.log('Профессия:' + select.value);
  console.log('Пароль:' + password.value);
  console.log('Повторить пароль:' + secondPassword.value);
  console.log('Согласие:' + checkbox.value);
  alert("Форма успешно отправлена");
  form.reset(); //Очищаем все поля
  document.querySelectorAll('.error-message').textContent = ''; // очищает сообщения об ошибках 
  document.querySelector('#gender-error').textContent = '';
  document.querySelector('#age-error').textContent = '';
  return true;
})

/*Обязательно проверяйте выбран ли `checkbox`. Если он не выбран,
  добавляйте класс `error` к `checkbox` и отображайте сообщение об
  ошибке в соответствующем элементе `span`
*/

submit.onclick = function () {
  if (!checkbox.checked) {
    checkboxError.textContent = 'Примите согласие на обработку персональных данных';
  } else {
    checkboxError.textContent = '';
  }
}

/*Создайте функцию, которая будет проверять валидность
  переданного поля с использованием свойства `validity`.
  Если поле не валидно, добавлять класс `error` к полю
  (который будет обводить или подчеркивать поле красным цветом)
  и отображать сообщение об ошибке в соответствующем элементе
  `span` с помощью свойства `validationMessage`.

  <div class="form-group">
    <label for="age" class="form-label age">Возраст:</label>
    <input type="number" id="age" name="age" class="form-input" placeholder="Введите ваш возраст" required />
    <span class="error-message" id="age-error"></span>
  </div>
*/

//Первый вариант

function checkValidity(Age) {
  let validity = Age.validity;
  if (validity.typeMismatch) {
    //Age.classList.add("invalid");
    ageError.textContent = 'Введены некорректные данные';
  }
  if (validity.patternMismatch) {
    //Age.classList.add("invalid");
    ageError.textContent = 'Введены некорректные данные';
  }
  if (validity.rangeOverflow) {
    let max = Age.max;
    ageError.textContent = 'Максимальное значение не может быть больше, чем 99';
  }

  if (validity.rangeUnderflow) {
    let min = Age.min;
    ageError.textContent = 'Минимальное значение не может быть меньше, чем 10';
  }
}

submit.onclick = checkValidity;

//Второй вариант
/*
function checkValidity(Age) {
  if (!Age.validity.valid) {
    //Age.classList.add("error");
    ageError.textContent = Age.validationMessage;
  } else {
    //Age.classList.remove("error");
    ageError.textContent = "";
  }
}

submit.onclick = checkValidity;

*/

