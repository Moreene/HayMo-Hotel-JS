import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidEmail, successHint, errorHint } from '../js/config';

const forgrtPasswordInput = document.querySelector('.js-forgrtPasswordEmail');
const modalForm = document.querySelector('.modal-form');

modalForm.addEventListener('submit', emailCheck);

function emailCheck(e) {
    e.preventDefault();
    if (!modalForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else if (forgrtPasswordInput.value.trim() !== '' && !isValidEmail(forgrtPasswordInput.value.trim())) {
        document.querySelector('.js-emailError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤`;
        forgrtPasswordInput.value = '';
        return;
    };
    axios.post(`${jsonURL}/forgotPasswords`, { email: forgrtPasswordInput.value })
        .then(res => {
            successHint('已寄出驗證信！', '', 3000);
            modalForm.reset();
            modalForm.classList.remove('was-validated');
            $('#forgotPassword').modal('hide');
        })
        .catch(err => {
            console.log(err);
            if (err.message === 'Network Error') {
                errorHint('網路異常，無法送出！', '');
            } else {
                errorHint(err, '');
            };
        });
};

document.querySelector('.btn-close').addEventListener('click', () => {
    modalForm.classList.remove('was-validated');
});

document.querySelector('.js-canaelBtn').addEventListener('click', () => {
    modalForm.classList.remove('was-validated');
});