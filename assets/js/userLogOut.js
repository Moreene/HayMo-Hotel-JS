import { warningHint } from '../js/config';

// 登出
const logOutBtn = document.querySelectorAll('.js-logOut');

logOutBtn.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        warningHint('即將登出會員中心', '', 3000);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhoneNum');
        localStorage.removeItem('userId');
        setTimeout(() => location.href = 'login.html', 3000);
    });
});