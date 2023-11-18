import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, successHint, errorHint } from '../js/config';

const loginEmail = document.querySelector('.js-loginEmail');
const loginPassword = document.querySelector('.js-loginPassword');
const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', loginCheck);

function loginCheck(e) {
    e.preventDefault();
    if (!loginForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else if (loginEmail.value.trim() !== `${localStorage.getItem('userEmail')}`) {
        document.querySelector('.js-emailWrong').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i> 帳號錯誤，請重新確認`;
        loginEmail.value = '';
        return;
    } else if (loginPassword.value.trim().length < 6) {
        document.querySelector('.js-passwordError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i> 密碼錯誤，請重新確認`;
        loginPassword.value = '';
        return;
    };
    login();
};

function login() {
    axios.post(`${jsonURL}/login`, {
        "email": loginEmail.value,
        "password": loginPassword.value
    })
        .then(res => {
            successHint('登入成功！', '', 3000);
            loginForm.reset();
            loginForm.classList.remove('was-validated');
            setTimeout(() => { window.location.href = `memberCenter.html?id=${localStorage.getItem('userId')}` }, 3000);
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                if (err.response.data === 'Incorrect password') {
                    loginPassword.value = '';
                    document.querySelector('.js-passwordError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i> 密碼錯誤，請重新確認`;
                };
            } else if (err.message === 'Network Error') {
                console.log(err);
                errorHint('網路異常，無法登入！', '');
            } else {
                console.log(err);
                errorHint(err, '');
            };
        });
};

// 可視密碼
const conceal = document.querySelector('.conceal');
const concealIcon = document.querySelector('#conceal-icon');

conceal.addEventListener('click', passwordShow);
function passwordShow(e) {
    e.preventDefault();
    if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        concealIcon.className = 'fa-regular fa-eye-slash';
    } else {
        loginPassword.type = 'password';
        concealIcon.className = 'fa-regular fa-eye';
    };
};