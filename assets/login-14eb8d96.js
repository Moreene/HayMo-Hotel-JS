import{j as c,e as s,s as u,a as g}from"./config-f1404084.js";import"./hamMenu-6b7faa69.js";import"./toTopBtn-95c6dae3.js";import n from"https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.1/esm/axios.js";const i=document.querySelector(".js-loginEmail"),a=document.querySelector(".js-loginPassword"),l=document.querySelector(".login-form");l.addEventListener("submit",f);function f(e){if(e.preventDefault(),!l.checkValidity()){e.stopPropagation();return}n.get(`${c}/users`).then(o=>{if(!o.data.find(d=>d.email===i.value.trim())){document.querySelector(".js-emailWrong").innerHTML='<i class="bi bi-exclamation-circle me-4"></i> 帳號錯誤，請重新確認',i.value="";return}p()}).catch(o=>{console.log(o),s("網路異常，無法登入！","")})}function p(){n.post(`${c}/login`,{email:i.value,password:a.value}).then(e=>{localStorage.setItem("userName",e.data.user.name),localStorage.setItem("userPhoneNum",e.data.user.phone),localStorage.setItem("userEmail",e.data.user.email),localStorage.setItem("userToken",e.data.accessToken),localStorage.setItem("userId",e.data.user.id),u("登入成功！","",3e3),l.reset(),l.classList.remove("was-validated"),setTimeout(()=>{window.location.href=`memberCenter.html?id=${localStorage.getItem("userId")}`},3e3)}).catch(e=>{e.response.data==="Incorrect password"?(a.value="",document.querySelector(".js-passwordError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i> 密碼錯誤，請重新確認'):e.message==="Network Error"?(console.log(e),s("網路異常，無法登入！","")):(console.log(e),s(e,""))})}const v=document.querySelector(".conceal"),m=document.querySelector("#conceal-icon");v.addEventListener("click",w);function w(e){e.preventDefault(),a.type==="password"?(a.type="text",m.className="fa-regular fa-eye-slash"):(a.type="password",m.className="fa-regular fa-eye")}const r=document.querySelector(".js-forgrtPasswordEmail"),t=document.querySelector(".modal-form");t.addEventListener("submit",h);function h(e){if(e.preventDefault(),t.checkValidity()){if(r.value.trim()!==""&&!g(r.value.trim())){document.querySelector(".js-emailError").innerHTML='<i class="bi bi-exclamation-circle me-4"></i>Email格式錯誤',r.value="";return}}else{e.stopPropagation();return}n.post(`${c}/forgotPasswords`,{email:r.value}).then(o=>{u("已寄出驗證信！","",3e3),t.reset(),t.classList.remove("was-validated"),$("#forgotPassword").modal("hide")}).catch(o=>{console.log(o),o.message==="Network Error"?s("網路異常，無法送出！",""):s(o,"")})}document.querySelector(".btn-close").addEventListener("click",()=>{t.classList.remove("was-validated")});document.querySelector(".js-canaelBtn").addEventListener("click",()=>{t.classList.remove("was-validated")});
