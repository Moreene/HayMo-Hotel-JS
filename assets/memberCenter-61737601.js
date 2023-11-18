import{d as Q}from"./bootstrap-3dca8c45.js";import"./centerHeader-436f0069.js";import"./hamMenu-6b7faa69.js";import s from"https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js";import{e as d,i as X,a as $e,j as n,s as f}from"./config-e6f0afb8.js";(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const Z=location.href.split("=")[1],ge=document.querySelector(".js-memberInfo"),ae=document.querySelector(".js-editName"),j=document.querySelector(".js-editPhone"),q=document.querySelector(".js-editEmail"),u=document.querySelector(".js-editPassword");async function le(){try{let t=(await s.get(`${n}/660/users/${Z}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;De(t)}catch(e){throw new Error(e)}}le().catch(e=>{d(e)});function De(e){ge.innerHTML=`
        <p class="fs-4">會員資訊
        <a href="#" data-bs-toggle="modal"
            data-bs-target="#memberInfoModal"><i
                class="bi bi-pencil-square link-primary fs-4 ms-4"></i></a>
        </p>
        <p>姓名：${e.name}</p>
        <p>手機：${e.phone}</p>
        <p class="mb-0">信箱：${e.email}</p>
        `,ae.value=e.name,j.value=e.phone,q.value=e.email}ge.addEventListener("click",function(e){e.target.closest("a")&&le()});const p=document.querySelector(".memberForm");p.addEventListener("submit",Se);function Se(e){if(e.preventDefault(),!p.checkValidity()){e.stopPropagation();return}const t=localStorage.getItem("userName"),a=localStorage.getItem("userPhoneNum"),o=localStorage.getItem("userEmail");if(ae.value.trim()===t&&j.value.trim()===a&&q.value.trim()===o&&u.value.trim()===""){d("會員資訊無變更！");return}if(X(j.value.trim()))if($e(q.value.trim()))if(u.value.trim()!==""&&u.value.trim().length<6){u.classList.add("is-invalid"),p.querySelector(".js-passwordError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>密碼長度過短，請設定6位數以上密碼',u.value="";return}else s.patch(`${n}/660/users/${Z}`,u.value.trim()!==""?{password:u.value}:{name:ae.value,phone:j.value,email:q.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{le(),u.value.trim()!==""?(f("成功更新密碼！","",3e3),u.value=""):(f("成功更新會員資訊！","",3e3),localStorage.setItem("userName",r.data.name),localStorage.setItem("userPhoneNum",r.data.phone),localStorage.setItem("userEmail",r.data.email))}).catch(r=>{console.log(r),d("更新會員資訊失敗！")});else{p.querySelector(".js-emailError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤',q.value="";return}else{p.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',j.value="";return}}document.querySelector(".btn-close").addEventListener("click",()=>{p.classList.remove("was-validated")});const h=document.querySelector(".js-headImg"),Ie=document.querySelector("#img_uploads"),g=document.querySelector(".js-headImgView");function je(){const e=localStorage.getItem("headImg");e&&fe(e)}je();Ie.addEventListener("change",qe);function qe(e){const t=e.target.files[0];if(t){const a=new FileReader;a.onload=function(o){const r=o.target.result;localStorage.setItem("headImg",r),fe(r)},a.readAsDataURL(t)}}function fe(e){for(;g.firstChild;)g.removeChild(g.firstChild);const t=document.createElement("img");for(t.className="member-img rounded-circle img-fluid",t.alt="會員照片",t.src=e,g.appendChild(t);h.firstChild;)h.removeChild(h.firstChild);const a=document.createElement("img");a.className="member-img rounded-circle img-fluid",a.alt="會員首頁照片",a.src=e,h.appendChild(a)}const ke=document.querySelector(".js-clearImgBtn");ke.addEventListener("click",Ce);function Ce(e){for(e.preventDefault();g.firstChild;)g.removeChild(g.firstChild);const t=document.createElement("p");for(t.textContent="請選擇照片",t.className="mb-0",g.appendChild(t),localStorage.removeItem("headImg");h.firstChild;)h.removeChild(h.firstChild)}const E=document.querySelector(".addDogForm"),we=document.querySelector(".js-dogName"),xe=document.querySelector(".js-dogBreed"),Me=document.querySelector(".js-dogAge"),ie=document.querySelector(".js-swiperEnd"),ee=document.querySelector(".js-modalWrapper");async function Ee(){try{let e=!1;for(let a=1;a<=20;a++)if(localStorage.getItem(`dogImg${a}`)){e=!0;break}let t=await s.get(`${n}/660/dogs?userId=${Z}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}});e?(We(t.data),Ye(t.data)):(Ae(t.data),Be(t.data))}catch(e){throw console.log(e),new Error(e)}}Ee().catch(e=>{d(e)});E.addEventListener("submit",Te);function Te(e){if(e.preventDefault(),E.checkValidity())s.post(`${n}/660/dogs`,{userId:Z,name:we.value,breed:xe.value,age:Me.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{f("成功建立資訊卡！","",3e3),E.reset(),E.classList.remove("was-validated"),Ne(t.data),Le(t.data),$("#dogInfoModal").modal("hide")}).catch(t=>{console.log(t),d("建立失敗！")});else{e.stopPropagation();return}}function ve(e){return`
        <div class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${e.id}">
            <ul class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="member-img mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${e.id}"></div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal" data-bs-target="#dogInfoModal${e.id}"><i class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${e.name}</p>
                    <p>品種：${e.breed}</p>
                    <p class="mb-0">年齡：${e.age}</p>
                </li>
            </ul>
        </div>
    `}function he(e){return`
        <div class="modal fade" id="dogInfoModal${e.id}" tabindex="-1" aria-labelledby="dogInfoModal${e.id}"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="dogInfoModal${e.id}">編輯 - 毛孩資訊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-column align-items-center">
                        <form method="post" enctype="multipart/form-data">
                            <div>
                                <div class="overflow-hidden">
                                    <input type="file" id="dogImg_uploads${e.id}"
                                        class="position-absolute img-cursor rounded-circle member-img opacity-0 js-uploadImg"
                                        name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${e.id}">
                                </div>
                                <div
                                    class="member-img d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${e.id}">
                                    <p class="mb-0">請選擇照片</p>
                                </div>
                                <div class="text-center mb-32">
                                    <a href="#" class="link-danger js-clearDogImg" data-id="${e.id}">移除照片</a>
                                </div>
                            </div>
                        </form>
                        <form class="w-75 mx-auto mb-16 mb-md-32 needs-validation dogModalForm" novalidate>
                            <div class="form-floating mb-16">
                                <input type="text" class="form-control js-editDogName${e.id}"
                                    id="floatingDogName${e.id}" placeholder="name" value="${e.name}" required>
                                <label for="floatingDogName${e.id}">姓名</label>
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗姓名
                                </div>
                            </div>
                            <div class="form-floating mb-16">
                                <input type="text" class="form-control js-editDogBreed${e.id}"
                                    id="floatingDogBreed${e.id}" placeholder="breed" value="${e.breed}" required>
                                <label for="floatingDogBreed" ${e.id}>品種</label>
                                <div class="invalid-feedback">
                                    <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗品種
                                </div>
                            </div>
                            <div class="form-floating mb-16">
                                <input type="number" min="1" max="30" class="form-control js-editDogAge${e.id}"
                                    id="floatingDogAge${e.id}" placeholder="age" value="${e.age}" required>
                                <label for="floatingDogAge${e.id}">年齡</label>
                                <div class="invalid-feedback">
                                <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗年齡
                            </div>
                            </div>
                            <div class="d-flex flex-column">
                                <button type="submit" class="btn btn-primary py-14 text-white mb-16 js-editModalBtn"
                                    data-id="${e.id}">送出</button>
                                <button type="button" class="btn btn-danger py-14 text-white js-deleteSlideBtn"
                                    data-id="${e.id}">刪除</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `}function Ne(e){let t=ve(e);ie.insertAdjacentHTML("beforebegin",t)}function Le(e){let t=he(e);ee.insertAdjacentHTML("beforeend",t),Q.update()}function Ae(e){let t="";e.forEach(a=>{t+=ve(a)}),ie.insertAdjacentHTML("beforebegin",t),Q.update()}function Be(e){let t="";e.forEach(a=>{t+=he(a)}),ee.innerHTML=t}ee.addEventListener("click",Pe);function Pe(e){if(e.target.classList.contains("js-editModalBtn"))He(e);else if(e.target.classList.contains("js-deleteSlideBtn"))Re(e);else if(e.target.classList.contains("js-uploadImg")){let t=e.target.getAttribute("data-id"),a=document.querySelector(`#dogImg_uploads${t}`);a&&a.addEventListener("change",function(){Oe(a,t)})}else if(e.target.classList.contains("js-clearDogImg")){e.preventDefault();let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);for(;a.firstChild;)a.removeChild(a.firstChild);let r=document.createElement("p");for(r.textContent="請選擇照片",r.className="mb-0",a.appendChild(r),localStorage.removeItem(`dogImg${t}`);o.firstChild;)o.removeChild(o.firstChild)}}function He(e){e.preventDefault();const t=e.target.closest(".dogModalForm");if(t.checkValidity())ze(e);else{e.stopPropagation(),t.classList.add("was-validated");return}}async function ze(e){try{let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),r=document.querySelector(`.js-editDogAge${t}`),i=(await s.get(`${n}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;if(a.value.trim()===i.name&&o.value.trim()===i.breed&&r.value.trim()===i.age){d("毛孩資訊無變更！");return}else s.patch(`${n}/660/dogs/${t}`,{name:a.value,breed:o.value,age:r.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(m=>{let I=m.data,x=document.querySelector(`.swiper-slide[data-id="${t}"]`);Fe(x,I),f("成功更新資訊卡！","",3e3)}).catch(m=>{throw new Error(m)})}catch(t){console.log(t),d("更新資訊卡失敗！")}}function Fe(e,t){if(e){let a=localStorage.getItem(`dogImg${t.id}`);e.innerHTML=`
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="member-img mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${t.id}">
                            <img class="member-img rounded-circle img-fluid" src="${a||"../assets/images/member-img.png"}" alt="毛孩首頁照片">
                        </div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#dogInfoModal${t.id}"><i
                                class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${t.name}</p>
                    <p>品種：${t.breed}</p>
                    <p class="mb-0">年齡：${t.age}</p>
                </li>
            </ul>
        `}}document.querySelector(".swiper-wrapper").addEventListener("click",e=>{const t=e.target.closest("a");if(t.getAttribute("data-bs-target")!=="#dogInfoModal"){const a=t.getAttribute("data-bs-target").split("l")[1],o=document.querySelector(`#dogInfoModal${a}`);s.get(`${n}/660/dogs/${a}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{let l=r.data;o.querySelector(`.js-editDogName${a}`).value=l.name,o.querySelector(`.js-editDogBreed${a}`).value=l.breed,o.querySelector(`.js-editDogAge${a}`).value=l.age}).catch(r=>{console.log(r)})}});function Re(e){let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),r=document.querySelector(`.js-editDogAge${t}`);s.delete(`${n}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{let i=document.querySelector(`.swiper-slide[data-id="${t}"]`);Ve(i),localStorage.removeItem(`dogImg${t}`),f("成功刪除資訊卡！","",3e3),a.value="",o.value="",r.value="",$(`#dogInfoModal${t}`).modal("hide")}).catch(l=>{console.log(l),d("刪除資訊卡資敗！")})}function Ve(e){e&&(e.remove(),Q.update())}function Oe(e,t){const a=e.files[0];if(a){const o=new FileReader;o.onload=function(r){const l=r.target.result;localStorage.setItem(`dogImg${t}`,l),_e(l,t)},o.readAsDataURL(a)}}function _e(e,t){let a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);if(a&&o){for(;a.firstChild;)a.removeChild(a.firstChild);const r=document.createElement("img");for(r.className="member-img rounded-circle img-fluid",r.alt="毛孩照片",r.src=e,a.appendChild(r);o.firstChild;)o.removeChild(o.firstChild);const l=document.createElement("img");l.className="member-img rounded-circle img-fluid",l.alt="毛孩首頁照片",l.src=e,o.appendChild(l)}}function We(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
        <div
            class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${a.id}">
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="member-img mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${a.id}">
                            <img class="member-img rounded-circle img-fluid" src="${o||"../assets/images/member-img.png"}" alt="毛孩首頁照片">
                        </div>
                    </div>
                </li>
                <li class="col-auto">
                    <p class="fs-4">毛孩資訊
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#dogInfoModal${a.id}"><i
                                class="bi bi-pencil-square link-primary fs-4 ms-4 js-addModal"></i></a>
                    </p>
                    <p>姓名：${a.name}</p>
                    <p>品種：${a.breed}</p>
                    <p class="mb-0">年齡：${a.age}</p>
                </li>
            </ul>
        </div>
        `}),ie.insertAdjacentHTML("beforebegin",t),Q.update()}function Ye(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
        <div class="modal fade" id="dogInfoModal${a.id}" tabindex="-1" aria-labelledby="dogInfoModal${a.id}"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dogInfoModal${a.id}">編輯 - 毛孩資訊</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column align-items-center">
                            <form method="post" enctype="multipart/form-data">
                                <div>
                                    <div class="overflow-hidden">
                                        <input type="file" id="dogImg_uploads${a.id}"
                                            class="position-absolute img-cursor rounded-circle member-img opacity-0 js-uploadImg"
                                            name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${a.id}">
                                    </div>
                                    <div
                                        class="member-img d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${a.id}">
                                        <img class="member-img rounded-circle img-fluid" src="${o||"../assets/images/choose-img.png"}" alt="毛孩照片">
                                    </div>
                                    <div class="text-center mb-32">
                                        <a href="#" class="link-danger js-clearDogImg" data-id="${a.id}">移除照片</a>
                                    </div>
                                </div>
                            </form>
                            <form class="w-75 mx-auto mb-16 mb-md-32 needs-validation dogModalForm" novalidate>
                                <div class="form-floating mb-16">
                                    <input type="text" class="form-control js-editDogName${a.id}"
                                        id="floatingDogName${a.id}" placeholder="name" value="${a.name}" required>
                                        <label for="floatingDogName${a.id}">姓名</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗姓名
                                        </div>
                                </div>
                                <div class="form-floating mb-16">
                                    <input type="text" class="form-control js-editDogBreed${a.id}"
                                        id="floatingDogBreed${a.id}" placeholder="breed" value="${a.breed}" required>
                                        <label for="floatingDogBreed" ${a.id}>品種</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗品種
                                        </div>
                                </div>
                                <div class="form-floating mb-16">
                                    <input type="number" min="1" max="30" class="form-control js-editDogAge${a.id}"
                                        id="floatingDogAge${a.id}" placeholder="age" value="${a.age}" required>
                                        <label for="floatingDogAge${a.id}">年齡</label>
                                        <div class="invalid-feedback">
                                            <i class="bi bi-exclamation-circle me-4"></i> 請輸入狗狗年齡
                                        </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <button type="submit" class="btn btn-primary py-14 text-white mb-16 js-editModalBtn"
                                        data-id="${a.id}">送出</button>
                                    <button type="button" class="btn btn-danger py-14 text-white js-deleteSlideBtn"
                                        data-id="${a.id}">刪除</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `}),ee.innerHTML=t}$(function(){$.datepicker.regional["zh-TW"]={dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],dayNamesMin:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],prevText:"上月",nextText:"次月",weekHeader:"週"},$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$(".datepicker").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){}}),$(".startDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".endDate").val());o&&(a>o?(d("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):a.getDate()===o.getDate()&&a.getMonth()===o.getMonth()&&a.getFullYear()===o.getFullYear()&&(d("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val("")))}}),$(".endDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".startDate").val());o&&(o>a?(d("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o.getDate()===a.getDate()&&o.getMonth()===a.getMonth()&&o.getFullYear()===a.getFullYear()&&(d("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val("")))}})})});$(".startDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".endDate").val());o&&a>o?(d("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):o&&a.getTime()===o.getTime()&&(d("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val(""))}});$(".endDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".startDate").val());o&&o>a?(d("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o&&o.getTime()===a.getTime()&&(d("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val(""))}});$(document).ready(function(){$(".timepicker").timepicker({timeFormat:"h:i A",step:60,minTime:"9:00",maxTime:"21:00",startTime:"9:00",dynamic:!0}),$(".timepicker").on("changeTime",function(){$(this).val()})});(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const de=location.href.split("=")[1],se=document.querySelector(".js-dayCareRecord"),ne=document.querySelector(".js-cosmeticRecord"),ce=document.querySelector(".js-stayRecord");function S(){s.get(`${n}/660/reverse?userId=${de}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{if(e){let t=e.data;oe(t)}}).catch(e=>{console.log(e)})}S();function oe(e){let t="",a="",o="";e.forEach(r=>{r.service==="狗狗安親"?(t=`
            <tr>
                <th scope="row">
                    <a href="#" data-bs-toggle="modal"
                        data-bs-target="#dayCareModal" data-id=${r.id}>${r.orderNum}</a>
            </th>
            <td>${r.dogName}</td>
            <td>${r.date}</td>
            <td>${r.paradise}</td>
            <td>${r.contact}</td>
            <td>${r.phone}</td>
        </tr>
        `+t,se.innerHTML=t):r.service==="狗狗美容"?(a=`
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#cosmeticModal" data-id=${r.id}>${r.orderNum}</a>
                </th>
                <td>${r.dogName}</td>
                <td>${r.date}</td>
                <td>${r.plan}</td>
                <td>${r.paradise}</td>
                <td>${r.contact}</td>
                <td>${r.phone}</td>
            </tr>
            `+a,ne.innerHTML=a):r.service==="狗狗住宿"&&(o=`
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#stayModal" data-id=${r.id}>${r.orderNum}</a>
                </th>
                <td>${r.dogName}</td>
                <td>${r.room}</td>
                <td>${r.startDate}</td>
                <td>${r.endDate}</td>
                <td>${r.contact}</td>
                <td>${r.phone}</td>
            </tr>
            `+o,ce.innerHTML=o)})}se.addEventListener("click",me);function me(e){if(e.target.getAttribute("data-bs-toggle")){e.preventDefault();let t=e.target.getAttribute("data-id");s.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;o.service==="狗狗安親"?Je(o):o.service==="狗狗美容"?tt(o):o.service==="狗狗住宿"&&rt(o)}).catch(a=>{console.log(a)})}}const T=document.querySelector(".dayCareForm"),Ue=document.querySelector(".js-dayCareOrderNum"),k=document.querySelector(".js-dayCareDogName"),N=document.querySelector(".js-dayCareDate"),L=document.querySelector(".js-dayCareTime"),re=document.querySelector(".js-dayCareParadise"),A=document.querySelector(".js-dayCareRemark"),B=document.querySelector(".js-dayCareContact"),y=document.querySelector(".js-dayCarePhone"),Ge=document.querySelector(".js-editdayCare");function Je(e){Ue.textContent=e.orderNum,k.value=e.dogName,re.querySelectorAll(".form-check-input").forEach(t=>{t.checked=!1}),N.value=e.date,L.value=e.time,re.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),B.value=e.contact,y.value=e.phone,A.textContent=e.remark,T.setAttribute("data-id",e.id),ue(e)}function Ke(){s.get(`${n}/660/dogs?userId=${de}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{let t=e.data,a="";t.forEach(o=>{a+=`<option value="${o.name}">${o.name}</option>`}),k.innerHTML=a,C.innerHTML=a,w.innerHTML=a}).catch(e=>{console.log(e)})}Ke();T.addEventListener("submit",Qe);function Qe(e){if(e.preventDefault(),!T.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");s.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const r=document.querySelector('input[name="paradise"]:checked');if(o.dogName===k.value&&o.date===N.value.trim()&&o.time===L.value.trim()&&o.paradise===r.value&&o.remark===A.value.trim()&&o.contact===B.value.trim()&&o.phone===y.value.trim()){d("預約內容未更新！","請確認是否有變更");return}else if(X(y.value))s.patch(`${n}/660/reverse/${o.id}`,{dogName:k.value,date:N.value,time:L.value,paradise:r.value,contact:B.value,phone:y.value,remark:A.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{f("成功更新預約內容！","",3e3),S()}).catch(l=>{console.log(l)});else{T.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',y.value="";return}}).catch(a=>{console.log(a)})}function Xe(){let e=new Date,t=e.getFullYear(),a=e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1),o=e.getDate()>9?e.getDate():"0"+e.getDate();return t+"-"+a+"-"+o}function ue(e){const t=Xe(),a=new Date(t),o=new Date(e.date),r=Math.ceil((o-a)/(1e3*60*60*24)),l=[k,N,L,A,B,y,Ge,C,H,z,F,R,V,O,b,et],i=[...re.querySelectorAll(".form-check-input"),...pe.querySelectorAll(".form-check-input")],m=new Date(e.startDate),I=Math.ceil((m-a)/(1e3*60*60*24)),x=[ye,w,W,Y,U,G,K,D,J,ot];r<=3||I<=3?(l.forEach(c=>{c.setAttribute("disabled","")}),i.forEach(c=>{c.setAttribute("disabled","")}),x.forEach(c=>{c.setAttribute("disabled","")})):(l.forEach(c=>{c.removeAttribute("disabled","")}),i.forEach(c=>{c.removeAttribute("disabled","")}),x.forEach(c=>{c.removeAttribute("disabled","")}))}const P=document.querySelector(".cosmeticForm"),Ze=document.querySelector(".js-cosmeticOrderNum"),C=document.querySelector(".js-cosmeticDogName"),H=document.querySelector(".js-cosmeticDogSize"),z=document.querySelector(".js-cosmeticPlan"),F=document.querySelector(".js-cosmeticDate"),R=document.querySelector(".js-cosmeticTime"),pe=document.querySelector(".js-cosmeticParadise"),V=document.querySelector(".js-cosmeticRemark"),O=document.querySelector(".js-cosmeticContact"),b=document.querySelector(".js-cosmeticPhone"),et=document.querySelector(".js-editCosmetic");ne.addEventListener("click",me);function tt(e){Ze.textContent=e.orderNum,C.value=e.dogName,H.value=e.size,z.value=e.plan,F.value=e.date,R.value=e.time,pe.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),O.value=e.contact,b.value=e.phone,V.textContent=e.remark,P.setAttribute("data-id",e.id),ue(e)}P.addEventListener("submit",at);function at(e){if(e.preventDefault(),!P.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");s.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const r=document.querySelector('input[name="paradise"]:checked');if(o.dogName===C.value&&o.size===H.value&&o.plan===z.value&&o.date===F.value.trim()&&o.time===R.value.trim()&&o.paradise===r.value&&o.remark===V.value.trim()&&o.contact===O.value.trim()&&o.phone===b.value.trim()){d("預約內容未更新！","請確認是否有變更");return}else if(X(b.value))s.patch(`${n}/660/reverse/${o.id}`,{dogName:C.value,size:H.value,plan:z.value,date:F.value,time:R.value,paradise:r.value,contact:O.value,phone:b.value,remark:V.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{f("成功更新預約內容！","",3e3),S()}).catch(l=>{console.log(l)});else{P.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',b.value="";return}}).catch(a=>{console.log(a)})}const _=document.querySelector(".stayForm"),ye=document.querySelector(".js-stayOrderNum"),w=document.querySelector(".js-stayDogName"),W=document.querySelector(".js-stayRoom"),Y=document.querySelector(".js-stayStartDate"),U=document.querySelector(".js-stayEndDate"),G=document.querySelector(".js-stayTime"),J=document.querySelector(".js-stayRemark"),K=document.querySelector(".js-stayContact"),D=document.querySelector(".js-stayPhone"),ot=document.querySelector(".js-editStay");ce.addEventListener("click",me);function rt(e){ye.textContent=e.orderNum,w.value=e.dogName,W.value=e.room,Y.value=e.startDate,U.value=e.endDate,G.value=e.time,K.value=e.contact,D.value=e.phone,J.textContent=e.remark,_.setAttribute("data-id",e.id),ue(e)}_.addEventListener("submit",lt);function lt(e){if(e.preventDefault(),!_.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");s.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;if(o.dogName===w.value&&o.room===W.value&&o.startDate===Y.value.trim()&&o.endDate===U.value.trim()&&o.time===G.value.trim()&&o.remark===J.value.trim()&&o.contact===K.value.trim()&&o.phone===D.value.trim()){d("預約內容未更新！","請確認是否有變更");return}else if(X(D.value))s.patch(`${n}/660/reverse/${o.id}`,{dogName:w.value,room:W.value,startDate:Y.value,endDate:U.value,time:G.value,contact:K.value,phone:D.value,remark:J.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{f("成功更新預約內容！","",3e3),S()}).catch(r=>{console.log(r)});else{_.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',D.value="";return}}).catch(a=>{console.log(a)})}const it=document.querySelectorAll(".table-responsive");window.addEventListener("scroll",()=>{it.forEach(e=>{e.scrollHeight>385?(e.style.maxHeight="385px",e.classList.add("overflow-y-scroll")):(e.style.maxHeight="none",e.classList.remove("overflow-y-scroll"))})});let v="dayCare-tab";const be=document.querySelector(".js-monthSelect");let M,te;document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>{v=e.getAttribute("id"),be.value="",S()})});be.addEventListener("change",e=>{if(e.target.value==="")S();else{const t=e.target.value.split("月")[0];dt(t)}});function dt(e){M=[],te=[],s.get(`${n}/660/reverse?userId=${de}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{let a=t.data;v==="dayCare-tab"&&(M=a.filter(i=>i.service==="狗狗安親")),v==="cosmetic-tab"&&(M=a.filter(i=>i.service==="狗狗美容")),v==="stay-tab"&&(te=a.filter(i=>i.service==="狗狗住宿"));const o=M.filter(i=>parseInt(i.date.split("-")[1])===parseInt(e)),r=te.filter(i=>parseInt(i.startDate.split("-")[1])===parseInt(e));function l(i,m){let I=`
                    <tr>
                        <td colspan="7">您沒有這個月的${m}服務預約</td>
                    </tr>
                `;i.innerHTML=I}o.length===0?v==="dayCare-tab"?l(se,"安親"):v==="cosmetic-tab"&&l(ne,"美容"):oe(o),r.length===0?v==="stay-tab"&&l(ce,"住宿"):oe(r)}).catch(t=>{console.log(t)})}
