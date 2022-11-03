let loginLocalStorage = window.localStorage.getItem("tokenLogin");

if (!loginLocalStorage) {
  window.location.reload();
  window.location.pathname = "login.html";
}

setTimeout(() => {
  window.ontransitionstart;
  console.log("log");
}, 1000);

// Active seansni hisoblash
// registratsiyani style qilish responsive qilish, inputga ko'z qo'yish
// reqres ni ustozga tashlab berish,
