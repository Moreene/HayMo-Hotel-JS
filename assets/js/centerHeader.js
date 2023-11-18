const id = localStorage.getItem('userId');

const centerLink = document.querySelector('.js-center');
const articleLink = document.querySelector('.js-article');
const reverseLink = document.querySelector('.js-reverse');

centerLink.addEventListener('click', () => {
    const testURL = `memberCenter.html?id=${id}`;
    location.href = testURL;
    // 若有成功送出狗狗美容&住宿的預約表單，localStorage會加入selectedTab
    // 若在點擊其他頁面時localStorage有selectedTab，需移除，讓用戶再次點擊預約單時可以顯示預設頁面
    localStorage.removeItem('selectedTab');
});

articleLink.addEventListener('click', () => {
    const articleURL = `article.html?id=${id}`;
    location.href = articleURL;
    localStorage.removeItem('selectedTab');
});

reverseLink.addEventListener('click', () => {
    const reverseURL = `reverse.html?id=${id}`;
    location.href = reverseURL;
});