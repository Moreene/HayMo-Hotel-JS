const adminLogOutBtn = document.querySelector('.js-adminLogOut');

adminLogOutBtn.addEventListener('click', e => {
    e.preventDefault();
    location.href = 'cms-login.html';
    localStorage.removeItem('isAdmin');
});