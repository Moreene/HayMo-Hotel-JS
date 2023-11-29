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
                calcStayNight(data);
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
                calcStayNight(data);
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
        calcStayNight(data);
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
        calcStayNight(data);
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
let data = { service: '安親', total: 900, isParadiseYes: false, remark: '' };

const serviceOption = document.querySelector('.js-service');
const reverseform = document.querySelectorAll(".js-reverseForm");
const nameSelect = document.querySelectorAll('.js-nameSelect');
const paradise = document.querySelectorAll('.js-paradise');
const emergencyContact = document.querySelectorAll('#emergencyContact');
const emergencyPhone = document.querySelectorAll('#emergencyPhone');
const contactIuput = document.querySelectorAll('.js-contact');
const contactPhone = document.querySelectorAll('.js-phone');
const remark = document.querySelectorAll('#remark');
const size = document.querySelector('.js-size');
const plan = document.querySelector('.js-plan');
let sizePrice = 0;
let planPrice = 0;
const room = document.querySelector('.js-room');

// 選擇服務 + 樂園服務確認
serviceOption.addEventListener('click', function (e) {
    data.isParadiseYes = false;

    if (e.target.textContent === '狗狗安親') {
        reverseform.forEach(item => item.reset());
        data = { service: '安親', total: 900, isYesClicked: false, remark: '' };
        sizePrice = 0;
        planPrice = 0;
    } else if (e.target.textContent === '狗狗美容') {
        reverseform.forEach(item => item.reset());
        data = { service: '美容', total: 0, isYesClicked: false, remark: '' };
        sizePrice = 0;
        planPrice = 0;
    } else if (e.target.textContent === '狗狗住宿') {
        reverseform.forEach(item => item.reset());
        data = { service: '住宿', total: 0, isYesClicked: false, remark: '' };
        sizePrice = 0;
        planPrice = 0;
    };
    console.log(data);
});

paradise.forEach(item => {
    item.addEventListener('click', function (e) {
        if (e.target.classList.contains('form-check-input')) {
            data.paradise = e.target.value;
            if (e.target.value === '是' && !data.isParadiseYes) {
                data.total += 200;
                data.isParadiseYes = true;
            } else if (e.target.value === '否' && data.isYesClicked) {
                // if (data.isParadiseYes) {
                    data.total -= 200;
                    data.isParadiseYes = false;
                // };
            };
            console.log(data);
        };
    });
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

// 渲染 - HTML緊急聯絡人/電話
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
});

// 狗狗美容
size.addEventListener('click', function (e) {
    if (e.target.value === undefined) {
        return;
    } else if (e.target.value === '小於10kg') {
        data.dogSize = '小於10kg';
        sizePrice = 200;
    } else if (e.target.value === '10-20kg') {
        data.dogSize = '10-20kg';
        sizePrice = 300;
    } else if (e.target.value === '大於20kg') {
        data.dogSize = '大於20kg';
        sizePrice = 450;
    };
    data.total = sizePrice + planPrice + (data.paradise === '是' ? 200 : 0);
    console.log(data);
});

plan.addEventListener('click', function (e) {
    if (e.target.value === undefined) {
        return;
    } else if (e.target.value === '基礎洗香香') {
        data.plan = '基礎洗香香';
        planPrice = 550;
    } else if (e.target.value === '進階洗香香') {
        data.plan = '進階洗香香';
        planPrice = 800;
    } else if (e.target.value === '高級洗香香') {
        data.plan = '高級洗香香';
        planPrice = 1000;
    };
    data.total = sizePrice + planPrice + (data.paradise === '是' ? 200 : 0);
    console.log(data);
});

// 狗狗住宿
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
    calcStayNight(data);
});

// 計算 - 住宿天數*房價
function calcStayNight(data) {
    if (!data.room || !data.startDate || !data.endDate) {
        return;
    };
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const dateDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (data.room === '小狗香香房') {
        data.total = 1000 * dateDiff;
    } else if (data.room === '忠犬呼嚕房') {
        data.total = 1350 * dateDiff;
    } else if (data.room === '大狗好眠房') {
        data.total = 1600 * dateDiff;
    };
    console.log(data);
};

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
            if (data.service === '安親') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "orderNum": orderNum,
                    "dogName": data.dogName,
                    "service": data.service,
                    "date": data.date,
                    "time": data.time,
                    "paradise": data.paradise,
                    "contact": data.contact,
                    "phone": data.phone,
                    "remark": data.remark,
                    "total": data.total,
                    "isChecked": false
                };
            } else if (data.service === '美容') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "orderNum": orderNum,
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
                    "total": data.total,
                    "isChecked": false
                };
            } else if (data.service === '住宿') {
                const orderNum = createOrderNum();
                postData = {
                    "userId": id,
                    "orderNum": orderNum,
                    "dogName": data.dogName,
                    "service": data.service,
                    "room": data.room,
                    "date": data.startDate,
                    "startDate": data.startDate,
                    "endDate": data.endDate,
                    "time": data.time,
                    "paradise": '已包含',
                    "contact": data.contact,
                    "phone": data.phone,
                    "remark": data.remark,
                    "total": data.total,
                    "isChecked": false
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
                    sizePrice = 0;
                    planPrice = 0;
                    if (data.service === '安親') {
                        data = { service: '安親', total: 900, isYesClicked: false, remark: '' };

                    } else if (data.service === '美容') {
                        data = { service: '美容', total: 0, isYesClicked: false, remark: '' };
                    } else if (data.service === '住宿') {
                        data = { service: '住宿', total: 0, isYesClicked: false, remark: '' };
                    };
                })
                .catch(err => {
                    console.log(err);
                });
        };
    });
};

// 產生Z0+5位數字的不重複隨機編碼
const checkNum = ['Z035212', 'Z021059', 'Z008541', 'Z011423', 'Z045519', 'Z035010', 'Z015945', 'Z051203', 'Z032981', 'Z000152', 'Z015498', 'Z072090', 'Z031268', 'Z000110', 'Z082016', 'Z000019', 'Z011334', 'Z061546', 'Z090001', 'Z005213', 'Z077277', 'Z010024', 'Z053128', 'Z044160', 'Z091203', 'Z033927', 'Z066369', 'Z011125', 'Z058103', 'Z000761', 'Z015638', 'Z029983', 'Z022419', 'Z088642', 'Z000066', 'Z041297', 'Z041297','Z061950','Z016563'];
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
