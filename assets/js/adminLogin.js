import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, successHint, errorHint } from '../js/config';

const adminAccount = document.querySelector('.js-adminAccount');
const adminPassword = document.querySelector('.js-adminPassword');
const adminLoginForm = document.querySelector('.login-form');

adminLoginForm.addEventListener('submit', adminLoginCheck);

function adminLoginCheck(e) {
    e.preventDefault();
    if (!adminLoginForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else {
        axios.get(`${jsonURL}/admins/1`)
            .then(res => {
                let data = res.data;
                if (adminAccount.value.trim() !== data.account) {
                    document.querySelector('.js-loginError').innerHTML = ` <i class="bi bi-exclamation-circle me-4"></i> 使用者代號錯誤`;
                    adminAccount.value = '';
                    return;
                } else if (adminPassword.value.trim() !== data.password) {
                    document.querySelector('.js-passwordError').innerHTML = ` <i class="bi bi-exclamation-circle me-4"></i> 使用者密碼錯誤`;
                    adminPassword.value = '';
                    return;
                } else {
                    localStorage.setItem('isAdmin','true');
                    successHint('嘿毛，歡迎登入', '即將轉向後台頁面', 3000);
                    adminLoginForm.reset();
                    adminLoginForm.classList.remove('was-validated');
                    setTimeout(() => window.location.href = 'cms.html', 3000);
                };
            })
            .catch(err => {
                console.log(err);
                if (err.message === 'Network Error') {
                    errorHint('網路異常，無法登入！', '');
                } else {
                    errorHint(err, '');
                };
            });
    };
};