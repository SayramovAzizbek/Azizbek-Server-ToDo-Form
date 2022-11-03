const registerForm = document.querySelector(".register-form");
const registerInputUserName = document.querySelector(
  ".register-input-user-name"
);
const registerInputEmail = document.querySelector(".register-input-email");
const registerInputNumber = document.querySelector(".register-input-number");
const registerInputPassword = document.querySelector(
  ".register-input-password"
);
const registerInputPasswordBtn = document.querySelector(
  ".register-input-password-btn"
);

let userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInVzZXJfbmFtZSI6ImF6aXpiZWsiLCJwaG9uZSI6Ijk3MTU3NzUwOSIsImVtYWlsIjoic2F5cmFtb3Zheml6YmVrQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JGYzVTlNUzdWOXZzT2pYRUludTZSRnUvRzdxWEtyVTZLeklyNGVEbTdFTTR5TlpBN0w4Sy4yIiwiZGF0ZSI6IjIwMjItMTEtMDNUMDY6MDU6NTUuNTUyWiIsImlhdCI6MTY2NzQ1NTU1NX0.vbgVx6vJ-T5AqVDsSO7b38dCnZYIhlxE9BeThWlI45k";

registerForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let registerInputUserNameValue = registerInputUserName.value;
  let registerInputEmailValue = registerInputEmail.value;
  let registerInputNumberValue = registerInputNumber.value;
  let registerInputPasswordValue = registerInputPassword.value;
  console.log({
    registerInputUserNameValue,
    registerInputEmailValue,
    registerInputNumberValue,
    registerInputPasswordValue,
  });
  fetch("http://192.168.4.70:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: registerInputUserNameValue,
      email: registerInputEmailValue,
      phone: registerInputNumberValue,
      password: registerInputPasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("token", userToken);
      window.location.pathname = "index.html";
    })
    .catch((err) => console.log(err));
});

registerInputPasswordBtn.addEventListener("mousedown", () => {
  registerInputPassword.type = "text";
  registerInputPasswordBtn.classList.add("register-input-password-btn--on");
});

registerInputPasswordBtn.addEventListener("mouseup", () => {
  registerInputPassword.type = "password";
  registerInputPasswordBtn.classList.remove("register-input-password-btn--on");
});
