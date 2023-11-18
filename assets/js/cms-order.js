import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidPhone, isValidEmail, successHint, errorHint } from '../js/config';

// datepicker
$(function () {
    //設定中文語系
    $.datepicker.regional['zh-TW'] = {
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        prevText: '上月',
        nextText: '次月',
        weekHeader: '週'
    };
    // //將預設語系設定為中文
    $.datepicker.setDefaults($.datepicker.regional['zh-TW']);
    $(function () {
        $('.datepicker').datepicker({
            beforeShow: function (input, inst) {
                inst.dpDiv.addClass('custom-datepicker');
            },
            dateFormat: 'yy-mm-dd',
            minDate: 1,
            maxDate: '+3M',
            onSelect: function (dateText, inst) {
                // console.log(dateText);
            }
        });

        // 狗狗住宿
        $('.startDate').datepicker({
            beforeShow: function (input, inst) {
                inst.dpDiv.addClass('custom-datepicker');
            },
            dateFormat: 'yy-mm-dd',
            minDate: 1,
            maxDate: '+3M',
            onSelect: function (dateText, inst) {
                const startDate = new Date(dateText);
                const endDate = new Date($('.endDate').val());
                if (endDate) {
                    if (startDate > endDate) {
                        errorHint('入住日期不能大於退房日期！', '請重新選擇日期');
                        $('.startDate').val('');
                    } else if (startDate.getDate() === endDate.getDate() &&
                        startDate.getMonth() === endDate.getMonth() &&
                        startDate.getFullYear() === endDate.getFullYear()) {
                        errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                        $('.startDate').val('');
                    }
                }
            }
        });
        $('.endDate').datepicker({
            beforeShow: function (input, inst) {
                inst.dpDiv.addClass('custom-datepicker');
            },
            dateFormat: 'yy-mm-dd',
            minDate: 1,
            maxDate: '+3M',
            onSelect: function (dateText, inst) {
                const endDate = new Date(dateText);
                const startDate = new Date($('.startDate').val());
                if (startDate) {
                    if (startDate > endDate) {
                        errorHint('退房日期不能小於入住日期！', '請重新選擇日期');
                        $('.endDate').val('');
                    } else if (startDate.getDate() === endDate.getDate() &&
                        startDate.getMonth() === endDate.getMonth() &&
                        startDate.getFullYear() === endDate.getFullYear()) {
                        errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                        $('.endDate').val('');
                    }
                }
            }
        });
    });
});

// 狗狗住宿(選取歷史日期取值)
$('.startDate').on('change', function (e) {
    const changeStartDate = e.target.value;
    if (changeStartDate) {
        const startDate = new Date(changeStartDate);
        const endDate = new Date($('.endDate').val());
        if (endDate && startDate > endDate) {
            errorHint('入住日期不能大於退房日期！', '請重新選擇日期');
            $('.startDate').val('');
        } else if (endDate && startDate.getTime() === endDate.getTime()) {
            errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
            $('.startDate').val('');
        };
    };
});
$('.endDate').on('change', function (e) {
    const changeEndDate = e.target.value;
    if (changeEndDate) {
        const endDate = new Date(changeEndDate);
        const startDate = new Date($('.startDate').val());
        if (startDate && startDate > endDate) {
            errorHint('退房日期不能小於入住日期！', '請重新選擇日期');
            $('.endDate').val('');
        } else if (startDate && startDate.getTime() === endDate.getTime()) {
            errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
            $('.endDate').val('');
        };
    };
});

// timepicker
$(document).ready(function () {
    $('.timepicker').timepicker({
        timeFormat: 'h:i A',
        step: 60,
        minTime: '9:00',
        maxTime: '21:00',
        startTime: '9:00',
        dynamic: true,
    });
    $('.timepicker').on('changeTime', function () {
        const selectedTime = $(this).val();
        // console.log(selectedTime);
    });
});

// Validation
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                };
                form.classList.add('was-validated')
            }, false)
        });
})();

document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.textContent.trim();
        if (target.includes('所有訂單')) {
            // console.log('所有訂單');
        } else if (target.includes('未結案')) {
            // console.log('未結案');
        } else if (target.includes('已取消')) {
            // fetchAndRenderData('canaelOrders', 'cancelCase');
        } else if (target.includes('黑名單')) {
            fetchAndRenderData('blacklists', 'blacklist');
        };
    });
});

const blackListCount = document.querySelector('.js-blackListNum');

function initBlacklistCount() {
    axios.get(`${jsonURL}/blackLists`)
        .then(res => {
            let data = res.data;
            blackListCount.textContent = data.length;
        })
        .catch(err => {
            console.log(err);
        });
};
initBlacklistCount();

const itemsPerPage = 10;// 一次顯示10筆
let currentPage = 1;// 當前頁數在第一頁

// category:json分類，tabPaneId:tab-pane的id
function fetchAndRenderData(category, tabPaneId) {
    const tabPane = document.querySelector(`#${tabPaneId}`);
    const pagination = tabPane.querySelector('.pagination');
    axios.get(`${jsonURL}/${category}`)
        .then(res => {
            let data = res.data;
            renderContent(data, tabPane);
            renderPagination(data, tabPane, pagination);
        })
        .catch(err => {
            console.log(err);
        });
};

// 將pagination對應的data區間渲染至畫面
function renderContent(data, tabPane) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sortData = data.sort((a, b) => (b.id) - (a.id));
    const paginatedData = sortData.slice(startIndex, endIndex);
    if (tabPane) {
        if (tabPane.classList.contains('blacklist')) {
            let newList = '';
            paginatedData.forEach(item => {
                newList += `
                <tr>
                    <th scope="row" class="fw-normal">${item.name}</th>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.date}</td>
                    <td>${item.reason}</td>
                </tr>
                `
            });
            document.querySelector('.js-blacklist').innerHTML = newList;
        };
    };
};

// // 建立pagination分頁及prev-link、next-link
function renderPagination(data, tabPane, pagination) {
    const totalPages = Math.ceil((data.length) / itemsPerPage);
    const paginationContainer = pagination;
    paginationContainer.innerHTML = '';

    const createPageItem = (num, clickHandler) => {
        let pageItem =
            `
            <li class="page-item">
                <a href="#" class="page-link" data-page="${num}">${num}</a>
            </li>
            `;
        let div = document.createElement('div');
        div.innerHTML = pageItem;
        div.firstChild.addEventListener('click', clickHandler);
        return div;
    };

    // paginationContainer.appendChild(createPageItem('<', () => {
    //     if (currentPage > 1) {
    //         currentPage--;
    //         renderContent(data, tabPane);
    //         updateActivePageLink();
    //     };
    // }));

    const prevLink = createPageItem('<', () => {
        if (currentPage > 1) {
            currentPage--;
            renderContent(data, tabPane);
            updateActivePageLink();
        };
    });
    paginationContainer.appendChild(prevLink);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = createPageItem(i, () => {
            num = i;
            renderContent(data, tabPane);
            updateActivePageLink();
        });
        paginationContainer.appendChild(pageItem);
    };

    const nextLink = createPageItem('>', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderContent(data, tabPane);
            updateActivePageLink();
        };
    });
    paginationContainer.appendChild(nextLink);

    updateActivePageLink();
};

// 更新當前分頁active樣式
function updateActivePageLink() {
};

// 新增 - 黑名單
const blackForm = document.querySelector('.blackForm');
const blockName = document.querySelector('.js-blockName');
const blockEmail = document.querySelector('.js-blockEmail');
const blockPhone = document.querySelector('.js-blockPhone');
const blockDate = document.querySelector('.js-blockDate');
const blockReason = document.querySelector('.js-blockReason');

blackForm.addEventListener('submit', addName);
function addName(e) {
    e.preventDefault();
    if (!blackForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else if (!isValidEmail(blockEmail.value.trim())) {
        blackForm.querySelector('.js-errorEmail').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i> Email格式錯誤`;
        blockEmail.value = '';
        return;
    } else if (!isValidPhone(blockPhone.value.trim())) {
        blackForm.querySelector('.js-errorPhone').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i> 手機號碼號碼格式錯誤`;
        blockPhone.value = '';
        return;
    } else {
        axios.post(`${jsonURL}/blackLists`, {
            "name": blockName.value.trim(),
            "email": blockEmail.value.trim(),
            "phone": blockPhone.value.trim(),
            "date": blockDate.value.trim(),
            "reason": blockReason.value.trim(),
        })
            .then(res => {
                successHint('新增成功!', '', 3000);
                $('#blackListModal').modal('hide');
                blackForm.reset();
                blackForm.classList.remove('was-validated');
                initBlacklistCount();
                fetchAndRenderData('blacklists', 'blacklist');
            })
            .catch(err => {
                console.log(err);
            });
    };
};

document.querySelectorAll('.btn-close').forEach(item => {
    item.addEventListener('click', () => {
        blackForm.reset();
        blackForm.classList.remove('was-validated');
    });
});

document.querySelector('.js-clearFormBtn').addEventListener('click', () => {
    blackForm.reset();
    blackForm.classList.remove('was-validated');
});


// 刪除黑名單用
function deleteList(num) {
    axios.delete(`${jsonURL}/blackLists/${num}`)
        .then(res => {
            console.log(red)
        })
        .catch(err => {
            console.log(err);
        });
};

// deleteList(9)