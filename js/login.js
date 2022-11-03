const loginForm = document.querySelector(".login-form");
const loginInputEmail = document.querySelector(".login-email");
const loginInputPassword = document.querySelector(".login-passowrd");
const loginInputPasswordBtn = document.querySelector(
  ".login-input-password-btn"
);

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let loginInputEmailValue = loginInputEmail.value;
  let loginInputPasswordValue = loginInputPassword.value;
  console.log({
    loginInputEmailValue,
    loginInputPasswordValue,
  });
  fetch("http://192.168.4.70:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginInputEmailValue,
      password: loginInputPasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("tokenLogin", data.token);
      window.location.pathname = "index.html";
    })
    .catch((err) => console.log(err));
});

loginInputPasswordBtn.addEventListener("mousedown", () => {
  loginInputPassword.type = "text";
  loginInputPasswordBtn.classList.add("login-input-password-btn--on");
});

loginInputPasswordBtn.addEventListener("mouseup", () => {
  loginInputPassword.type = "password";
  loginInputPasswordBtn.classList.remove("login-input-password-btn--on");
});
