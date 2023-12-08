import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js';
import { jsonURL, isValidPhone, isValidEmail, successHint, errorHint } from '../js/config';
import { dogInfoSwiper } from '../js/swiper';

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
const memberInfo = document.querySelector('.js-memberInfo');
const editName = document.querySelector('.js-editName');
const editPhone = document.querySelector('.js-editPhone');
const editEmail = document.querySelector('.js-editEmail');
const editPassword = document.querySelector('.js-editPassword');

// 初始化 - 會員資訊
async function init() {
    try {
        let res = await axios.get(`${jsonURL}/660/users/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        let data = res.data;
        renderData(data);
    } catch (err) {
        throw new Error(err);
    };
};
init()
    .catch(err => {
        errorHint(err);
    });

// 渲染 - 個人資訊卡 + modal
function renderData(data) {
    memberInfo.innerHTML =
        `
        <p class="fs-4">會員資訊
        <a href="#" data-bs-toggle="modal"
            data-bs-target="#memberInfoModal"><i
                class="bi bi-pencil-square link-primary fs-4 ms-4"></i></a>
        </p>
        <p>姓名：${data.name}</p>
        <p>手機：${data.phone}</p>
        <p class="mb-0">信箱：${data.email}</p>
        `;
    editName.value = data.name;
    editPhone.value = data.phone;
    editEmail.value = data.email;
};

memberInfo.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
        init();
    };
});

// 編輯 - 個人資訊卡
const memberForm = document.querySelector('.memberForm');
memberForm.addEventListener('submit', updateUser);

function updateUser(e) {
    e.preventDefault();
    if (!memberForm.checkValidity()) {
        e.stopPropagation();
        return;
    };
    // 原始個人資訊
    const originalName = localStorage.getItem('userName');
    const originalPhone = localStorage.getItem('userPhoneNum');
    const originalEmail = localStorage.getItem('userEmail');
    if (editName.value.trim() === originalName && editPhone.value.trim() === originalPhone && editEmail.value.trim() === originalEmail && editPassword.value.trim() === '') {
        errorHint('會員資訊無變更！');
        return;
    };
    // 會員資訊有更改 - 條件確認 
    if (!isValidPhone(editPhone.value.trim())) {
        memberForm.querySelector('.js-errorPhone').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤`;
        editPhone.value = '';
        return;
    } else if (!isValidEmail(editEmail.value.trim())) {
        memberForm.querySelector('.js-emailError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤`;
        editEmail.value = '';
        return;
    } else if (editPassword.value.trim() !== '' && editPassword.value.trim().length < 6) {
        editPassword.classList.add('is-invalid');
        memberForm.querySelector('.js-passwordError').innerHTML = `<i class="bi bi-exclamation-circle me-4"></i>密碼長度過短，請設定6位數以上密碼`;
        editPassword.value = '';
        return;
    }
    else {
        // 如果只更新密碼就patch新密碼，若是更新其他資訊則patch其他資訊
        // 目的：使用者無更新密碼的情況下patch新資訊，不會讓密碼變空值
        axios.patch(`${jsonURL}/660/users/${id}`, (editPassword.value.trim() !== '') ? {
            "password": editPassword.value
        } : {
            "name": editName.value,
            "phone": editPhone.value,
            "email": editEmail.value,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(res => {
                init(res);
                if (editPassword.value.trim() !== '') {
                    successHint('成功更新密碼！', '', 3000);
                    editPassword.value = '';
                } else {
                    successHint('成功更新會員資訊！', '', 3000);
                    localStorage.setItem('userName', res.data.name);
                    localStorage.setItem('userPhoneNum', res.data.phone);
                    localStorage.setItem('userEmail', res.data.email);
                };
            })
            .catch(err => {
                console.log(err);
                errorHint('更新會員資訊失敗！');
            });
    };
};

document.querySelector('.btn-close').addEventListener('click', () => {
    memberForm.classList.remove('was-validated');
});

// 會員大頭照
const headImg = document.querySelector('.js-headImg');
const headImgInput = document.querySelector('#img_uploads');
const headImgView = document.querySelector('.js-headImgView');

// 檢查 - db.json中是否有會員照片URL
function initHeadImg() {
    axios.get(`${jsonURL}/660/users/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let data = res.data;
            if (data.hasOwnProperty('headImg')) {
                const headImgUrl = data.headImg;
                if (headImgUrl !== '') {
                    displayImg(headImgUrl);
                };
            };
        })
        .catch(err => {
            console.log(err);
        });
};
initHeadImg();

headImgInput.addEventListener('change', changeHeadImg);

// 選取 - 會員照片
function changeHeadImg(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Data = e.target.result;
            axios.patch(`${jsonURL}/660/users/${id}`, {
                "headImg": base64Data
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    displayImg(base64Data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        reader.readAsDataURL(file);
    };
};

// 渲染 - 會員首頁與modal照片
function displayImg(base64Data) {
    // 會員modal內照片
    while (headImgView.firstChild) {
        headImgView.removeChild(headImgView.firstChild);
    };
    const img = document.createElement('img');
    img.className = 'w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid';
    img.alt = '會員照片';
    img.src = base64Data;
    headImgView.appendChild(img);

    // 會員首頁照片
    while (headImg.firstChild) {
        headImg.removeChild(headImg.firstChild);
    };
    const imgBig = document.createElement('img');
    imgBig.className = 'w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid';
    imgBig.alt = '會員首頁照片';
    imgBig.src = base64Data;
    headImg.appendChild(imgBig);
};

// 清除大頭照
const clearImgBtn = document.querySelector('.js-clearImgBtn');
clearImgBtn.addEventListener('click', clearImg);

function clearImg(e) {
    e.preventDefault();
    // 會員Modal-大頭照
    while (headImgView.firstChild) {
        headImgView.removeChild(headImgView.firstChild);
    };
    const p = document.createElement('p');
    p.textContent = '請選擇照片';
    p.className = 'mb-0';
    headImgView.appendChild(p);
    localStorage.removeItem('headImg');

    // 會員首頁-大頭照
    while (headImg.firstChild) {
        headImg.removeChild(headImg.firstChild);
    };

    axios.patch(`${jsonURL}/660/users/${id}`, {
        "headImg": ''
    }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            // console.log('成功')
            let data = res.data;
        })
        .catch(err => {
            console.log(err);
        });
};

// 毛孩資訊卡
const addDogForm = document.querySelector('.addDogForm');
const dogName = document.querySelector('.js-dogName');
const dogBreed = document.querySelector('.js-dogBreed');
const dogAge = document.querySelector('.js-dogAge');
const dogSwiperEnd = document.querySelector('.js-swiperEnd');
const modalWrapper = document.querySelector('.js-modalWrapper');

// 初始化 - 毛孩資訊卡
// 如果localStorge有dogImg，就渲染有<img>的html模板;若無，則使用原本模板
async function initDogSlide() {
    try {
        let res = await axios.get(`${jsonURL}/660/dogs?userId=${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        let data = res.data;
        data.forEach(item => {
            const hasDogImg = item.hasOwnProperty('dogImg') && item.dogImg !== '';
            if (hasDogImg) {
                localStorage.setItem(`dogImg${item.id}`, item.dogImg);
            };
        });

        // some():有一個條件滿足即返回true
        const hasDogImg = data.some(item => localStorage.getItem(`dogImg${item.id}`));
        if (hasDogImg) {
            renderDogsDataP(data);
            renderDogsModalP(data);
        } else {
            renderDogsData(data);
            renderDogsModal(data);
        };
    } catch (err) {
        console.log(err);
        throw new Error(err);
    };
};
initDogSlide()
    .catch(err => {
        errorHint(err);
    });

// 建立 - 毛孩資訊卡 + modal
addDogForm.addEventListener('submit', addDogInfo);
function addDogInfo(e) {
    e.preventDefault();
    if (!addDogForm.checkValidity()) {
        e.stopPropagation();
        return;
    } else {
        axios.post(`${jsonURL}/660/dogs`, {
            "userId": id,
            "name": dogName.value,
            "breed": dogBreed.value,
            "age": dogAge.value
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(res => {
                successHint('成功建立資訊卡！', '', 3000);
                addDogForm.reset();
                addDogForm.classList.remove('was-validated');
                createDogSlide(res.data);
                createDogModal(res.data);
                $("#dogInfoModal").modal('hide');
            })
            .catch(err => {
                console.log(err);
                errorHint('建立失敗！');
            });
    };
};

// Template - dog swiper
function dogSlideTemplate(data) {
    return `
        <div class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${data.id}">
            <ul class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${data.id}"></div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal" data-bs-target="#dogInfoModal${data.id}"><i class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${data.name}</p>
                    <p>品種：${data.breed}</p>
                    <p class="mb-0">年齡：${data.age}</p>
                </li>
            </ul>
        </div>
    `;
};

// Template - dog modal
function dogModalTemplate(data) {
    return `
        <div class="modal fade" id="dogInfoModal${data.id}" tabindex="-1" aria-labelledby="dogInfoModal${data.id}"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="dogInfoModal${data.id}">編輯 - 毛孩資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column align-items-center">
                        <form method="post" enctype="multipart/form-data">
                            <div>
                                <div class="overflow-hidden">
                                    <input type="file" id="dogImg_uploads${data.id}"
                                        class="position-absolute img-cursor rounded-circle w-120px h-120px w-lg-150px h-lg-150px opacity-0 js-uploadImg"
                                        name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${data.id}">
                                </div>
                                <div
                                    class="w-120px h-120px w-lg-150px h-lg-150px d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${data.id}">
                                    <p class="mb-0">請選擇照片</p>
                                </div>
                                <div class="text-center mb-32">
                                    <a href="#" class="link-danger js-clearDogImg" data-id="${data.id}">移除照片</a>
                                </div>
                            </div>
                        </form>
                        <form class="w-75 mx-auto mb-16 mb-md-32 needs-validation dogModalForm" novalidate>
                            <div class="form-floating mb-16">
                                <input type="text" class="form-control js-editDogName${data.id}"
                                    id="floatingDogName${data.id}" placeholder="name" value="${data.name}" required>
                                <label for="floatingDogName${data.id}">姓名</label>
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗姓名
                                </div>
                            </div>
                            <div class="form-floating mb-16">
                                <input type="text" class="form-control js-editDogBreed${data.id}"
                                    id="floatingDogBreed${data.id}" placeholder="breed" value="${data.breed}" required>
                                <label for="floatingDogBreed" ${data.id}>品種</label>
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗品種
                                </div>
                            </div>
                            <div class="form-floating mb-16">
                                <input type="number" min="1" max="30" class="form-control js-editDogAge${data.id}"
                                    id="floatingDogAge${data.id}" placeholder="age" value="${data.age}" required>
                                <label for="floatingDogAge${data.id}">年齡</label>
                                <div class="invalid-feedback">
                                <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗年齡
                            </div>
                            </div>
                            <div class="d-flex flex-column">
                                <button type="submit" class="btn btn-primary py-14 text-white mb-16 js-editModalBtn"
                                    data-id="${data.id}">送出</button>
                                <button type="button" class="btn btn-danger py-14 text-white js-deleteSlideBtn"
                                    data-id="${data.id}">刪除</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

// 建立 - 單一毛孩資訊卡swiper
function createDogSlide(data) {
    let dogSlide = dogSlideTemplate(data);
    dogSwiperEnd.insertAdjacentHTML('beforebegin', dogSlide);
};

// 建立 - 單一毛孩資訊卡modal
function createDogModal(data) {
    let dogModal = dogModalTemplate(data);
    modalWrapper.insertAdjacentHTML('beforeend', dogModal);
    dogInfoSwiper.update();
};

// 渲染 - 所有毛孩資訊卡
function renderDogsData(data) {
    let dogSlides = '';
    data.forEach(item => {
        dogSlides += dogSlideTemplate(item);
    });
    dogSwiperEnd.insertAdjacentHTML('beforebegin', dogSlides);
    dogInfoSwiper.update();
};

// 渲染 - 所有毛孩資訊卡Modal(無dogImg)
function renderDogsModal(data) {
    let dogsModal = '';
    data.forEach(item => {
        dogsModal += dogModalTemplate(item);
    });
    modalWrapper.innerHTML = dogsModal;
};

// 點擊 - 毛孩資訊卡modal內各種點擊判斷
modalWrapper.addEventListener('click', dogModalClick);

// 判斷:送出按鈕/刪除按鈕/置換圖片/移除圖片
function dogModalClick(e) {
    if (e.target.classList.contains('js-editModalBtn')) {
        editDogForm(e);
    } else if (e.target.classList.contains('js-deleteSlideBtn')) {
        deleteDogSlide(e);
    } else if (e.target.classList.contains('js-uploadImg')) {
        let id = e.target.getAttribute('data-id');
        let dogImgInput = document.querySelector(`#dogImg_uploads${id}`);
        if (dogImgInput) {
            dogImgInput.addEventListener('change', function () {
                dogImgChange(dogImgInput, id);
            });
        };
    } else if (e.target.classList.contains(`js-clearDogImg`)) {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        let dogImgView = document.querySelector(`.js-dogImgView${id}`);
        let dogImg = document.querySelector(`.js-dogImg${id}`);
        // 狗狗Modal-大頭照
        while (dogImgView.firstChild) {
            dogImgView.removeChild(dogImgView.firstChild);
        };
        let p = document.createElement('p');
        p.textContent = '請選擇照片';
        p.className = 'mb-0';
        dogImgView.appendChild(p);
        localStorage.removeItem(`dogImg${id}`);

        // 狗狗首頁-大頭照
        while (dogImg.firstChild) {
            dogImg.removeChild(dogImg.firstChild);
        };

        axios.patch(`${jsonURL}/660/dogs/${id}`, {
            "dogImg": ''
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(res => {
                // console.log('成功');
                let data = res.data;
            })
            .catch(err => {
                console.log(err);
            });
    };
};

// 編輯-  毛孩資訊卡modal
function editDogForm(e) {
    e.preventDefault();
    const dogModalForm = e.target.closest('.dogModalForm');
    if (!dogModalForm.checkValidity()) {
        e.stopPropagation();
        dogModalForm.classList.add('was-validated');
        return;
    } else {
        renewDogInfo(e);
    };
};

async function renewDogInfo(e) {
    try {
        let id = e.target.getAttribute('data-id');
        let editDogName = document.querySelector(`.js-editDogName${id}`);
        let editDogBreed = document.querySelector(`.js-editDogBreed${id}`);
        let editDogAge = document.querySelector(`.js-editDogAge${id}`);
        let res = await axios.get(`${jsonURL}/660/dogs/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        let data = res.data;
        if (editDogName.value.trim() === data.name && editDogBreed.value.trim() === data.breed && editDogAge.value.trim() === data.age) {
            errorHint('毛孩資訊無變更！');
            return;
        } else {
            axios.patch(`${jsonURL}/660/dogs/${id}`, {
                "name": editDogName.value,
                "breed": editDogBreed.value,
                "age": editDogAge.value,
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    // 若更新成功，就尋找對應id的swiper-slide帶入newData更新HTML
                    let newData = res.data;
                    let slide = document.querySelector(`.swiper-slide[data-id="${id}"]`);
                    renderDogSlide(slide, newData);
                    successHint('成功更新資訊卡！', '', 3000);
                })
                .catch(err => {
                    throw new Error(err);
                });
        };
    } catch (err) {
        console.log(err);
        errorHint('更新資訊卡失敗！');
    };
};

// 渲染 - 編輯後的毛孩資訊卡
function renderDogSlide(slide, newData) {
    if (slide) {
        let url = localStorage.getItem(`dogImg${newData.id}`);
        slide.innerHTML =
            `
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${newData.id}">
                            <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${url || "../assets/images/member-img.png"}" alt="毛孩首頁照片">
                        </div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#dogInfoModal${newData.id}"><i
                                class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${newData.name}</p>
                    <p>品種：${newData.breed}</p>
                    <p class="mb-0">年齡：${newData.age}</p>
                </li>
            </ul>
        `
    };
};

// 點擊 - dogSlide的<a>，打開modal並重新渲染毛孩資訊(避免invalid-feedback留在畫面上)
document.querySelector('.swiper-wrapper').addEventListener('click', e => {
    const modalTarget = e.target.closest('a');
    if (modalTarget) {
        if (modalTarget.getAttribute('data-bs-target') === '#dogInfoModal') {
            return;
        } else {
            const id = modalTarget.getAttribute('data-bs-target').split('l')[1];
            const modalElement = document.querySelector(`#dogInfoModal${id}`);
            axios.get(`${jsonURL}/660/dogs/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    let data = res.data;
                    modalElement.querySelector(`.js-editDogName${id}`).value = data.name;
                    modalElement.querySelector(`.js-editDogBreed${id}`).value = data.breed;
                    modalElement.querySelector(`.js-editDogAge${id}`).value = data.age;
                })
                .catch(err => {
                    console.log(err);
                });
        };
    };
});

// 刪除 - 毛孩資訊卡
function deleteDogSlide(e) {
    let id = e.target.getAttribute('data-id');
    let editDogName = document.querySelector(`.js-editDogName${id}`);
    let editDogBreed = document.querySelector(`.js-editDogBreed${id}`);
    let editDogAge = document.querySelector(`.js-editDogAge${id}`);
    axios.delete(`${jsonURL}/660/dogs/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
        .then(res => {
            let slide = document.querySelector(`.swiper-slide[data-id="${id}"]`);
            renderAfterDeleteSlide(slide);
            localStorage.removeItem(`dogImg${id}`);
            successHint('成功刪除資訊卡！', '', 3000);
            editDogName.value = '';
            editDogBreed.value = '';
            editDogAge.value = '';
            $(`#dogInfoModal${id}`).modal('hide');
        })
        .catch(err => {
            console.log(err);
            errorHint('刪除資訊卡資敗！');
        });
};

// 渲染 - 刪除後的毛孩資訊卡
function renderAfterDeleteSlide(slide) {
    if (slide) {
        slide.remove();
        dogInfoSwiper.update();
    };
};

// 選取 - 狗狗照片
function dogImgChange(dogImgInput, id) {
    const file = dogImgInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Data = e.target.result;
            axios.patch(`${jsonURL}/660/dogs/${id}`, {
                "dogImg": base64Data
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then(res => {
                    displayDogImg(base64Data, id);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        reader.readAsDataURL(file);
    };
};

// 渲染 - 狗狗首頁與modal照片
function displayDogImg(base64Data, id) {
    let dogImgView = document.querySelector(`.js-dogImgView${id}`);
    let dogImg = document.querySelector(`.js-dogImg${id}`);

    if (dogImgView && dogImg) {
        while (dogImgView.firstChild) {
            dogImgView.removeChild(dogImgView.firstChild);
        }
        const img = document.createElement('img');
        img.className = 'w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid';
        img.alt = '毛孩照片';
        img.src = base64Data;
        dogImgView.appendChild(img);

        while (dogImg.firstChild) {
            dogImg.removeChild(dogImg.firstChild);
        }
        const imgBig = document.createElement('img');
        imgBig.className = 'w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid';
        imgBig.alt = '毛孩首頁照片';
        imgBig.src = base64Data;
        dogImg.appendChild(imgBig);
    };
};

// 渲染 - 所有毛孩資訊卡(localStorage有dogImg)
function renderDogsDataP(data) {
    let dogSlides = '';
    data.forEach(item => {
        let url = localStorage.getItem(`dogImg${item.id}`);
        dogSlides +=
            `
        <div
            class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${item.id}">
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${item.id}">
                            <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${url || "../assets/images/member-img.png"}" alt="毛孩首頁照片">
                        </div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#dogInfoModal${item.id}"><i
                                class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${item.name}</p>
                    <p>品種：${item.breed}</p>
                    <p class="mb-0">年齡：${item.age}</p>
                </li>
            </ul>
        </div>
        `
    });
    dogSwiperEnd.insertAdjacentHTML('beforebegin', dogSlides);
    dogInfoSwiper.update();
};

// 渲染 - 所有毛孩資訊卡Modal(localStorage有dogImg)
function renderDogsModalP(data) {
    let dogsModal = '';
    data.forEach(item => {
        let url = localStorage.getItem(`dogImg${item.id}`);
        dogsModal +=
            `
        <div class="modal fade" id="dogInfoModal${item.id}" tabindex="-1" aria-labelledby="dogInfoModal${item.id}"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dogInfoModal${item.id}">編輯 - 毛孩資訊</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column align-items-center">
                            <form method="post" enctype="multipart/form-data">
                                <div>
                                    <div class="overflow-hidden">
                                        <input type="file" id="dogImg_uploads${item.id}"
                                            class="position-absolute img-cursor rounded-circle w-120px h-120px w-lg-150px h-lg-150px opacity-0 js-uploadImg"
                                            name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${item.id}">
                                    </div>
                                    <div
                                        class="w-120px h-120px w-lg-150px h-lg-150px d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${item.id}">
                                        <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${url || "../assets/images/choose-img.png"}" alt="毛孩照片">
                                    </div>
                                    <div class="text-center mb-32">
                                        <a href="#" class="link-danger js-clearDogImg" data-id="${item.id}">移除照片</a>
                                    </div>
                                </div>
                            </form>
                            <form class="w-75 mx-auto mb-16 mb-md-32 needs-validation dogModalForm" novalidate>
                                <div class="form-floating mb-16">
                                    <input type="text" class="form-control js-editDogName${item.id}"
                                        id="floatingDogName${item.id}" placeholder="name" value="${item.name}" required>
                                        <label for="floatingDogName${item.id}">姓名</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗姓名
                                        </div>
                                </div>
                                <div class="form-floating mb-16">
                                    <input type="text" class="form-control js-editDogBreed${item.id}"
                                        id="floatingDogBreed${item.id}" placeholder="breed" value="${item.breed}" required>
                                        <label for="floatingDogBreed" ${item.id}>品種</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗品種
                                        </div>
                                </div>
                                <div class="form-floating mb-16">
                                    <input type="number" min="1" max="30" class="form-control js-editDogAge${item.id}"
                                        id="floatingDogAge${item.id}" placeholder="age" value="${item.age}" required>
                                        <label for="floatingDogAge${item.id}">年齡</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗年齡
                                        </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <button type="submit" class="btn btn-primary py-14 text-white mb-16 js-editModalBtn"
                                        data-id="${item.id}">送出</button>
                                    <button type="button" class="btn btn-danger py-14 text-white js-deleteSlideBtn"
                                        data-id="${item.id}">刪除</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
    modalWrapper.innerHTML = dogsModal;
};