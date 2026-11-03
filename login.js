document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toRegisterBtn = document.getElementById('toRegister');
  const toLoginBtn = document.getElementById('toLogin');

  // Pindah ke tampilan login
  toLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Handle submit login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Proses masuk berhasil!');
    window.location.href = "dasboard.html"
  });

});