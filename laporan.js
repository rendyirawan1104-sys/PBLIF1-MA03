document.addEventListener("DOMContentLoaded", () => {
  initFilterPeriode();
  initProfileDropdown();
  initLogoutEvents();
});

// Handler Tombol Filter Periode
function initFilterPeriode() {
  const btnFilter = document.getElementById("btnFilterPeriode");

  btnFilter.addEventListener("click", () => {
    const periode = prompt("Masukkan rentang periode laporan (contoh: Oktober 2026):", "Oktober 2026");
    if (periode) {
      alert(`Menampilkan laporan untuk periode: ${periode}`);
    }
  });
}

// Toggle Profil Dropdown
function initProfileDropdown() {
  const btn = document.getElementById("userProfileBtn");
  const dropdown = document.getElementById("profileDropdown");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    dropdown.classList.add("hidden");
  });
}

// Handler Logout
function initLogoutEvents() {
  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      alert("Anda telah keluar.");
      window.location.href ="login.html";   
     }
  };

  document.getElementById("sidebarLogout").addEventListener("click", handleLogout);
  document.getElementById("dropdownLogout").addEventListener("click", handleLogout);
}