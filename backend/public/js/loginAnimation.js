const changeLoginBtn = document.getElementById('change-sign-in');
const login_button = document.getElementById('login_button');
const reg_button = document.getElementById('reg_button');

const newAccount = document.querySelector('.sign-up-link');
const signInBtn = document.querySelector('.sign-in-btn');

let loggingIn = true;
reg_button.style.display = "none";

changeLoginBtn.addEventListener('click', () => {
  if (loggingIn) {

    newAccount.textContent = 'Already have an account?';
    reg_button.style.display = "none";
    login_button.style.display = "inline";
    changeLoginBtn.textContent = 'Sign up';
  } else {
    newAccount.textContent = 'New to Focus Mode?';
    reg_button.style.display = "inline";
    login_button.style.display = "none";
    changeLoginBtn.textContent = 'Log in';
  }

  loggingIn = !loggingIn;
});
