import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidPhone, successHint, errorHint } from '../js/config';

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

const id = location.href.split('=')[1];
const dayCareRecord = document.querySelector('.js-dayCareRecord');
const cosmeticRecord = document.querySelector('.js-cosmeticRecord');
const stayRecord = document.querySelector('.js-stayRecord');

function initReverseRecord() {
    axios.get(`${jsonURL}/660/reverse?userId=${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            if (res) {
                let data = res.data;
                renderRecord(data);
            };
        })
        .catch(err => {
            console.log(err);
        });
};
initReverseRecord();

function renderRecord(data) {
    let dayCare = '';
    let cosmetic = '';
    let stay = '';
    data.forEach(item => {
        if (item.service === '安親') {
            const latestDayCare =
                `
            <tr>
                <th scope="row">
                    <a href="#" data-bs-toggle="modal"
                        data-bs-target="#dayCareModal" data-id=${item.id}>${item.orderNum}</a>
            </th>
            <td>${item.dogName}</td>
            <td>${item.date}</td>
            <td>${item.paradise}</td>
            <td>${item.contact}</td>
            <td>${item.phone}</td>
        </tr>
        `;
            dayCare = latestDayCare + dayCare;
            dayCareRecord.innerHTML = dayCare;
        } else if (item.service === '美容') {
            const latestCosmetic =
                `
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#cosmeticModal" data-id=${item.id}>${item.orderNum}</a>
                </th>
                <td>${item.dogName}</td>
                <td>${item.date}</td>
                <td>${item.plan}</td>
                <td>${item.paradise}</td>
                <td>${item.contact}</td>
                <td>${item.phone}</td>
            </tr>
            `;
            cosmetic = latestCosmetic + cosmetic;
            cosmeticRecord.innerHTML = cosmetic;
        } else if (item.service === '住宿') {
            const latestStay =
                `
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#stayModal" data-id=${item.id}>${item.orderNum}</a>
                </th>
                <td>${item.dogName}</td>
                <td>${item.room}</td>
                <td>${item.startDate}</td>
                <td>${item.endDate}</td>
                <td>${item.contact}</td>
                <td>${item.phone}</td>
            </tr>
            `
            stay = latestStay + stay;
            stayRecord.innerHTML = stay;
        };
    });
};

// dayCare modal
// 點擊訂單編號，帶入data-id資料
dayCareRecord.addEventListener('click', showModal);

function showModal(e) {
    if (e.target.getAttribute('data-bs-toggle')) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        axios.get(`${jsonURL}/660/reverse/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(res => {
                let data = res.data;
                if (data.service === '安親') {
                    renderDayCareModal(data);
                } else if (data.service === '美容') {
                    renderCosmeticModal(data);
                } else if (data.service === '住宿') {
                    renderSatyModal(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};

// 將資料渲染進modal
const dayCareForm = document.querySelector('.dayCareForm');
const dayCareOrderNum = document.querySelector('.js-dayCareOrderNum');
const dayCareDogName = document.querySelector('.js-dayCareDogName');
const dayCareDate = document.querySelector('.js-dayCareDate');
const dayCareTime = document.querySelector('.js-dayCareTime');
const dayCareParadise = document.querySelector('.js-dayCareParadise');
const dayCareRemark = document.querySelector('.js-dayCareRemark');
const dayCareContact = document.querySelector('.js-dayCareContact');
const dayCarePhone = document.querySelector('.js-dayCarePhone');
const dayCareBtn = document.querySelector('.js-editdayCare');
const dayCareTotal = document.querySelector('.js-dayCareTotal');

function renderDayCareModal(data) {
    dayCareOrderNum.textContent = data.orderNum;
    // selected可直接透過.value取值變更
    dayCareDogName.value = data.dogName;
    // 預設radio為未選中(false)
    dayCareParadise.querySelectorAll('.form-check-input').forEach(item => {
        item.checked = false;
    });
    dayCareDate.value = data.date;
    dayCareTime.value = data.time;
    // 判斷樂園服務checked(布林值)
    dayCareParadise.querySelectorAll('.form-check-input').forEach(item => {
        item.checked = item.value === data.paradise;
    });
    dayCareContact.value = data.contact;
    dayCarePhone.value = data.phone;
    dayCareRemark.textContent = data.remark;
    dayCareTotal.value = data.total;
    dayCareForm.setAttribute('data-id', data.id);
    checkDate(data);
};

function renderDogSelect() {
    axios.get(`${jsonURL}/660/dogs?userId=${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            let option = '';
            data.forEach(item => {
                option += `<option value="${item.name}">${item.name}</option>`
            });
            dayCareDogName.innerHTML = option;
            cosmeticDogName.innerHTML = option;
            stayDogName.innerHTML = option;
        })
        .catch(err => {
            console.log(err);
        });
};
renderDogSelect();

// 確認modal資料是否有被更新
dayCareForm.addEventListener('submit', renewDayCare);
function renewDayCare(e) {
    e.preventDefault();
    if (!dayCareForm.checkValidity()) {
        e.stopPropagation();
        return;
    };
    let id = e.target.getAttribute('data-id');
    axios.get(`${jsonURL}/660/reverse/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            const selectedParadise = document.querySelector('input[name="paradise"]:checked');
            if (data.dogName === dayCareDogName.value && data.date === dayCareDate.value.trim() && data.time === dayCareTime.value.trim() && data.paradise === selectedParadise.value && data.remark === dayCareRemark.value.trim() && data.contact === dayCareContact.value.trim() && data.phone === dayCarePhone.value.trim()) {
                errorHint('預約內容未更新！', '請確認是否有變更');
                return;
            } else if (!isValidPhone(dayCarePhone.value)) {
                dayCareForm.querySelector('.js-errorPhone').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
                dayCarePhone.value = '';
                return;
            };
            let dayCareTotalValue = parseInt(dayCareTotal.value);
            selectedParadise.value === '是' ? (dayCareTotalValue += 200) : (dayCareTotalValue -= 200);

            axios.patch(`${jsonURL}/660/reverse/${data.id}`, {
                "dogName": dayCareDogName.value,
                "date": dayCareDate.value,
                "time": dayCareTime.value,
                "paradise": selectedParadise.value,
                "contact": dayCareContact.value,
                "phone": dayCarePhone.value,
                "remark": dayCareRemark.value,
                "total": dayCareTotalValue
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    successHint('成功更新預約內容！', '', 3000);
                    initReverseRecord();
                    $('#dayCareModal').modal('hide');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

// 取得今天日期
function getToday() {
    let date = new Date();
    let yyyy = date.getFullYear();
    let MM = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    let dd = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
    let today = yyyy + '-' + MM + '-' + dd;
    return today;
};

function checkDate(data) {
    // 若今天日期為預約日期的前三天，禁止修改預約內容
    const today = getToday();
    const todayDate = new Date(today);
    const reverseDate = new Date(data.date);
    const dateDiff = Math.ceil((reverseDate - todayDate) / (1000 * 60 * 60 * 24));
    const inputElemet = [dayCareDogName, dayCareDate, dayCareTime, dayCareRemark, dayCareContact, dayCarePhone, dayCareBtn, cosmeticDogName, cosmeticDogSize, cosmeticPlan, cosmeticDate, cosmeticTime, cosmeticRemark, cosmeticContact, cosmeticPhone, cosmeticBtn, stayOrderNum, stayDogName, stayRoom, stayStartDate, stayEndDate, stayTime, stayContact, stayPhone, stayRemark, stayBtn];
    const radioElement = [...dayCareParadise.querySelectorAll('.form-check-input'), ...cosmeticParadise.querySelectorAll('.form-check-input')];
    if (dateDiff <= 3) {
        inputElemet.forEach(item => {
            item.setAttribute('disabled', '');
        });
        radioElement.forEach(item => {
            item.setAttribute('disabled', '');
        });
    } else {
        inputElemet.forEach(item => {
            item.removeAttribute('disabled', '');
        });
        radioElement.forEach(item => {
            item.removeAttribute('disabled', '');
        });
    };
};

// coesmetic modal
const cosmeticForm = document.querySelector('.cosmeticForm');
const cosmeticOrderNum = document.querySelector('.js-cosmeticOrderNum');
const cosmeticDogName = document.querySelector('.js-cosmeticDogName');
const cosmeticDogSize = document.querySelector('.js-cosmeticDogSize');
const cosmeticPlan = document.querySelector('.js-cosmeticPlan');
const cosmeticDate = document.querySelector('.js-cosmeticDate');
const cosmeticTime = document.querySelector('.js-cosmeticTime');
const cosmeticParadise = document.querySelector('.js-cosmeticParadise');
const cosmeticRemark = document.querySelector('.js-cosmeticRemark');
const cosmeticContact = document.querySelector('.js-cosmeticContact');
const cosmeticPhone = document.querySelector('.js-cosmeticPhone');
const cosmeticBtn = document.querySelector('.js-editCosmetic');
const cosmeticTotal = document.querySelector('.js-cosmeticTotal');

cosmeticRecord.addEventListener('click', showModal);

function renderCosmeticModal(data) {
    cosmeticOrderNum.textContent = data.orderNum;
    cosmeticDogName.value = data.dogName;
    // 判斷毛孩體型 select
    cosmeticDogSize.value = data.size;
    // 判斷美容 select
    cosmeticPlan.value = data.plan;
    cosmeticDate.value = data.date;
    cosmeticTime.value = data.time;
    cosmeticParadise.querySelectorAll('.form-check-input').forEach(item => {
        item.checked = item.value === data.paradise;
    });
    cosmeticContact.value = data.contact;
    cosmeticPhone.value = data.phone;
    cosmeticRemark.textContent = data.remark;
    cosmeticTotal.value = data.total;
    cosmeticForm.setAttribute('data-id', data.id);
    checkDate(data);
};

cosmeticForm.addEventListener('submit', renewCosmetic);
function renewCosmetic(e) {
    e.preventDefault();
    if (!cosmeticForm.checkValidity()) {
        e.stopPropagation();
        return;
    };
    let id = e.target.getAttribute('data-id');
    axios.get(`${jsonURL}/660/reverse/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            const selectedParadise = document.querySelector('input[name="paradise"]:checked');
            if (data.dogName === cosmeticDogName.value && data.size === cosmeticDogSize.value && data.plan === cosmeticPlan.value && data.date === cosmeticDate.value.trim() && data.time === cosmeticTime.value.trim() && data.paradise === selectedParadise.value && data.remark === cosmeticRemark.value.trim() && data.contact === cosmeticContact.value.trim() && data.phone === cosmeticPhone.value.trim()) {
                errorHint('預約內容未更新！', '請確認是否有變更');
                return;
            } else if (!isValidPhone(cosmeticPhone.value)) {
                cosmeticForm.querySelector('.js-errorPhone').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
                cosmeticPhone.value = '';
                return;
            };

            let sizePrice;
            let planPrice;
            let coesmeticTotalValue = parseInt(cosmeticTotal.value);
            if (cosmeticDogSize.value === '小於10kg') {
                sizePrice = 200;
            } else if (cosmeticDogSize.value === '10-20kg') {
                sizePrice = 300;
            } else if (cosmeticDogSize.value === '大於20kg') {
                sizePrice = 450;
            };
            if (cosmeticPlan.value === '基礎洗香香') {
                planPrice = 550;
            } else if (cosmeticPlan.value === '進階洗香香') {
                planPrice = 800;
            } else if (cosmeticPlan.value === '高級洗香香') {
                planPrice = 1000;
            };
            coesmeticTotalValue = sizePrice + planPrice + (selectedParadise.value === '是' ? 200 : 0);

            axios.patch(`${jsonURL}/660/reverse/${data.id}`, {
                "dogName": cosmeticDogName.value,
                "size": cosmeticDogSize.value,
                "plan": cosmeticPlan.value,
                "date": cosmeticDate.value,
                "time": cosmeticTime.value,
                "paradise": selectedParadise.value,
                "contact": cosmeticContact.value,
                "phone": cosmeticPhone.value,
                "remark": cosmeticRemark.value,
                "total": coesmeticTotalValue
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    successHint('成功更新預約內容！', '', 3000);
                    initReverseRecord();
                    $('#cosmeticModal').modal('hide');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

// stay modal
const stayForm = document.querySelector('.stayForm');
const stayOrderNum = document.querySelector('.js-stayOrderNum');
const stayDogName = document.querySelector('.js-stayDogName');
const stayRoom = document.querySelector('.js-stayRoom');
const stayStartDate = document.querySelector('.js-stayStartDate');
const stayEndDate = document.querySelector('.js-stayEndDate');
const stayTime = document.querySelector('.js-stayTime');
const stayRemark = document.querySelector('.js-stayRemark');
const stayContact = document.querySelector('.js-stayContact');
const stayPhone = document.querySelector('.js-stayPhone');
const stayBtn = document.querySelector('.js-editStay');
const stayTotal = document.querySelector('.js-stayTotal');

stayRecord.addEventListener('click', showModal);

function renderSatyModal(data) {
    stayOrderNum.textContent = data.orderNum;
    stayDogName.value = data.dogName;
    stayRoom.value = data.room;
    stayStartDate.value = data.startDate;
    stayEndDate.value = data.endDate;
    stayTime.value = data.time;
    stayContact.value = data.contact;
    stayPhone.value = data.phone;
    stayRemark.textContent = data.remark;
    stayTotal.value = data.total;
    stayForm.setAttribute('data-id', data.id);
    checkDate(data);
};

stayForm.addEventListener('submit', renewStay);
function renewStay(e) {
    e.preventDefault();
    if (!stayForm.checkValidity()) {
        e.stopPropagation();
        return;
    };
    let id = e.target.getAttribute('data-id');
    axios.get(`${jsonURL}/660/reverse/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            if (data.dogName === stayDogName.value && data.room === stayRoom.value && data.startDate === stayStartDate.value.trim() && data.endDate === stayEndDate.value.trim() && data.time === stayTime.value.trim() && data.remark === stayRemark.value.trim() && data.contact === stayContact.value.trim() && data.phone === stayPhone.value.trim()) {
                errorHint('預約內容未更新！', '請確認是否有變更');
                return;
            } else if (!isValidPhone(stayPhone.value)) {
                stayForm.querySelector('.js-errorPhone').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
                stayPhone.value = '';
                return;
            };

            let stayTotalVaue = parseInt(stayTotal.value);
            const startDate = new Date(stayStartDate.value);
            const endDate = new Date(stayEndDate.value);
            const dateDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (stayRoom.value === '小狗香香房') {
                stayTotalVaue = 1000 * dateDiff;
            } else if (stayRoom.value === '忠犬呼嚕房') {
                stayTotalVaue = 1350 * dateDiff;
            } else if (stayRoom.value === '大狗好眠房') {
                stayTotalVaue = 1600 * dateDiff;
            };

            axios.patch(`${jsonURL}/660/reverse/${data.id}`, {
                "dogName": stayDogName.value,
                "room": stayRoom.value,
                "startDate": stayStartDate.value,
                "endDate": stayEndDate.value,
                "time": stayTime.value,
                "contact": stayContact.value,
                "phone": stayPhone.value,
                "remark": stayRemark.value,
                "total": stayTotalVaue
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    successHint('成功更新預約內容！', '', 3000);
                    initReverseRecord();
                    $('#stayModal').modal('hide');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

// 服務預約資料達6筆，增加scrollbar且固定高度
const tableWrapper = document.querySelectorAll('.table-responsive');

document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', scrollEvent);
});

function scrollEvent() {
    tableWrapper.forEach(item => {
        if (item.scrollHeight > 385) {
            item.style.maxHeight = '385px';
            item.classList.add('overflow-y-scroll');
        } else {
            item.style.maxHeight = 'none';
            item.classList.remove('overflow-y-scroll');
        }
    });
};

// 在各個tab中選取月份，render對應月份的預約資訊
let currentTab = 'dayCare-tab';
const monthSelect = document.querySelector('.js-monthSelect');
let filterData;

document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', () => {
        currentTab = item.getAttribute('id');
        // 若點擊其他tab就init預約資訊，避免受月份篩選影響資料渲染
        monthSelect.value = '';
        initReverseRecord();
    });
});

monthSelect.addEventListener('change', (e) => {
    if (e.target.value === '') {
        initReverseRecord();
    } else {
        const selectedMonth = e.target.value.split('月')[0];
        renderMonthReverse(selectedMonth);
    };
});

// 對應的tab + 月份select渲染資料
function renderMonthReverse(month) {
    filterData = [];
    axios.get(`${jsonURL}/660/reverse?userId=${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            if (currentTab === 'dayCare-tab') {
                filterData = data.filter(item => item.service === '安親');
            };
            if (currentTab === 'cosmetic-tab') {
                filterData = data.filter(item => item.service === '美容');
            };
            if (currentTab === 'stay-tab') {
                filterData = data.filter(item => item.service === '住宿');
            };
            const matchingData = filterData.filter(item => {
                let itemMonth = parseInt(item.date.split('-')[1]);
                return itemMonth === parseInt(month);
            });
            function renderNoDataMessage(record, service) {
                let str =
                    `
                    <tr>
                        <td colspan="7">您沒有這個月的${service}服務預約</td>
                    </tr>
                `;
                record.innerHTML = str;
            };
            if (matchingData.length === 0) {
                if (currentTab === 'dayCare-tab') {
                    renderNoDataMessage(dayCareRecord, '安親');
                } else if (currentTab === 'cosmetic-tab') {
                    renderNoDataMessage(cosmeticRecord, '美容');
                } else if (currentTab === 'stay-tab') {
                    renderNoDataMessage(stayRecord, '住宿');
                };
            } else {
                renderRecord(matchingData);
            };
        })
        .catch(err => {
            console.log(err);
        });
};