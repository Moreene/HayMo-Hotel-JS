import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidPhone, isValidEmail, successHint, errorHint } from '../js/config';

const userName = document.querySelector('#userName');
const userPhoneNum = document.querySelector('#userPhoneNum');
const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const passwordCheck = document.querySelector('#passwordCheck');
const signUpForm = document.querySelector('.singUp-form');

signUpForm.addEventListener('submit', signUpCheck);


function signUpCheck(e) {
    e.preventDefault();
    if (!signUpForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else if (!isValidPhone(userPhoneNum.value.trim())) {
        document.querySelector('.js-phoneError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
        userPhoneNum.value = ''
        return;
    } else if (!isValidEmail(userEmail.value.trim())) {
        document.querySelector('.js-emailError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤`;
        userEmail.value = ''
        return;
    } else if (userPassword.value.trim().length < 6 && passwordCheck.value.trim().length < 6) {
        document.querySelector('.js-shortPassword').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>密碼長度過短！請設定6位數以上的密碼`;
        userPassword.value = '';
        passwordCheck.value = '';
        return;
    } else if (userPassword.value.trim() !== passwordCheck.value.trim()) {
        document.querySelector('.js-checkPasswordError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>再次輸入的密碼錯誤`;
        passwordCheck.value = '';
        return;
    } else {
        signUp();
        signUpForm.reset();
        signUpForm.classList.remove('was-validated');
    };
};

function signUp() {
    axios.post(`${jsonURL}/users`, {
        "name": userName.value,
        "phone": userPhoneNum.value,
        "email": userEmail.value,
        "password": userPassword.value,
        "userToken": ''
    })
        .then(res => {
            const userId = res.data.user.id;
            axios.patch(`${jsonURL}/users/${userId}`, {
                "userToken": res.data.accessToken,
            })
                .then(res => {
                    successHint('恭喜，註冊成功！', '', 3000);
                    setTimeout(() => window.location.href = "login.html", 3000);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
            if (err.message === 'Network Error') {
                errorHint('網路異常，無法註冊！', '');
            } else if (err.response.data === 'Email already exists') {
                errorHint('該Email帳號已被註冊過！', '請選擇其它帳號註冊');
            } else {
                errorHint(err, '');
            };
        });
};
