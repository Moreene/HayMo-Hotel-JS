// json url
export const jsonURL ='http://localhost:3000'; 

// 驗證手機格式
export function isValidPhone(num) {
    const phomeRegex = /^09\d{8}$/;
    return phomeRegex.test(num);
};

// 驗證email格式
export function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

// Swal.fire-Success
export function successHint(title, txt, sec) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: txt,
        timer: sec,
    });
};

// Swal.fire-Error
export function errorHint(title, txt) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: txt,
    });
};