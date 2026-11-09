const peminjamanData = [
  { nama: "Andi Pratama", judul: "Laskar Pelangi", tglPinjam: "10/10/2026", jatuhTempo: "17/10/2026", status: "Dipinjam" },
  { nama: "Siti Nurhaliza", judul: "Bumi Manusia", tglPinjam: "09/10/2026", jatuhTempo: "16/10/2026", status: "Dipinjam" },
  { nama: "Budi Santoso", judul: "Dilan 1990", tglPinjam: "08/10/2026", jatuhTempo: "15/10/2026", status: "Dipinjam" },
  { nama: "Rina Marlina", judul: "Negeri 5 Menara", tglPinjam: "07/10/2026", jatuhTempo: "14/10/2026", status: "Dipinjam" },
  { nama: "Fahri Ananda", judul: "Matematika Dasar", tglPinjam: "06/10/2026", jatuhTempo: "13/10/2026", status: "Terlambat" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  initLogoutEvents();
});

function renderTable() {
  const tableBody = document.getElementById("peminjamanTableBody");
  tableBody.innerHTML = "";

  peminjamanData.forEach(item => {
    const row = document.createElement("tr");
    const badgeClass = item.status === "Terlambat" ? "badge-terlambat" : "badge-dipinjam";

    row.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.judul}</td>
      <td>${item.tglPinjam}</td>
      <td>${item.jatuhTempo}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;

    tableBody.appendChild(row);
  });
}

function initProfileDropdown() {
     const navItems = document.querySelectorAll(".nav-item:not(.nav-logout)");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");
    });
  });
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

function initLogoutEvents() {
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = confirm("Apakah Anda yakin ingin keluar dari sistem?");
    if (confirmLogout) {
      alert("Anda telah keluar.");
      window.location.href = "login.html"
    }
  };

  document.getElementById("sidebarLogout").addEventListener("click", handleLogout);
  document.getElementById("dropdownLogout").addEventListener("click", handleLogout);
}
