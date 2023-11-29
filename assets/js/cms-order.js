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

const itemsPerPage = 10;// 一次顯示10筆
let currentPage = 1;// 當前頁數在第一頁
let currentTab = 'allCase-tab';
const blackListContent = document.querySelector('.js-blacklist');
const cancelCaseContent = document.querySelector('.js-cancelCaseContent');
const serviceSelect = document.querySelectorAll('.js-serviceSelect');
const openCaseContent = document.querySelector('.js-openCaseContent');
const allCaseContent = document.querySelector('.js-allCaseContent');
let filterData;

// 渲染 - 所有訂單
fetchAndRenderData('reverse', 'allCase');

// tab點擊
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        currentTab = e.target.closest('.nav-link').getAttribute('id');
        // currentPage = 1;
        serviceSelect.forEach(item => {
            item.value = '服務篩選';
        });
        if (e.target.closest('.js-allCasePill')) {
            fetchAndRenderData('reverse', 'allCase');
        } else if (e.target.closest('.js-openCasePill')) {
            fetchAndRenderData('reverse', 'openCase');
        } else if (e.target.closest('.js-canacelPill')) {
            fetchAndRenderData('cancelCases', 'cancelCase');
        } else if (e.target.closest('.js-blacklistPill')) {
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

// category:json分類，tabPaneId:tab-pane的id
function fetchAndRenderData(category, tabPaneId) {
    currentPage = 1;
    const tabPane = document.querySelector(`#${tabPaneId}`);
    const pagination = tabPane.querySelector('.pagination');
    const isOpenCase = category === 'reverse';
    axios.get(`${jsonURL}/${category}`)
        .then(res => {
            let data = res.data;
            if (isOpenCase && tabPaneId === 'openCase') {
                data = data.filter(item => item.isChecked === false);
            };
            renderContent(data, tabPane);
            renderPagination(data, tabPane, pagination);
        })
        .catch(err => {
            console.log(err);
        });
};

// 將pagination對應的data區間渲染至畫面
async function renderContent(data, tabPane) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sortByIdData = data.sort((a, b) => b.id - a.id).slice(startIndex, endIndex);
    const openCaseData = data.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(startIndex, endIndex);
    const allCaseData = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(startIndex, endIndex);

    if (tabPane) {
        if (tabPane.classList.contains('blacklist')) {
            let nameList = '';
            sortByIdData.forEach(item => {
                nameList +=
                    `
                    <tr>
                        <th scope="row" class="fw-normal">${item.name}</th>
                        <td>${item.email}</td>
                        <td>${item.phone}</td>
                        <td>${item.date}</td>
                        <td>${item.reason}</td>
                    </tr>`;
            });
            blackListContent.innerHTML = nameList;
        } else if (tabPane.classList.contains('cancelCase')) {
            let cases = '';
            for (const item of sortByIdData) {
                const user = await getUserById(item.userId);
                cases +=
                    `
                    <tr>
                        <th scope="row">
                            <a href="#" data-bs-toggle="modal"
                                data-bs-target="#cancelCaseModal" data-id=${item.id}>${item.orderNum}</a>
                        </th>
                        <td>${item.date}</td>
                        <td>${item.service}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${item.dogName}</td>
                        <td>${item.paradise}</td>
                    </tr>
                        `;
            };
            cancelCaseContent.innerHTML = cases;
        } else if (tabPane.classList.contains('openCase')) {
            let cases = '';
            for (const item of openCaseData) {
                const user = await getUserById(item.userId);
                let modalTarget = '';
                if (item.service === '安親') {
                    modalTarget = 'dayCareModal';
                } else if (item.service === '美容') {
                    modalTarget = 'cosmeticModal';
                } else if (item.service === '住宿') {
                    modalTarget = 'stayModal';
                };
                cases +=
                    `
                    <tr>
                        <th scope="row">
                            <a href="#" class="js-serviceModal" data-bs-toggle="modal" data-bs-target="#${modalTarget}" data-id=${item.id}>${item.orderNum}</a>
                        </th>
                        <td>${item.date}</td>
                        <td>${item.service}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${item.dogName}</td>
                        <td>${item.paradise}</td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <input type="checkbox" class="checkbox w-18px h-18px" data-id=${item.id}>
                            </div>
                        </td>
                        <td><a href="#" data-bs-toggle="modal" data-bs-target="#cancelModal" class="link-black-60 js-cancelModal" data-id=${item.id}><i class="bi bi-trash3-fill fs-5"></i></a></td>
                    </tr>
                        `;
            };
            openCaseContent.innerHTML = cases;
        } else if (tabPane.classList.contains('allCase')) {
            let cases = '';
            for (const item of allCaseData) {
                const user = await getUserById(item.userId);
                let modalTarget = '';
                if (item.service === '安親') {
                    modalTarget = 'allCaseDayCareModal';
                } else if (item.service === '美容') {
                    modalTarget = 'allCaseCosmeticModal';
                } else if (item.service === '住宿') {
                    modalTarget = 'allCaseStayModal';
                };
                cases +=
                    `
                    <tr>
                        <th scope="row">
                            <a href="#" class="js-allCaseModal" data-bs-toggle="modal" data-bs-target="#${modalTarget}" data-id=${item.id}>${item.orderNum}</a>
                        </th>
                        <td>${item.date}</td>
                        <td>${item.service}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${item.dogName}</td>
                        <td>${item.paradise}</td>
                        ${item.isChecked ? '<td><i class="bi bi-check-lg fs-5"></i></td>' : '<td>-</td>'}
                    </tr>
                    `;
            };
            allCaseContent.innerHTML = cases;
        };
    };
};

async function getUserById(userId) {
    try {
        const usersResponse = await axios.get(`${jsonURL}/users`);
        const usersData = usersResponse.data;
        return usersData.find(item => item.id === parseInt(userId));
    } catch (err) {
        console.log(err);
        return null;
    };
};

// 建立pagination分頁及prev-link、next-link
function renderPagination(data, tabPane, pagination) {
    const totalPages = Math.ceil((data.length) / itemsPerPage);
    const paginationContainer = pagination;
    paginationContainer.innerHTML = '';

    const createPageItem = (label, clickHandler) => {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = label;
        pageLink.setAttribute('data-page', label);
        pageLink.addEventListener('click', clickHandler);
        pageItem.appendChild(pageLink);
        return pageItem;
    };

    const prevLink = createPageItem('<', () => {
        if (currentPage > 1) {
            currentPage--;
            renderContent(data, tabPane);
            updateActivePageLink(tabPane);
        };
    });
    paginationContainer.appendChild(prevLink);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = createPageItem(i, () => {
            currentPage = i;
            renderContent(data, tabPane);
            updateActivePageLink(tabPane);
        });
        paginationContainer.appendChild(pageItem);
    };

    const nextLink = createPageItem('>', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderContent(data, tabPane);
            updateActivePageLink(tabPane);
        };
    });
    paginationContainer.appendChild(nextLink);
    updateActivePageLink(tabPane);
};

// 更新當前分頁active樣式
function updateActivePageLink(tabPane) {
    document.querySelectorAll('.page-link').forEach(item => item.classList.remove('active'));
    const currentPageLink = tabPane.querySelector(`.page-link[data-page="${currentPage}"]`);
    if (currentPageLink) {
        currentPageLink.classList.add('active');
    };
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

// 已取消
const cancelCaseNum = document.querySelector('.js-cancelCaseNum');

function initCancelOrderCount() {
    axios.get(`${jsonURL}/cancelCases`)
        .then(res => {
            let data = res.data;
            cancelCaseNum.textContent = data.length;
        })
        .catch(err => {
            console.log(err);
        });
};
initCancelOrderCount();

// modal渲染
cancelCaseContent.addEventListener('click', showCancelCaseModal);

function showCancelCaseModal(e) {
    if (e.target.getAttribute('data-bs-toggle')) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        axios.get(`${jsonURL}/cancelCases/${id}`)
            .then(res => {
                let data = res.data;
                renderCancelCaseModal(data);
            })
            .catch(err => {
                console.log(err);
            });
    };
};

const cancelCaseModal = document.querySelector('#cancelCaseModal');
async function renderCancelCaseModal(data) {
    try {
        const user = await getUserById(data.userId);
        cancelCaseModal.querySelector('.modalOrderNum').textContent = data.orderNum;
        cancelCaseModal.querySelector('.modalDate').textContent = data.date;
        cancelCaseModal.querySelector('.modalService').textContent = data.service;
        cancelCaseModal.querySelector('.modalName').textContent = user.name;
        cancelCaseModal.querySelector('.modalPhone').textContent = user.phone;
        cancelCaseModal.querySelector('.modalDogName').textContent = data.dogName;
        cancelCaseModal.querySelector('.modalParadise').textContent = data.paradise;
        cancelCaseModal.querySelector('.modalRemark').textContent = data.remark;
        cancelCaseModal.querySelector('.modalEmergencyContact').textContent = data.contact;
        cancelCaseModal.querySelector('.modalEmergencyPhone').textContent = data.phone;
    }
    catch (err) {
        console.log(err);
    };
};

// 對應的tab + 服務select渲染資料
serviceSelect.forEach(item => {
    item.addEventListener('change', e => {
        if (currentTab === 'allCase-tab') {
            if (e.target.value === '') {
                fetchAndRenderData('reverse', 'allCase');
            } else {
                const selectedService = e.target.value;
                rederSelectedData(selectedService, 'reverse');
            };
        } else if (currentTab === 'openCase-tab') {
            if (e.target.value === '') {
                fetchAndRenderData('reverse', 'openCase');
            } else {
                const selectedService = e.target.value;
                rederSelectedData(selectedService, 'reverse');
            };
        } else if (currentTab === 'cancelCase-tab') {
            if (e.target.value === '') {
                fetchAndRenderData('cancelCases', 'cancelCase');
            } else {
                const selectedService = e.target.value;
                rederSelectedData(selectedService, 'cancelCases');
            };
        };
    });
});

function rederSelectedData(selectedService, category) {
    filterData = [];
    axios.get(`${jsonURL}/${category}`)
        .then(res => {
            let data = res.data;
            currentPage = 1;
            if (selectedService === '安親') {
                filterData = data.filter(item => item.service === '安親');
            } else if (selectedService === '美容') {
                filterData = data.filter(item => item.service === '美容');
            } else if (selectedService === '住宿') {
                filterData = data.filter(item => item.service === '住宿');
            };
            if (currentTab === 'cancelCase-tab') {
                renderContent(filterData, document.querySelector('.cancelCase'));
                renderPagination(filterData, document.querySelector('.cancelCase'), document.querySelector('.cancelCase .pagination'));
            } else if (currentTab === 'openCase-tab') {
                renderContent(filterData, document.querySelector('.openCase'));
                renderPagination(filterData, document.querySelector('.openCase'), document.querySelector('.openCase .pagination'));
            } else if (currentTab === 'allCase-tab') {
                renderContent(filterData, document.querySelector('.allCase'));
                renderPagination(filterData, document.querySelector('.allCase'), document.querySelector('.allCase .pagination'));
            };
        })
        .catch(err => {
            console.log(err);
        });
};

// 未結案
const openCaseNum = document.querySelector('.js-openCaseNum');

function initopenCaseCount() {
    axios.get(`${jsonURL}/reverse`)
        .then(res => {
            let data = res.data;
            let unCheckedData = data.filter(item => item.isChecked === false);
            openCaseNum.textContent = unCheckedData.length;
        })
        .catch(err => {
            console.log(err);
        });
};
initopenCaseCount();

// 渲染 - modal
openCaseContent.addEventListener('change', showCheckModal);
openCaseContent.addEventListener('click', showServiceModal);
openCaseContent.addEventListener('click', showCancelModal);
const dayCareModal = document.querySelector('#dayCareModal');
const cosmeticModal = document.querySelector('#cosmeticModal');
const stayModal = document.querySelector('#stayModal');

// 確認訂單(checkbox)
function showCheckModal(e) {
    if (e.target.classList.contains('checkbox')) {
        let id = e.target.getAttribute('data-id');
        axios.get(`${jsonURL}/reverse/${id}`)
            .then(res => {
                let data = res.data;
                document.querySelector('.js-checkModalNum').textContent = data.orderNum;
                document.querySelector('.js-checkBtn').setAttribute('data-id', data.id);
                $('#checkModal').modal('show');
            })
            .catch(err => {
                console.log(err);
            });
    };
};

document.querySelector('.js-checkBtn').addEventListener('click', async e => {
    let id = e.target.getAttribute('data-id');
    try {
        const response = await axios.get(`${jsonURL}/reverse/${id}`);
        let checkedData = response.data;
        checkedData.isChecked = true;
        await axios.patch(`${jsonURL}/reverse/${id}`, checkedData);
        successHint('已結案！', '', 3000);
        fetchAndRenderData('reverse', 'openCase');
        $('#checkModal').modal('hide');
    } catch (err) {
        console.log(err);
    };
});

document.querySelector('.js-nocheckBtn').addEventListener('click', () => {
    $('#checkModal').modal('hide');
    document.querySelectorAll('.checkbox').forEach(item => item.checked = false);
});

const checkModal = document.querySelector('#checkModal');
checkModal.addEventListener('click', e => {
    if (e.target.classList.contains('btn-close')) {
        document.querySelectorAll('.checkbox').forEach(item => item.checked = false)
    };
});

// 取消訂單(垃圾桶icon)
function showCancelModal(e) {
    if (e.target.closest('.js-cancelModal')) {
        e.preventDefault();
        let id = e.target.closest('.js-cancelModal').getAttribute('data-id');
        axios.get(`${jsonURL}/reverse/${id}`)
            .then(res => {
                let data = res.data;
                document.querySelector('.js-cancelModalNum').textContent = data.orderNum;
                document.querySelector('.js-cancelBtn').setAttribute('data-id', data.id);
            })
            .catch(err => {
                console.log(err);
            });
    };
};

document.querySelector('.js-cancelBtn').addEventListener('click', async e => {
    let id = e.target.getAttribute('data-id');
    try {
        const response = await axios.get(`${jsonURL}/reverse/${id}`);
        const dataToMove = response.data;
        const cancelCasesResponse = await axios.get(`${jsonURL}/cancelCases`);
        const nextId = cancelCasesResponse.data.length + 1;
        dataToMove.id = nextId;
        await axios.post(`${jsonURL}/cancelCases`, dataToMove);
        await axios.delete(`${jsonURL}/reverse/${id}`);
        successHint('取消成功！', '', 3000);
        fetchAndRenderData('reverse', 'openCase');
        initopenCaseCount();
        initCancelOrderCount();
        $('#cancelModal').modal('hide');
    } catch (err) {
        console.log(err);
    };
});

document.querySelector('.js-noCancelBtn').addEventListener('click', () => $('#cancelModal').modal('hide'));

// 未結案 modal
function showServiceModal(e) {
    if (e.target.classList.contains('js-serviceModal')) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        axios.get(`${jsonURL}/reverse/${id}`)
            .then(res => {
                let data = res.data;
                if (data.service === '安親') {
                    renderDayCareModal(data);
                } else if (data.service === '美容') {
                    renderCosmeticModal(data);
                } else if (data.service === '住宿') {
                    renderStayModal(data);
                };
            })
            .catch(err => {
                console.log(err);
            });
    };
};

// 共用 - 未結案modal模組
// specificData：透過回調函數提供自訂行為來擴展函數功能的方法
async function renderModalData(modal, data, specificData) {
    try {
        const user = await getUserById(data.userId);
        modal.querySelectorAll('.modalOrderNum').forEach(item => item.textContent = data.orderNum);
        modal.querySelectorAll('.modalDate').forEach(item => item.textContent = data.date);
        modal.querySelectorAll('.modalService').forEach(item => item.textContent = data.service);
        modal.querySelectorAll('.modalName').forEach(item => item.textContent = user.name);
        modal.querySelectorAll('.modalPhone').forEach(item => item.textContent = user.phone);
        modal.querySelectorAll('.modalDogName').forEach(item => item.textContent = data.dogName);
        modal.querySelectorAll('.modalParadise').forEach(item => item.textContent = data.paradise);
        modal.querySelectorAll('.modalRemark').forEach(item => item.textContent = data.remark);
        modal.querySelectorAll('.modalEmergencyContact').forEach(item => item.textContent = data.contact);
        modal.querySelectorAll('.modalEmergencyPhone').forEach(item => item.textContent = data.phone);
        if (specificData) {
            specificData(modal, data);
        };
    } catch (err) {
        console.log(err);
    };
};

async function renderDayCareModal(data) {
    renderModalData(dayCareModal, data, (modal, data) => {
        modal.querySelector('.modalTotal').value = data.total;
    });
};

async function renderCosmeticModal(data) {
    renderModalData(cosmeticModal, data, (modal, data) => {
        modal.querySelector('.modalSize').textContent = data.size;
        modal.querySelector('.modalPlan').textContent = data.plan;
        modal.querySelector('.modalTotal').value = data.total;
    });
};

async function renderStayModal(data) {
    renderModalData(stayModal, data, (modal, data) => {
        modal.querySelector('.modalRoom').textContent = data.room;
        modal.querySelector('.modalStarDate').textContent = data.startDate;
        modal.querySelector('.modalEndDate').textContent = data.endDate;
        modal.querySelector('.modalTotal').value = data.total;
    });
};

// 所有訂單
allCaseContent.addEventListener('click', showAllCaseModal);
const allCaseDayCareModal = document.querySelector('#allCaseDayCareModal');
const allCaseCosmeticModal = document.querySelector('#allCaseCosmeticModal');
const allCaseStayModal = document.querySelector('#allCaseStayModal');

function showAllCaseModal(e) {
    if (e.target.classList.contains('js-allCaseModal')) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        axios.get(`${jsonURL}/reverse/${id}`)
            .then(res => {
                let data = res.data;
                if (data.service === '安親') {
                    renderAllCaseDayCareModal(data);
                } else if (data.service === '美容') {
                    renderAllCaseCosmeticModal(data);
                } else if (data.service === '住宿') {
                    renderAllCaseStayModal(data);
                };
            })
            .catch(err => {
                console.log(err);
            });
    };
};

async function renderAllCaseDayCareModal(data) {
    renderModalData(allCaseDayCareModal, data, (modal, data) => {
        modal.querySelector('.modalTotal').textContent = data.total;
    });
};

async function renderAllCaseCosmeticModal(data) {
    renderModalData(allCaseCosmeticModal, data, (modal, data) => {
        modal.querySelector('.modalSize').textContent = data.size;
        modal.querySelector('.modalPlan').textContent = data.plan;
        modal.querySelector('.modalTotal').textContent = data.total;
    });
};

async function renderAllCaseStayModal(data) {
    renderModalData(allCaseStayModal, data, (modal, data) => {
        modal.querySelector('.modalRoom').textContent = data.room;
        modal.querySelector('.modalStarDate').textContent = data.startDate;
        modal.querySelector('.modalEndDate').textContent = data.endDate;
        modal.querySelector('.modalTotal').textContent = data.total;
    });
};

// 搜尋功能
document.querySelectorAll('.js-searchGroup').forEach(item => item.addEventListener('click', searchOrderNum));
const searchInputs = document.querySelectorAll('.js-inputSearch');

function searchOrderNum(e) {
    e.preventDefault();
    let filterData = [];
    searchInputs.forEach(searchInput => {
        if (searchInput.value === '') {
            return;
        };

        let apiUrl = '';
        if (currentTab === 'allCase-tab' || currentTab === 'openCase-tab') {
            apiUrl = `${jsonURL}/reverse`;
        } else if (currentTab === 'cancelCase-tab') {
            apiUrl = `${jsonURL}/cancelCases`;
        };

        axios.get(apiUrl)
            .then(res => {
                let data = res.data;
                if (currentTab === 'allCase-tab' || currentTab === 'cancelCase-tab') {
                    filterData = data.filter(item => item.orderNum.match(searchInput.value.trim()));
                } else if (currentTab === 'openCase-tab') {
                    let unCheckedData = data.filter(item => item.isChecked === false);
                    filterData = unCheckedData.filter(item => item.orderNum.match(searchInput.value.trim()));
                };
                if (filterData.length === 0) {
                    errorHint('未查獲此筆訂單！', '請重新確認');
                    searchInput.value = '';
                    return;
                };
                if (currentTab === 'allCase-tab') {
                    renderContent(filterData, document.querySelector('.allCase'));
                    renderPagination(filterData, document.querySelector('.allCase'), document.querySelector('.allCase .pagination'));
                } else if (currentTab === 'openCase-tab') {
                    renderContent(filterData, document.querySelector('.openCase'));
                    renderPagination(filterData, document.querySelector('.openCase'), document.querySelector('.openCase .pagination'));
                } else if (currentTab === 'cancelCase-tab') {
                    renderContent(filterData, document.querySelector('.cancelCase'));
                    renderPagination(filterData, document.querySelector('.cancelCase'), document.querySelector('.cancelCase .pagination'));
                };
                searchInput.value = '';
            })
            .catch(err => {
                console.log(err);
            });
    });
};