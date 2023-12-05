const id = localStorage.getItem('userId');

const centerLink = document.querySelectorAll('.js-center');
const articleLink = document.querySelectorAll('.js-article');
const reverseLink = document.querySelectorAll('.js-reverse');

centerLink.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = `memberCenter.html?id=${id}`;
    });
});

articleLink.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = `article.html?id=${id}`;
    });
});

reverseLink.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = `reverse.html?id=${id}`;
    });
});