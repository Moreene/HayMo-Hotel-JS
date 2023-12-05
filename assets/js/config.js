// json url
export const jsonURL ='http://localhost:3000'; 

// 驗證手機格式
export function isValidPhone(num) {
    const phomeRegex = /^09\d{8}$/;
    return phomeRegex.test(num);
};

// 驗證email格式
export function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

// Swal.fire-Success
export function successHint(title, txt, sec) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: txt,
        timer: sec,
    });
};

// Swal.fire-Error
export function errorHint(title, txt) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: txt,
    });
};

// Swal.fire-Warning
export function warningHint(title, txt, sec) {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: txt,
        timer: sec,
    });
};

// 前台 - 登出後檢查權限
function checkPermission() {
    // 檢查 localStorage 或其他權限相關的資訊
    let isLoggedIn = Boolean(localStorage.getItem('userToken'));
    if (!isLoggedIn) {
        alert('您沒有權限進入!');
        window.location.href = 'login.html';
    } else {
        let memberCenterContent = document.querySelector('.js-memberCenter');
        let articleContent = document.querySelector('.js-article');
        let reverseContent = document.querySelector('.js-reverse');
        showContent(memberCenterContent);
        showContent(articleContent);
        showContent(reverseContent);
    };
};

// 在 memberCenter.html 頁面載入時檢查權限
if (window.location.pathname.includes('/memberCenter.html') || window.location.pathname.includes('/article.html') || window.location.pathname.includes('/reverse.html')) {
    checkPermission();
};

// 後台 - 登出後檢查權限
function checkAdminPermission() {
    let isLoggedIn = Boolean(localStorage.getItem('isAdmin'));
    if (!isLoggedIn) {
        alert('您沒有權限進入!');
        window.location.href = 'cms-login.html';
    } else {
        let cmsContent = document.querySelector('.js-cms');
        let cmsOrderContent = document.querySelector('.js-cmsOrder');
        let cmsRoomContent = document.querySelector('.js-cmsRoom');
        showContent(cmsContent);
        showContent(cmsOrderContent);
        showContent(cmsRoomContent);
    };
};

if (window.location.pathname.includes('/cms.html') || window.location.pathname.includes('/cms-order.html') || window.location.pathname.includes('/cms-room.html')) {
    checkAdminPermission();
};

function showContent(content) {
    if (content) {
        content.classList.remove('d-none');
        content.classList.add('d-block');
    };
};