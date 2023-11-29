import{d as J}from"./bootstrap-cc139003.js";import"./centerHeader-436f0069.js";import"./hamMenu-6b7faa69.js";import c from"https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js";import{e as s,i as K,a as Se,j as n,s as g}from"./config-e6f0afb8.js";(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const Q=location.href.split("=")[1],ce=document.querySelector(".js-memberInfo"),Z=document.querySelector(".js-editName"),q=document.querySelector(".js-editPhone"),k=document.querySelector(".js-editEmail"),u=document.querySelector(".js-editPassword");async function te(){try{let t=(await c.get(`${n}/660/users/${Q}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;De(t)}catch(e){throw new Error(e)}}te().catch(e=>{s(e)});function De(e){ce.innerHTML=`
        <p class="fs-4">會員資訊
        <a href="#" data-bs-toggle="modal"
            data-bs-target="#memberInfoModal"><i
                class="bi bi-pencil-square link-primary fs-4 ms-4"></i></a>
        </p>
        <p>姓名：${e.name}</p>
        <p>手機：${e.phone}</p>
        <p class="mb-0">信箱：${e.email}</p>
        `,Z.value=e.name,q.value=e.phone,k.value=e.email}ce.addEventListener("click",function(e){e.target.closest("a")&&te()});const S=document.querySelector(".memberForm");S.addEventListener("submit",xe);function xe(e){if(e.preventDefault(),!S.checkValidity()){e.stopPropagation();return}const t=localStorage.getItem("userName"),a=localStorage.getItem("userPhoneNum"),o=localStorage.getItem("userEmail");if(Z.value.trim()===t&&q.value.trim()===a&&k.value.trim()===o&&u.value.trim()===""){s("會員資訊無變更！");return}if(K(q.value.trim()))if(Se(k.value.trim()))if(u.value.trim()!==""&&u.value.trim().length<6){u.classList.add("is-invalid"),S.querySelector(".js-passwordError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>密碼長度過短，請設定6位數以上密碼',u.value="";return}else c.patch(`${n}/660/users/${Q}`,u.value.trim()!==""?{password:u.value}:{name:Z.value,phone:q.value,email:k.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{te(),u.value.trim()!==""?(g("成功更新密碼！","",3e3),u.value=""):(g("成功更新會員資訊！","",3e3),localStorage.setItem("userName",l.data.name),localStorage.setItem("userPhoneNum",l.data.phone),localStorage.setItem("userEmail",l.data.email))}).catch(l=>{console.log(l),s("更新會員資訊失敗！")});else{S.querySelector(".js-emailError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤',k.value="";return}else{S.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',q.value="";return}}document.querySelector(".btn-close").addEventListener("click",()=>{S.classList.remove("was-validated")});const b=document.querySelector(".js-headImg"),we=document.querySelector("#img_uploads"),m=document.querySelector(".js-headImgView");function Ie(){const e=localStorage.getItem("headImg");e&&ne(e)}Ie();we.addEventListener("change",je);function je(e){const t=e.target.files[0];if(t){const a=new FileReader;a.onload=function(o){const l=o.target.result;localStorage.setItem("headImg",l),ne(l)},a.readAsDataURL(t)}}function ne(e){for(;m.firstChild;)m.removeChild(m.firstChild);const t=document.createElement("img");for(t.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",t.alt="會員照片",t.src=e,m.appendChild(t);b.firstChild;)b.removeChild(b.firstChild);const a=document.createElement("img");a.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",a.alt="會員首頁照片",a.src=e,b.appendChild(a)}const qe=document.querySelector(".js-clearImgBtn");qe.addEventListener("click",ke);function ke(e){for(e.preventDefault();m.firstChild;)m.removeChild(m.firstChild);const t=document.createElement("p");for(t.textContent="請選擇照片",t.className="mb-0",m.appendChild(t),localStorage.removeItem("headImg");b.firstChild;)b.removeChild(b.firstChild)}const L=document.querySelector(".addDogForm"),Ce=document.querySelector(".js-dogName"),Me=document.querySelector(".js-dogBreed"),Te=document.querySelector(".js-dogAge"),ae=document.querySelector(".js-swiperEnd"),X=document.querySelector(".js-modalWrapper");async function Ee(){try{let e=!1;for(let a=1;a<=20;a++)if(localStorage.getItem(`dogImg${a}`)){e=!0;break}let t=await c.get(`${n}/660/dogs?userId=${Q}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}});e?(Ye(t.data),Ue(t.data)):(Be(t.data),Pe(t.data))}catch(e){throw console.log(e),new Error(e)}}Ee().catch(e=>{s(e)});L.addEventListener("submit",Ne);function Ne(e){if(e.preventDefault(),L.checkValidity())c.post(`${n}/660/dogs`,{userId:Q,name:Ce.value,breed:Me.value,age:Te.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{g("成功建立資訊卡！","",3e3),L.reset(),L.classList.remove("was-validated"),Le(t.data),Ae(t.data),$("#dogInfoModal").modal("hide")}).catch(t=>{console.log(t),s("建立失敗！")});else{e.stopPropagation();return}}function ue(e){return`
        <div class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${e.id}">
            <ul class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${e.id}"></div>
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
    `}function me(e){return`
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
                                        class="position-absolute img-cursor rounded-circle w-120px h-120px w-lg-150px h-lg-150px opacity-0 js-uploadImg"
                                        name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${e.id}">
                                </div>
                                <div
                                    class="w-120px h-120px w-lg-150px h-lg-150px d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${e.id}">
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
    `}function Le(e){let t=ue(e);ae.insertAdjacentHTML("beforebegin",t)}function Ae(e){let t=me(e);X.insertAdjacentHTML("beforeend",t),J.update()}function Be(e){let t="";e.forEach(a=>{t+=ue(a)}),ae.insertAdjacentHTML("beforebegin",t),J.update()}function Pe(e){let t="";e.forEach(a=>{t+=me(a)}),X.innerHTML=t}X.addEventListener("click",ze);function ze(e){if(e.target.classList.contains("js-editModalBtn"))He(e);else if(e.target.classList.contains("js-deleteSlideBtn"))Ve(e);else if(e.target.classList.contains("js-uploadImg")){let t=e.target.getAttribute("data-id"),a=document.querySelector(`#dogImg_uploads${t}`);a&&a.addEventListener("change",function(){_e(a,t)})}else if(e.target.classList.contains("js-clearDogImg")){e.preventDefault();let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);for(;a.firstChild;)a.removeChild(a.firstChild);let l=document.createElement("p");for(l.textContent="請選擇照片",l.className="mb-0",a.appendChild(l),localStorage.removeItem(`dogImg${t}`);o.firstChild;)o.removeChild(o.firstChild)}}function He(e){e.preventDefault();const t=e.target.closest(".dogModalForm");if(t.checkValidity())Fe(e);else{e.stopPropagation(),t.classList.add("was-validated");return}}async function Fe(e){try{let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),l=document.querySelector(`.js-editDogAge${t}`),i=(await c.get(`${n}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;if(a.value.trim()===i.name&&o.value.trim()===i.breed&&l.value.trim()===i.age){s("毛孩資訊無變更！");return}else c.patch(`${n}/660/dogs/${t}`,{name:a.value,breed:o.value,age:l.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(d=>{let f=d.data,$e=document.querySelector(`.swiper-slide[data-id="${t}"]`);Re($e,f),g("成功更新資訊卡！","",3e3)}).catch(d=>{throw new Error(d)})}catch(t){console.log(t),s("更新資訊卡失敗！")}}function Re(e,t){if(e){let a=localStorage.getItem(`dogImg${t.id}`);e.innerHTML=`
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${t.id}">
                            <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${a||"../assets/images/member-img.png"}" alt="毛孩首頁照片">
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
        `}}document.querySelector(".swiper-wrapper").addEventListener("click",e=>{const t=e.target.closest("a");if(t.getAttribute("data-bs-target")!=="#dogInfoModal"){const a=t.getAttribute("data-bs-target").split("l")[1],o=document.querySelector(`#dogInfoModal${a}`);c.get(`${n}/660/dogs/${a}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{let r=l.data;o.querySelector(`.js-editDogName${a}`).value=r.name,o.querySelector(`.js-editDogBreed${a}`).value=r.breed,o.querySelector(`.js-editDogAge${a}`).value=r.age}).catch(l=>{console.log(l)})}});function Ve(e){let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),l=document.querySelector(`.js-editDogAge${t}`);c.delete(`${n}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{let i=document.querySelector(`.swiper-slide[data-id="${t}"]`);Oe(i),localStorage.removeItem(`dogImg${t}`),g("成功刪除資訊卡！","",3e3),a.value="",o.value="",l.value="",$(`#dogInfoModal${t}`).modal("hide")}).catch(r=>{console.log(r),s("刪除資訊卡資敗！")})}function Oe(e){e&&(e.remove(),J.update())}function _e(e,t){const a=e.files[0];if(a){const o=new FileReader;o.onload=function(l){const r=l.target.result;localStorage.setItem(`dogImg${t}`,r),We(r,t)},o.readAsDataURL(a)}}function We(e,t){let a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);if(a&&o){for(;a.firstChild;)a.removeChild(a.firstChild);const l=document.createElement("img");for(l.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",l.alt="毛孩照片",l.src=e,a.appendChild(l);o.firstChild;)o.removeChild(o.firstChild);const r=document.createElement("img");r.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",r.alt="毛孩首頁照片",r.src=e,o.appendChild(r)}}function Ye(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
        <div
            class="swiper-slide card border-black py-24 py-xl-48 h-100 d-flex flex-column align-items-center" data-id="${a.id}">
            <ul
                class="row flex-column align-items-center flex-xl-row gy-24 gy-xl-0 my-auto w-100">
                <li class="col-md-6 col-xl-5">
                    <div class="text-center">
                        <div class="w-120px h-120px w-lg-150px h-lg-150px mx-auto bg-size-cover bg-repeat-no default-photo js-dogImg${a.id}">
                            <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${o||"../assets/images/member-img.png"}" alt="毛孩首頁照片">
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
        `}),ae.insertAdjacentHTML("beforebegin",t),J.update()}function Ue(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
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
                                            class="position-absolute img-cursor rounded-circle w-120px h-120px w-lg-150px h-lg-150px opacity-0 js-uploadImg"
                                            name="image_uploads" accept=".jpg, .jpeg, .png" data-id="${a.id}">
                                    </div>
                                    <div
                                        class="w-120px h-120px w-lg-150px h-lg-150px d-flex justify-content-center align-items-center bg-black-40 rounded-circle mb-8 js-dogImgView${a.id}">
                                        <img class="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid" src="${o||"../assets/images/choose-img.png"}" alt="毛孩照片">
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
    `}),X.innerHTML=t}$(function(){$.datepicker.regional["zh-TW"]={dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],dayNamesMin:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],prevText:"上月",nextText:"次月",weekHeader:"週"},$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$(".datepicker").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){}}),$(".startDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".endDate").val());o&&(a>o?(s("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):a.getDate()===o.getDate()&&a.getMonth()===o.getMonth()&&a.getFullYear()===o.getFullYear()&&(s("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val("")))}}),$(".endDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".startDate").val());o&&(o>a?(s("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o.getDate()===a.getDate()&&o.getMonth()===a.getMonth()&&o.getFullYear()===a.getFullYear()&&(s("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val("")))}})})});$(".startDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".endDate").val());o&&a>o?(s("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):o&&a.getTime()===o.getTime()&&(s("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val(""))}});$(".endDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".startDate").val());o&&o>a?(s("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o&&o.getTime()===a.getTime()&&(s("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val(""))}});$(document).ready(function(){$(".timepicker").timepicker({timeFormat:"h:i A",step:60,minTime:"9:00",maxTime:"21:00",startTime:"9:00",dynamic:!0}),$(".timepicker").on("changeTime",function(){$(this).val()})});(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const oe=location.href.split("=")[1],le=document.querySelector(".js-dayCareRecord"),re=document.querySelector(".js-cosmeticRecord"),ie=document.querySelector(".js-stayRecord");function I(){c.get(`${n}/660/reverse?userId=${oe}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{if(e){let t=e.data;ge(t)}}).catch(e=>{console.log(e)})}I();function ge(e){let t="",a="",o="";e.forEach(l=>{l.service==="安親"?(t=`
            <tr>
                <th scope="row">
                    <a href="#" data-bs-toggle="modal"
                        data-bs-target="#dayCareModal" data-id=${l.id}>${l.orderNum}</a>
            </th>
            <td>${l.dogName}</td>
            <td>${l.date}</td>
            <td>${l.paradise}</td>
            <td>${l.contact}</td>
            <td>${l.phone}</td>
        </tr>
        `+t,le.innerHTML=t):l.service==="美容"?(a=`
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#cosmeticModal" data-id=${l.id}>${l.orderNum}</a>
                </th>
                <td>${l.dogName}</td>
                <td>${l.date}</td>
                <td>${l.plan}</td>
                <td>${l.paradise}</td>
                <td>${l.contact}</td>
                <td>${l.phone}</td>
            </tr>
            `+a,re.innerHTML=a):l.service==="住宿"&&(o=`
                <tr>
                    <th scope="row">
                        <a href="#" data-bs-toggle="modal"
                            data-bs-target="#stayModal" data-id=${l.id}>${l.orderNum}</a>
                </th>
                <td>${l.dogName}</td>
                <td>${l.room}</td>
                <td>${l.startDate}</td>
                <td>${l.endDate}</td>
                <td>${l.contact}</td>
                <td>${l.phone}</td>
            </tr>
            `+o,ie.innerHTML=o)})}le.addEventListener("click",de);function de(e){if(e.target.getAttribute("data-bs-toggle")){e.preventDefault();let t=e.target.getAttribute("data-id");c.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;o.service==="安親"?Ke(o):o.service==="美容"?at(o):o.service==="住宿"&&rt(o)}).catch(a=>{console.log(a)})}}const A=document.querySelector(".dayCareForm"),Ge=document.querySelector(".js-dayCareOrderNum"),T=document.querySelector(".js-dayCareDogName"),B=document.querySelector(".js-dayCareDate"),P=document.querySelector(".js-dayCareTime"),ee=document.querySelector(".js-dayCareParadise"),z=document.querySelector(".js-dayCareRemark"),H=document.querySelector(".js-dayCareContact"),D=document.querySelector(".js-dayCarePhone"),Je=document.querySelector(".js-editdayCare"),fe=document.querySelector(".js-dayCareTotal");function Ke(e){Ge.textContent=e.orderNum,T.value=e.dogName,ee.querySelectorAll(".form-check-input").forEach(t=>{t.checked=!1}),B.value=e.date,P.value=e.time,ee.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),H.value=e.contact,D.value=e.phone,z.textContent=e.remark,fe.value=e.total,A.setAttribute("data-id",e.id),se(e)}function Qe(){c.get(`${n}/660/dogs?userId=${oe}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{let t=e.data,a="";t.forEach(o=>{a+=`<option value="${o.name}">${o.name}</option>`}),T.innerHTML=a,E.innerHTML=a,N.innerHTML=a}).catch(e=>{console.log(e)})}Qe();A.addEventListener("submit",Xe);function Xe(e){if(e.preventDefault(),!A.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const l=document.querySelector('input[name="paradise"]:checked');if(o.dogName===T.value&&o.date===B.value.trim()&&o.time===P.value.trim()&&o.paradise===l.value&&o.remark===z.value.trim()&&o.contact===H.value.trim()&&o.phone===D.value.trim()){s("預約內容未更新！","請確認是否有變更");return}else if(!K(D.value)){A.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',D.value="";return}let r=parseInt(fe.value);l.value==="是"?r+=200:r-=200,c.patch(`${n}/660/reverse/${o.id}`,{dogName:T.value,date:B.value,time:P.value,paradise:l.value,contact:H.value,phone:D.value,remark:z.value,total:r},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(i=>{g("成功更新預約內容！","",3e3),I(),$("#dayCareModal").modal("hide")}).catch(i=>{console.log(i)})}).catch(a=>{console.log(a)})}function Ze(){let e=new Date,t=e.getFullYear(),a=e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1),o=e.getDate()>9?e.getDate():"0"+e.getDate();return t+"-"+a+"-"+o}function se(e){const t=Ze(),a=new Date(t),o=new Date(e.date),l=Math.ceil((o-a)/(1e3*60*60*24)),r=[T,B,P,z,H,D,Je,E,p,h,R,V,O,_,x,tt,he,N,y,C,M,Y,G,w,U,lt],i=[...ee.querySelectorAll(".form-check-input"),...ve.querySelectorAll(".form-check-input")];l<=3?(r.forEach(d=>{d.setAttribute("disabled","")}),i.forEach(d=>{d.setAttribute("disabled","")})):(r.forEach(d=>{d.removeAttribute("disabled","")}),i.forEach(d=>{d.removeAttribute("disabled","")}))}const F=document.querySelector(".cosmeticForm"),et=document.querySelector(".js-cosmeticOrderNum"),E=document.querySelector(".js-cosmeticDogName"),p=document.querySelector(".js-cosmeticDogSize"),h=document.querySelector(".js-cosmeticPlan"),R=document.querySelector(".js-cosmeticDate"),V=document.querySelector(".js-cosmeticTime"),ve=document.querySelector(".js-cosmeticParadise"),O=document.querySelector(".js-cosmeticRemark"),_=document.querySelector(".js-cosmeticContact"),x=document.querySelector(".js-cosmeticPhone"),tt=document.querySelector(".js-editCosmetic"),pe=document.querySelector(".js-cosmeticTotal");re.addEventListener("click",de);function at(e){et.textContent=e.orderNum,E.value=e.dogName,p.value=e.size,h.value=e.plan,R.value=e.date,V.value=e.time,ve.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),_.value=e.contact,x.value=e.phone,O.textContent=e.remark,pe.value=e.total,F.setAttribute("data-id",e.id),se(e)}F.addEventListener("submit",ot);function ot(e){if(e.preventDefault(),!F.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const l=document.querySelector('input[name="paradise"]:checked');if(o.dogName===E.value&&o.size===p.value&&o.plan===h.value&&o.date===R.value.trim()&&o.time===V.value.trim()&&o.paradise===l.value&&o.remark===O.value.trim()&&o.contact===_.value.trim()&&o.phone===x.value.trim()){s("預約內容未更新！","請確認是否有變更");return}else if(!K(x.value)){F.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',x.value="";return}let r,i,d=parseInt(pe.value);p.value==="小於10kg"?r=200:p.value==="10-20kg"?r=300:p.value==="大於20kg"&&(r=450),h.value==="基礎洗香香"?i=550:h.value==="進階洗香香"?i=800:h.value==="高級洗香香"&&(i=1e3),d=r+i+(l.value==="是"?200:0),c.patch(`${n}/660/reverse/${o.id}`,{dogName:E.value,size:p.value,plan:h.value,date:R.value,time:V.value,paradise:l.value,contact:_.value,phone:x.value,remark:O.value,total:d},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(f=>{g("成功更新預約內容！","",3e3),I(),$("#cosmeticModal").modal("hide")}).catch(f=>{console.log(f)})}).catch(a=>{console.log(a)})}const W=document.querySelector(".stayForm"),he=document.querySelector(".js-stayOrderNum"),N=document.querySelector(".js-stayDogName"),y=document.querySelector(".js-stayRoom"),C=document.querySelector(".js-stayStartDate"),M=document.querySelector(".js-stayEndDate"),Y=document.querySelector(".js-stayTime"),U=document.querySelector(".js-stayRemark"),G=document.querySelector(".js-stayContact"),w=document.querySelector(".js-stayPhone"),lt=document.querySelector(".js-editStay"),ye=document.querySelector(".js-stayTotal");ie.addEventListener("click",de);function rt(e){he.textContent=e.orderNum,N.value=e.dogName,y.value=e.room,C.value=e.startDate,M.value=e.endDate,Y.value=e.time,G.value=e.contact,w.value=e.phone,U.textContent=e.remark,ye.value=e.total,W.setAttribute("data-id",e.id),se(e)}W.addEventListener("submit",it);function it(e){if(e.preventDefault(),!W.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${n}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;if(o.dogName===N.value&&o.room===y.value&&o.startDate===C.value.trim()&&o.endDate===M.value.trim()&&o.time===Y.value.trim()&&o.remark===U.value.trim()&&o.contact===G.value.trim()&&o.phone===w.value.trim()){s("預約內容未更新！","請確認是否有變更");return}else if(!K(w.value)){W.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',w.value="";return}let l=parseInt(ye.value);const r=new Date(C.value),i=new Date(M.value),d=Math.ceil((i-r)/(1e3*60*60*24));y.value==="小狗香香房"?l=1e3*d:y.value==="忠犬呼嚕房"?l=1350*d:y.value==="大狗好眠房"&&(l=1600*d),c.patch(`${n}/660/reverse/${o.id}`,{dogName:N.value,room:y.value,startDate:C.value,endDate:M.value,time:Y.value,contact:G.value,phone:w.value,remark:U.value,total:l},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(f=>{g("成功更新預約內容！","",3e3),I(),$("#stayModal").modal("hide")}).catch(f=>{console.log(f)})}).catch(a=>{console.log(a)})}const dt=document.querySelectorAll(".table-responsive");document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",st)});function st(){dt.forEach(e=>{e.scrollHeight>385?(e.style.maxHeight="385px",e.classList.add("overflow-y-scroll")):(e.style.maxHeight="none",e.classList.remove("overflow-y-scroll"))})}let v="dayCare-tab";const be=document.querySelector(".js-monthSelect");let j;document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>{v=e.getAttribute("id"),be.value="",I()})});be.addEventListener("change",e=>{if(e.target.value==="")I();else{const t=e.target.value.split("月")[0];ct(t)}});function ct(e){j=[],c.get(`${n}/660/reverse?userId=${oe}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{let a=t.data;v==="dayCare-tab"&&(j=a.filter(r=>r.service==="安親")),v==="cosmetic-tab"&&(j=a.filter(r=>r.service==="美容")),v==="stay-tab"&&(j=a.filter(r=>r.service==="住宿"));const o=j.filter(r=>parseInt(r.date.split("-")[1])===parseInt(e));function l(r,i){let d=`
                    <tr>
                        <td colspan="7">您沒有這個月的${i}服務預約</td>
                    </tr>
                `;r.innerHTML=d}o.length===0?v==="dayCare-tab"?l(le,"安親"):v==="cosmetic-tab"?l(re,"美容"):v==="stay-tab"&&l(ie,"住宿"):ge(o)}).catch(t=>{console.log(t)})}
