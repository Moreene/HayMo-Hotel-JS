import{e as n,i as Q,a as je,j as s,s as f,d as X}from"./config-eec7a752.js";import"./userLogOut-a06a2f49.js";import"./hamMenu-6b7faa69.js";import c from"https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js";(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const x=location.href.split("=")[1],ne=document.querySelector(".js-memberInfo"),te=document.querySelector(".js-editName"),q=document.querySelector(".js-editPhone"),M=document.querySelector(".js-editEmail"),g=document.querySelector(".js-editPassword");async function oe(){try{let t=(await c.get(`${s}/660/users/${x}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;Ce(t)}catch(e){throw new Error(e)}}oe().catch(e=>{n(e)});function Ce(e){ne.innerHTML=`
        <p class="fs-4">會員資訊
        <a href="#" data-bs-toggle="modal"
            data-bs-target="#memberInfoModal"><i
                class="bi bi-pencil-square link-primary fs-4 ms-4"></i></a>
        </p>
        <p>姓名：${e.name}</p>
        <p>手機：${e.phone}</p>
        <p class="mb-0">信箱：${e.email}</p>
        `,te.value=e.name,q.value=e.phone,M.value=e.email}ne.addEventListener("click",function(e){e.target.closest("a")&&oe()});const w=document.querySelector(".memberForm");w.addEventListener("submit",qe);function qe(e){if(e.preventDefault(),!w.checkValidity()){e.stopPropagation();return}const t=localStorage.getItem("userName"),a=localStorage.getItem("userPhoneNum"),o=localStorage.getItem("userEmail");if(te.value.trim()===t&&q.value.trim()===a&&M.value.trim()===o&&g.value.trim()===""){n("會員資訊無變更！");return}if(Q(q.value.trim()))if(je(M.value.trim()))if(g.value.trim()!==""&&g.value.trim().length<6){g.classList.add("is-invalid"),w.querySelector(".js-passwordError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>密碼長度過短，請設定6位數以上密碼',g.value="";return}else c.patch(`${s}/660/users/${x}`,g.value.trim()!==""?{password:g.value}:{name:te.value,phone:q.value,email:M.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{oe(),g.value.trim()!==""?(f("成功更新密碼！","",3e3),g.value=""):(f("成功更新會員資訊！","",3e3),localStorage.setItem("userName",r.data.name),localStorage.setItem("userPhoneNum",r.data.phone),localStorage.setItem("userEmail",r.data.email))}).catch(r=>{console.log(r),n("更新會員資訊失敗！")});else{w.querySelector(".js-emailError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤',M.value="";return}else{w.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',q.value="";return}}document.querySelector(".btn-close").addEventListener("click",()=>{w.classList.remove("was-validated")});const S=document.querySelector(".js-headImg"),Me=document.querySelector("#img_uploads"),h=document.querySelector(".js-headImgView");function Te(){c.get(`${s}/660/users/${x}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{let t=e.data;if(t.hasOwnProperty("headImg")){const a=t.headImg;a!==""&&ue(a)}}).catch(e=>{console.log(e)})}Te();Me.addEventListener("change",Ee);function Ee(e){const t=e.target.files[0];if(t){const a=new FileReader;a.onload=function(o){const r=o.target.result;c.patch(`${s}/660/users/${x}`,{headImg:r},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{ue(r)}).catch(l=>{console.log(l)})},a.readAsDataURL(t)}}function ue(e){for(;h.firstChild;)h.removeChild(h.firstChild);const t=document.createElement("img");for(t.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",t.alt="會員照片",t.src=e,h.appendChild(t);S.firstChild;)S.removeChild(S.firstChild);const a=document.createElement("img");a.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",a.alt="會員首頁照片",a.src=e,S.appendChild(a)}const Ne=document.querySelector(".js-clearImgBtn");Ne.addEventListener("click",Le);function Le(e){for(e.preventDefault();h.firstChild;)h.removeChild(h.firstChild);const t=document.createElement("p");for(t.textContent="請選擇照片",t.className="mb-0",h.appendChild(t),localStorage.removeItem("headImg");S.firstChild;)S.removeChild(S.firstChild);c.patch(`${s}/660/users/${x}`,{headImg:""},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{a.data}).catch(a=>{console.log(a)})}const B=document.querySelector(".addDogForm"),Ae=document.querySelector(".js-dogName"),Be=document.querySelector(".js-dogBreed"),Pe=document.querySelector(".js-dogAge"),re=document.querySelector(".js-swiperEnd"),Z=document.querySelector(".js-modalWrapper");async function ze(){try{let t=(await c.get(`${s}/660/dogs?userId=${x}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;t.forEach(o=>{o.hasOwnProperty("dogImg")&&o.dogImg!==""&&localStorage.setItem(`dogImg${o.id}`,o.dogImg)}),t.some(o=>localStorage.getItem(`dogImg${o.id}`))?(Xe(t),Ze(t)):(Ve(t),Oe(t))}catch(e){throw console.log(e),new Error(e)}}ze().catch(e=>{n(e)});B.addEventListener("submit",He);function He(e){if(e.preventDefault(),B.checkValidity())c.post(`${s}/660/dogs`,{userId:x,name:Ae.value,breed:Be.value,age:Pe.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{f("成功建立資訊卡！","",3e3),B.reset(),B.classList.remove("was-validated"),Re(t.data),Fe(t.data),$("#dogInfoModal").modal("hide")}).catch(t=>{console.log(t),n("建立失敗！")});else{e.stopPropagation();return}}function me(e){return`
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
    `}function ge(e){return`
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
    `}function Re(e){let t=me(e);re.insertAdjacentHTML("beforebegin",t)}function Fe(e){let t=ge(e);Z.insertAdjacentHTML("beforeend",t),X.update()}function Ve(e){let t="";e.forEach(a=>{t+=me(a)}),re.insertAdjacentHTML("beforebegin",t),X.update()}function Oe(e){let t="";e.forEach(a=>{t+=ge(a)}),Z.innerHTML=t}Z.addEventListener("click",_e);function _e(e){if(e.target.classList.contains("js-editModalBtn"))Ue(e);else if(e.target.classList.contains("js-deleteSlideBtn"))Ge(e);else if(e.target.classList.contains("js-uploadImg")){let t=e.target.getAttribute("data-id"),a=document.querySelector(`#dogImg_uploads${t}`);a&&a.addEventListener("change",function(){Ke(a,t)})}else if(e.target.classList.contains("js-clearDogImg")){e.preventDefault();let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);for(;a.firstChild;)a.removeChild(a.firstChild);let r=document.createElement("p");for(r.textContent="請選擇照片",r.className="mb-0",a.appendChild(r),localStorage.removeItem(`dogImg${t}`);o.firstChild;)o.removeChild(o.firstChild);c.patch(`${s}/660/dogs/${t}`,{dogImg:""},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{l.data}).catch(l=>{console.log(l)})}}function Ue(e){e.preventDefault();const t=e.target.closest(".dogModalForm");if(t.checkValidity())We(e);else{e.stopPropagation(),t.classList.add("was-validated");return}}async function We(e){try{let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),r=document.querySelector(`.js-editDogAge${t}`),i=(await c.get(`${s}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}})).data;if(a.value.trim()===i.name&&o.value.trim()===i.breed&&r.value.trim()===i.age){n("毛孩資訊無變更！");return}else c.patch(`${s}/660/dogs/${t}`,{name:a.value,breed:o.value,age:r.value},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(d=>{let u=d.data,ke=document.querySelector(`.swiper-slide[data-id="${t}"]`);Ye(ke,u),f("成功更新資訊卡！","",3e3)}).catch(d=>{throw new Error(d)})}catch(t){console.log(t),n("更新資訊卡失敗！")}}function Ye(e,t){if(e){let a=localStorage.getItem(`dogImg${t.id}`);e.innerHTML=`
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
        `}}document.querySelector(".swiper-wrapper").addEventListener("click",e=>{const t=e.target.closest("a");if(t){if(t.getAttribute("data-bs-target")==="#dogInfoModal")return;{const a=t.getAttribute("data-bs-target").split("l")[1],o=document.querySelector(`#dogInfoModal${a}`);c.get(`${s}/660/dogs/${a}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(r=>{let l=r.data;o.querySelector(`.js-editDogName${a}`).value=l.name,o.querySelector(`.js-editDogBreed${a}`).value=l.breed,o.querySelector(`.js-editDogAge${a}`).value=l.age}).catch(r=>{console.log(r)})}}});function Ge(e){let t=e.target.getAttribute("data-id"),a=document.querySelector(`.js-editDogName${t}`),o=document.querySelector(`.js-editDogBreed${t}`),r=document.querySelector(`.js-editDogAge${t}`);c.delete(`${s}/660/dogs/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(l=>{let i=document.querySelector(`.swiper-slide[data-id="${t}"]`);Je(i),localStorage.removeItem(`dogImg${t}`),f("成功刪除資訊卡！","",3e3),a.value="",o.value="",r.value="",$(`#dogInfoModal${t}`).modal("hide")}).catch(l=>{console.log(l),n("刪除資訊卡資敗！")})}function Je(e){e&&(e.remove(),X.update())}function Ke(e,t){const a=e.files[0];if(a){const o=new FileReader;o.onload=function(r){const l=r.target.result;c.patch(`${s}/660/dogs/${t}`,{dogImg:l},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(i=>{Qe(l,t)}).catch(i=>{console.log(i)})},o.readAsDataURL(a)}}function Qe(e,t){let a=document.querySelector(`.js-dogImgView${t}`),o=document.querySelector(`.js-dogImg${t}`);if(a&&o){for(;a.firstChild;)a.removeChild(a.firstChild);const r=document.createElement("img");for(r.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",r.alt="毛孩照片",r.src=e,a.appendChild(r);o.firstChild;)o.removeChild(o.firstChild);const l=document.createElement("img");l.className="w-120px h-120px w-lg-150px h-lg-150px rounded-circle img-fluid",l.alt="毛孩首頁照片",l.src=e,o.appendChild(l)}}function Xe(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
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
        `}),re.insertAdjacentHTML("beforebegin",t),X.update()}function Ze(e){let t="";e.forEach(a=>{let o=localStorage.getItem(`dogImg${a.id}`);t+=`
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
    `}),Z.innerHTML=t}$(function(){$.datepicker.regional["zh-TW"]={dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],dayNamesMin:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],prevText:"上月",nextText:"次月",weekHeader:"週"},$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$(".datepicker").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){}}),$(".startDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".endDate").val());o&&(a>o?(n("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):a.getDate()===o.getDate()&&a.getMonth()===o.getMonth()&&a.getFullYear()===o.getFullYear()&&(n("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val("")))}}),$(".endDate").datepicker({beforeShow:function(e,t){t.dpDiv.addClass("custom-datepicker")},dateFormat:"yy-mm-dd",minDate:1,maxDate:"+3M",onSelect:function(e,t){const a=new Date(e),o=new Date($(".startDate").val());o&&(o>a?(n("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o.getDate()===a.getDate()&&o.getMonth()===a.getMonth()&&o.getFullYear()===a.getFullYear()&&(n("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val("")))}})})});$(".startDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".endDate").val());o&&a>o?(n("入住日期不能大於退房日期！","請重新選擇日期"),$(".startDate").val("")):o&&a.getTime()===o.getTime()&&(n("入住日期不能與退房日期相同！","請重新選擇日期"),$(".startDate").val(""))}});$(".endDate").on("change",function(e){const t=e.target.value;if(t){const a=new Date(t),o=new Date($(".startDate").val());o&&o>a?(n("退房日期不能小於入住日期！","請重新選擇日期"),$(".endDate").val("")):o&&o.getTime()===a.getTime()&&(n("入住日期不能與退房日期相同！","請重新選擇日期"),$(".endDate").val(""))}});$(document).ready(function(){$(".timepicker").timepicker({timeFormat:"h:i A",step:60,minTime:"9:00",maxTime:"21:00",startTime:"9:00",dynamic:!0}),$(".timepicker").on("changeTime",function(){$(this).val()})});(function(){var e=document.querySelectorAll(".needs-validation");Array.prototype.slice.call(e).forEach(function(t){t.addEventListener("submit",function(a){t.checkValidity()||(a.preventDefault(),a.stopPropagation()),t.classList.add("was-validated")},!1)})})();const ee=location.href.split("=")[1],le=document.querySelector(".js-dayCareRecord"),ie=document.querySelector(".js-cosmeticRecord"),de=document.querySelector(".js-stayRecord"),he=document.querySelector(".js-historyDayCare"),fe=document.querySelector(".js-historyCosmetic"),pe=document.querySelector(".js-historyStay");function I(){c.get(`${s}/660/reverse?userId=${ee}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{if(e){let t=e.data,a=t.filter(r=>r.isChecked===!1),o=t.filter(r=>r.isChecked===!0);ve(a),ye(o)}}).catch(e=>{console.log(e)})}I();function ve(e){let t="",a="",o="";e.forEach(r=>{r.service==="安親"?(t=`
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
        `+t,le.innerHTML=t):r.service==="美容"?(a=`
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
            `+a,ie.innerHTML=a):r.service==="住宿"&&(o=`
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
            `+o,de.innerHTML=o)})}function ye(e){let t="",a="",o="";e.forEach(r=>{r.service==="安親"?(t=`
            <tr>
                <th scope="row">${r.orderNum}</th>
                <td>${r.dogName}</td>
                <td>${r.date}</td>
                <td>${r.paradise}</td>
                <td>${r.contact}</td>
                <td>${r.phone}</td>
            </tr>
        `+t,he.innerHTML=t):r.service==="美容"?(a=`
                <tr>
                    <th scope="row">${r.orderNum}</th>
                    <td>${r.dogName}</td>
                    <td>${r.date}</td>
                    <td>${r.plan}</td>
                    <td>${r.paradise}</td>
                    <td>${r.contact}</td>
                    <td>${r.phone}</td>
                </tr>
            `+a,fe.innerHTML=a):r.service==="住宿"&&(o=`
                <tr>
                    <th scope="row">${r.orderNum}</th>
                    <td>${r.dogName}</td>
                    <td>${r.room}</td>
                    <td>${r.startDate}</td>
                    <td>${r.endDate}</td>
                    <td>${r.contact}</td>
                    <td>${r.phone}</td>
                </tr>
            `+o,pe.innerHTML=o)})}le.addEventListener("click",se);function se(e){if(e.target.getAttribute("data-bs-toggle")){e.preventDefault();let t=e.target.getAttribute("data-id");c.get(`${s}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;o.service==="安親"?at(o):o.service==="美容"?st(o):o.service==="住宿"&&ut(o)}).catch(a=>{console.log(a)})}}const P=document.querySelector(".dayCareForm"),et=document.querySelector(".js-dayCareOrderNum"),N=document.querySelector(".js-dayCareDogName"),z=document.querySelector(".js-dayCareDate"),H=document.querySelector(".js-dayCareTime"),ae=document.querySelector(".js-dayCareParadise"),R=document.querySelector(".js-dayCareRemark"),F=document.querySelector(".js-dayCareContact"),k=document.querySelector(".js-dayCarePhone"),tt=document.querySelector(".js-editdayCare"),$e=document.querySelector(".js-dayCareTotal");function at(e){et.textContent=e.orderNum,N.value=e.dogName,ae.querySelectorAll(".form-check-input").forEach(t=>{t.checked=!1}),z.value=e.date,H.value=e.time,ae.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),F.value=e.contact,k.value=e.phone,R.textContent=e.remark,$e.value=e.total,P.setAttribute("data-id",e.id),ce(e)}function ot(){c.get(`${s}/660/dogs?userId=${ee}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(e=>{let t=e.data,a="";t.forEach(o=>{a+=`<option value="${o.name}">${o.name}</option>`}),N.innerHTML=a,L.innerHTML=a,A.innerHTML=a}).catch(e=>{console.log(e)})}ot();P.addEventListener("submit",rt);function rt(e){if(e.preventDefault(),!P.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${s}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const r=document.querySelector('input[name="paradise"]:checked');if(o.dogName===N.value&&o.date===z.value.trim()&&o.time===H.value.trim()&&o.paradise===r.value&&o.remark===R.value.trim()&&o.contact===F.value.trim()&&o.phone===k.value.trim()){n("預約內容未更新！","請確認是否有變更");return}else if(!Q(k.value)){P.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',k.value="";return}let l=parseInt($e.value);r.value==="是"?l+=200:l-=200,c.patch(`${s}/660/reverse/${o.id}`,{dogName:N.value,date:z.value,time:H.value,paradise:r.value,contact:F.value,phone:k.value,remark:R.value,total:l},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(i=>{f("成功更新預約內容！","",3e3),I(),$("#dayCareModal").modal("hide")}).catch(i=>{console.log(i)})}).catch(a=>{console.log(a)})}function lt(){let e=new Date,t=e.getFullYear(),a=e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1),o=e.getDate()>9?e.getDate():"0"+e.getDate();return t+"-"+a+"-"+o}function ce(e){const t=lt(),a=new Date(t),o=new Date(e.date),r=Math.ceil((o-a)/(1e3*60*60*24)),l=[N,z,H,R,F,k,tt,L,y,b,O,_,U,W,j,dt,Se,A,D,T,E,G,K,C,J,nt],i=[...ae.querySelectorAll(".form-check-input"),...be.querySelectorAll(".form-check-input")];r<=3?(l.forEach(d=>{d.setAttribute("disabled","")}),i.forEach(d=>{d.setAttribute("disabled","")})):(l.forEach(d=>{d.removeAttribute("disabled","")}),i.forEach(d=>{d.removeAttribute("disabled","")}))}const V=document.querySelector(".cosmeticForm"),it=document.querySelector(".js-cosmeticOrderNum"),L=document.querySelector(".js-cosmeticDogName"),y=document.querySelector(".js-cosmeticDogSize"),b=document.querySelector(".js-cosmeticPlan"),O=document.querySelector(".js-cosmeticDate"),_=document.querySelector(".js-cosmeticTime"),be=document.querySelector(".js-cosmeticParadise"),U=document.querySelector(".js-cosmeticRemark"),W=document.querySelector(".js-cosmeticContact"),j=document.querySelector(".js-cosmeticPhone"),dt=document.querySelector(".js-editCosmetic"),De=document.querySelector(".js-cosmeticTotal");ie.addEventListener("click",se);function st(e){it.textContent=e.orderNum,L.value=e.dogName,y.value=e.size,b.value=e.plan,O.value=e.date,_.value=e.time,be.querySelectorAll(".form-check-input").forEach(t=>{t.checked=t.value===e.paradise}),W.value=e.contact,j.value=e.phone,U.textContent=e.remark,De.value=e.total,V.setAttribute("data-id",e.id),ce(e)}V.addEventListener("submit",ct);function ct(e){if(e.preventDefault(),!V.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${s}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;const r=document.querySelector('input[name="paradise"]:checked');if(o.dogName===L.value&&o.size===y.value&&o.plan===b.value&&o.date===O.value.trim()&&o.time===_.value.trim()&&o.paradise===r.value&&o.remark===U.value.trim()&&o.contact===W.value.trim()&&o.phone===j.value.trim()){n("預約內容未更新！","請確認是否有變更");return}else if(!Q(j.value)){V.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',j.value="";return}let l,i,d=parseInt(De.value);y.value==="小於10kg"?l=200:y.value==="10-20kg"?l=300:y.value==="大於20kg"&&(l=450),b.value==="基礎洗香香"?i=550:b.value==="進階洗香香"?i=800:b.value==="高級洗香香"&&(i=1e3),d=l+i+(r.value==="是"?200:0),c.patch(`${s}/660/reverse/${o.id}`,{dogName:L.value,size:y.value,plan:b.value,date:O.value,time:_.value,paradise:r.value,contact:W.value,phone:j.value,remark:U.value,total:d},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(u=>{f("成功更新預約內容！","",3e3),I(),$("#cosmeticModal").modal("hide")}).catch(u=>{console.log(u)})}).catch(a=>{console.log(a)})}const Y=document.querySelector(".stayForm"),Se=document.querySelector(".js-stayOrderNum"),A=document.querySelector(".js-stayDogName"),D=document.querySelector(".js-stayRoom"),T=document.querySelector(".js-stayStartDate"),E=document.querySelector(".js-stayEndDate"),G=document.querySelector(".js-stayTime"),J=document.querySelector(".js-stayRemark"),K=document.querySelector(".js-stayContact"),C=document.querySelector(".js-stayPhone"),nt=document.querySelector(".js-editStay"),xe=document.querySelector(".js-stayTotal");de.addEventListener("click",se);function ut(e){Se.textContent=e.orderNum,A.value=e.dogName,D.value=e.room,T.value=e.startDate,E.value=e.endDate,G.value=e.time,K.value=e.contact,C.value=e.phone,J.textContent=e.remark,xe.value=e.total,Y.setAttribute("data-id",e.id),ce(e)}Y.addEventListener("submit",mt);function mt(e){if(e.preventDefault(),!Y.checkValidity()){e.stopPropagation();return}let t=e.target.getAttribute("data-id");c.get(`${s}/660/reverse/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(a=>{let o=a.data;if(o.dogName===A.value&&o.room===D.value&&o.startDate===T.value.trim()&&o.endDate===E.value.trim()&&o.time===G.value.trim()&&o.remark===J.value.trim()&&o.contact===K.value.trim()&&o.phone===C.value.trim()){n("預約內容未更新！","請確認是否有變更");return}else if(!Q(C.value)){Y.querySelector(".js-errorPhone").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>手機號碼格式錯誤',C.value="";return}let r=parseInt(xe.value);const l=new Date(T.value),i=new Date(E.value),d=Math.ceil((i-l)/(1e3*60*60*24));D.value==="小狗香香房"?r=1e3*d:D.value==="忠犬呼嚕房"?r=1350*d:D.value==="大狗好眠房"&&(r=1600*d),c.patch(`${s}/660/reverse/${o.id}`,{dogName:A.value,room:D.value,startDate:T.value,endDate:E.value,time:G.value,contact:K.value,phone:C.value,remark:J.value,total:r},{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(u=>{f("成功更新預約內容！","",3e3),I(),$("#stayModal").modal("hide")}).catch(u=>{console.log(u)})}).catch(a=>{console.log(a)})}const gt=document.querySelectorAll(".table-responsive");document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",ht)});function ht(){gt.forEach(e=>{e.scrollHeight>385?(e.style.maxHeight="385px",e.classList.add("overflow-y-scroll")):(e.style.maxHeight="none",e.classList.remove("overflow-y-scroll"))})}let p="dayCare-tab";const Ie=document.querySelector(".js-monthSelect");let m,v="history-dayCare-tab";const we=document.querySelector(".js-historyMonthSelect");document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>{p=e.getAttribute("id"),v=e.getAttribute("id"),Ie.value="",we.value="",I()})});Ie.addEventListener("change",e=>{if(e.target.value==="")I();else{const t=e.target.value.split("月")[0];ft(t)}});we.addEventListener("change",e=>{if(e.target.value==="")I();else{const t=e.target.value.split("月")[0];pt(t)}});function ft(e){m=[],c.get(`${s}/660/reverse?userId=${ee}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{let o=t.data.filter(i=>i.isChecked===!1);p==="dayCare-tab"&&(m=o.filter(i=>i.service==="安親")),p==="cosmetic-tab"&&(m=o.filter(i=>i.service==="美容")),p==="stay-tab"&&(m=o.filter(i=>i.service==="住宿"));const r=m.filter(i=>parseInt(i.date.split("-")[1])===parseInt(e));function l(i,d){let u=`
                    <tr>
                        <td colspan="7">您沒有這個月的${d}服務預約</td>
                    </tr>
                `;i.innerHTML=u}r.length===0?p==="dayCare-tab"?l(le,"安親"):p==="cosmetic-tab"?l(ie,"美容"):p==="stay-tab"&&l(de,"住宿"):ve(r)}).catch(t=>{console.log(t)})}function pt(e){m=[],c.get(`${s}/660/reverse?userId=${ee}`,{headers:{authorization:`Bearer ${localStorage.getItem("userToken")}`}}).then(t=>{let o=t.data.filter(i=>i.isChecked===!0);v==="history-dayCare-tab"&&(m=o.filter(i=>i.service==="安親")),v==="history-cosmetic-tab"&&(m=o.filter(i=>i.service==="美容")),v==="history-stay-tab"&&(m=o.filter(i=>i.service==="住宿"));const r=m.filter(i=>parseInt(i.date.split("-")[1])===parseInt(e));function l(i,d){let u=`
                    <tr>
                        <td colspan="7">您沒有這個月的${d}服務預約</td>
                    </tr>
                `;i.innerHTML=u}r.length===0?v==="history-dayCare-tab"?l(he,"安親"):v==="history-cosmetic-tab"?l(fe,"美容"):v==="history-stay-tab"&&l(pe,"住宿"):ye(r)}).catch(t=>{console.log(t)})}
