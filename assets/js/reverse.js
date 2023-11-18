import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidPhone, successHint, errorHint } from '../js/config';

// datepicker
$(function () {
    //設定中文語系
    $.datepicker.regional['zh-TW'] = {
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        prevText: "上月",
        nextText: "次月",
        weekHeader: "週"
    };
    //將預設語系設定為中文
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
                data.date = dateText;
                console.log(data);
            }
        });
        // 選取歷史日期取值
        $('.datepicker').on('change', function (e) {
            const changeDate = e.target.value;
            if (changeDate) {
                data.date = changeDate;
                console.log(data);
            };
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
                // 將字串的dataText轉為日期格式才可以運算比較
                const selectedStartDate = new Date(dateText);
                // 如果選擇日期，判斷是否跨月及入住日期是否小於退房日期
                if (data.endDate) {
                    const selectedEndDate = new Date(data.endDate);
                    if (selectedStartDate > selectedEndDate) {
                        errorHint('入住日期不能大於退房日期！', '請重新選擇日期');
                        $('.startDate').val('');
                    } else if (selectedStartDate.getDate() === selectedEndDate.getDate() &&
                        selectedStartDate.getMonth() === selectedEndDate.getMonth() &&
                        selectedStartDate.getFullYear() === selectedEndDate.getFullYear()) {
                        errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                        $('.startDate').val('');
                    } else {
                        data.startDate = dateText;
                    };
                } else {
                    data.startDate = dateText;
                };
                console.log(data);
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
                const selectedEndDate = new Date(dateText);
                if (data.startDate) {
                    const selectedStartDate = new Date(data.startDate);
                    if (selectedStartDate > selectedEndDate) {
                        errorHint('退房日期不能小於入住日期！', '請重新選擇日期');
                        $('.endDate').val('');
                    } else if (selectedStartDate.getDate() === selectedEndDate.getDate() &&
                        selectedStartDate.getMonth() === selectedEndDate.getMonth() &&
                        selectedStartDate.getFullYear() === selectedEndDate.getFullYear()) {
                        errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                        $('.endDate').val('');
                    } else {
                        data.endDate = dateText;
                    };
                } else {
                    data.endDate = dateText;
                }
                console.log(data);
            }
        });
    });
});

// 狗狗住宿(選取歷史日期取值)
$('.startDate').on('change', function (e) {
    const changeStartDate = e.target.value;
    if (changeStartDate) {
        const startDate = new Date(changeStartDate);
        if (data.endDate) {
            const endDate = new Date(data.endDate);
            if (startDate > endDate) {
                errorHint('入住日期不能大於退房日期！', '請重新選擇日期');
                $('.startDate').val('');
            } else if (startDate.getDate() === endDate.getDate() &&
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getFullYear() === endDate.getFullYear()) {
                errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                $('.startDate').val('');
            } else {
                data.startDate = changeStartDate;
            }
        } else {
            data.startDate = changeStartDate;
        }
        console.log(data);
    }
});
$('.endDate').on('change', function (e) {
    const changeEndDate = e.target.value;
    if (changeEndDate) {
        const endDate = new Date(changeEndDate);
        if (data.startDate) {
            const selectedStartDate = new Date(data.startDate);
            if (selectedStartDate > endDate) {
                errorHint('退房日期不能小於入住日期！', '請重新選擇日期');
                $('.endDate').val('');
            } else if (selectedStartDate.getDate() === endDate.getDate() &&
                selectedStartDate.getMonth() === endDate.getMonth() &&
                selectedStartDate.getFullYear() === endDate.getFullYear()) {
                errorHint('入住日期不能與退房日期相同！', '請重新選擇日期');
                $('.endDate').val('');
            } else {
                data.endDate = changeEndDate;
            }
        } else {
            data.endDate = changeEndDate;
        };
        console.log(data);
    };
});

// timepicker
$(document).ready(function () {
    $('.timepicker').timepicker({
        timeFormat: 'h:i A',// 時間隔式
        step: 60,//時間間隔
        minTime: '9:00',//最小時間
        maxTime: '21:00',//最大時間
        startTime: '9:00',//開始時間
        dynamic: true,//是否顯示項目，使第一個項目按時間順序緊接在所選時間之後
    });
    $('.timepicker').on('changeTime', function () {
        data.time = $(this).val();
        console.log(data);
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
// 預設service為'狗狗安親' ，因為線上預約預設頁面為'狗狗安親' 
const data = { service: '狗狗安親' };

// 選擇服務
const serviceOption = document.querySelector('.js-service');

serviceOption.addEventListener('click', function (e) {
    if (e.target.textContent === '狗狗安親') {
        data.service = '狗狗安親';
    } else if (e.target.textContent === '狗狗美容') {
        data.service = '狗狗美容';
    } else if (e.target.textContent === '狗狗住宿') {
        data.service = '狗狗住宿';
    };
    console.log(data);
});

// 毛孩姓名
// 取出json中的毛孩姓名，渲染到reverse-info.ejs
function getDogName() {
    axios.get(`${jsonURL}/660/dogs?userId=${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            if (res) {
                let data = res.data;
                renderDogName(data);
            }
        })
        .catch(err => {
            console.log(err)
        })
};
getDogName();

const nameSelect = document.querySelectorAll('.js-nameSelect');
function renderDogName(data) {
    let option = '';
    data.forEach(item => {
        option += `<option value="${item.name}">${item.name}</option>`
    });
    nameSelect.forEach(nameSelect => {
        nameSelect.insertAdjacentHTML('beforeend', option);
    });
};

// 選擇毛孩姓名
nameSelect.forEach(function (nameSelect) {
    nameSelect.addEventListener('change', function (e) {
        data.dogName = e.target.value;
        console.log(data);
    });
});

// 樂園服務
const paradise = document.querySelectorAll('.js-paradise');
paradise.forEach(paradise => {
    paradise.addEventListener('click', function (e) {
        if (e.target.classList.contains('form-check-input')) {
            data.paradise = e.target.value;
            console.log(data);
        };
    });
});

// 渲染 - HTML緊急聯絡人/電話
const emergencyContact = document.querySelectorAll('#emergencyContact');
const emergencyPhone = document.querySelectorAll('#emergencyPhone');

function getUserInfo() {
    axios.get(`${jsonURL}/660/users/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            if (res) {
                let data = res.data;
                renderContact(data);
                renderPhone(data);
            };
        })
        .catch(err => {
            console.log(err)
        });
};
getUserInfo();

function renderContact(data) {
    let option = '';
    option = `<option value="${data.name}"></option>`
    emergencyContact.forEach(emergencyContact => {
        emergencyContact.insertAdjacentHTML('beforeend', option);
    });
};

function renderPhone(data) {
    let option = '';
    option = `<option value="${data.phone}"></option>`
    emergencyPhone.forEach(emergencyPhone => {
        emergencyPhone.insertAdjacentHTML('beforeend', option);
    });
};

// 選取 - 緊急聯絡人/電話/備註  
const contactIuput = document.querySelectorAll('.js-contact');
const contactPhone = document.querySelectorAll('.js-phone');
const remark = document.querySelectorAll('#remark');

contactIuput.forEach(contactIuput => {
    contactIuput.addEventListener('input', function (e) {
        if (e.target.value !== '') {
            data.contact = e.target.value.trim();
            console.log(data);
        };
    });
});

contactPhone.forEach(contactPhone => {
    contactPhone.addEventListener('change', function (e) {
        data.phone = e.target.value.trim();
        console.log(data);
    });
});

remark.forEach(remark => {
    remark.addEventListener('input', function (e) {
        data.remark = e.target.value.trim();
        console.log(data);
    });
    // 目的：即使用戶未輸入相關備註，data.remark的值可以保留為空字串
    // 這行code會創建一個新的input事件，並將其分派（dispatch）给指定的<textarea>元素，用於觸發事件，確保 data.remark 始终包含一個值，即使文本框為空也是空字串 ''
    remark.dispatchEvent(new Event('input'));
});

// 狗狗美容
const size = document.querySelector('.js-size');
size.addEventListener('click', function (e) {
    if (e.target.value === undefined) {
        return;
    } else if (e.target.value === '小於10kg') {
        data.dogSize = '小於10kg';
    } else if (e.target.value === '10-20kg') {
        data.dogSize = '10-20kg';
    } else if (e.target.value === '大於20kg') {
        data.dogSize = '大於20kg';
    };
    console.log(data);
});

const plan = document.querySelector('.js-plan');
plan.addEventListener('click', function (e) {
    if (e.target.value === undefined) {
        return;
    } else if (e.target.value === '基礎洗香香') {
        data.plan = '基礎洗香香';
    } else if (e.target.value === '進階洗香香') {
        data.plan = '進階洗香香';
    } else if (e.target.value === '高級洗香香') {
        data.plan = '高級洗香香';
    };
    console.log(data);
});

// 狗狗住宿
const room = document.querySelector('.js-room');
room.addEventListener('click', function (e) {
    if (e.target.value === undefined) {
        return;
    } else if (e.target.value === '小狗香香房') {
        data.room = '小狗香香房';
    } else if (e.target.value === '忠犬呼嚕房') {
        data.room = '忠犬呼嚕房';
    } else if (e.target.value === '大狗好眠房') {
        data.room = '大狗好眠房';
    };
    console.log(data);
});

// 如表單無任何問題，post data
const reverseform = document.querySelectorAll("form");

// 判斷sibmit事件是否綁定
let isSubmitBound = false;

if (!isSubmitBound) {
    // 第一次提交表單時即綁定一個submit事件，在單一表單未成功提交前，多次點擊也會視為同一事件
    // 目的:避免多次點擊產生多個submit事件，導致最後上傳多筆相同資料
    reverseform.forEach(form => {
        form.addEventListener('submit', submitData);
    });
    isSubmitBound = true;
};

function submitData(e) {
    // 取消瀏覽器的默認提交表單行為，防止瀏覽器加載新頁面(新參數)
    e.preventDefault();
    reverseform.forEach(form => {
        if (!form.checkValidity()) {
            // 表單內容無效，阻止事件傳播，保留validation效果(invalid-feedback)
            e.stopPropagation();
            return;
        } else if (!isValidPhone(data.phone)) {
            form.querySelector('.js-phoneError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
            form.querySelector('.js-phone').value = '';
        } else {
            let postData = {};
            if (data.service === '狗狗安親') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "dogName": data.dogName,
                    "service": data.service,
                    "date": data.date,
                    "time": data.time,
                    "paradise": data.paradise,
                    "contact": data.contact,
                    "phone": data.phone,
                    "remark": data.remark,
                    "orderNum": orderNum
                };
            } else if (data.service === '狗狗美容') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "dogName": data.dogName,
                    "service": data.service,
                    "size": data.dogSize,
                    "plan": data.plan,
                    "date": data.date,
                    "time": data.time,
                    "paradise": data.paradise,
                    "contact": data.contact,
                    "phone": data.phone,
                    "remark": data.remark,
                    "orderNum": orderNum
                };
            } else if (data.service === '狗狗住宿') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "dogName": data.dogName,
                    "service": data.service,
                    "room": data.room,
                    "startDate": data.startDate,
                    "endDate": data.endDate,
                    "time": data.time,
                    "contact": data.contact,
                    "phone": data.phone,
                    "remark": data.remark,
                    "orderNum": orderNum
                };
            };
            axios.post(`${jsonURL}/660/reverse`, postData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    successHint('預約成功！', '', 3000);
                    form.reset();
                    form.classList.remove('was-validated');
                })
                .catch(err => {
                    console.log(err);
                });
        };
    });
};

// 產生Z0+5位數字的不重複隨機編碼
const checkNum = [];
function createOrderNum() {
    let num;
    // do...while:該循環會一直運行，直到生成的編碼在checkNum集合中不存在(確保唯一性)/反覆執行直到指定條件的求值結果為 false 為止
    do {
        // Math.random():隨機生成等於0或小於1的浮點數
        // Math.floor():回傳小於或等於所給的數字之最大整數(除小數點後面之數字)
        // padStart():將給定用於填充的字串，以重複的方式，插入到目標字串的起頭(左側)，直到目標字串到達指定長度
        num = `Z0${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    } while (checkNum.includes(num));
    checkNum.push(num);
    return num;
};

// tab切換，form resrt
function clearForm(formName) {
    document.querySelector(`.${formName}`).reset();
    document.querySelector(`.${formName}`).classList.remove('was-validated');
};

document.querySelectorAll('.option-link').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.textContent === '狗狗安親') {
            clearForm('cosmeticForm');
            clearForm('stayForm');
        } else if (e.target.textContent === '狗狗美容') {
            clearForm('dayCareForm');
            clearForm('stayForm');
        } else if (e.target.textContent === '狗狗住宿') {
            clearForm('dayCareForm');
            clearForm('cosmeticForm');
        };
    });
});
