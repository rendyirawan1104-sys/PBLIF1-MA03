let laporanData = [
  { anggota: "Andi Pratama", judul: "Laskar Pelangi", jatuhTempo: "17/10/2026", tglKembali: "-", status: "Dipinjam" },
  { anggota: "Siti Nurhaliza", judul: "Bumi Manusia", jatuhTempo: "16/10/2026", tglKembali: "-", status: "Dipinjam" },
  { anggota: "Budi Santoso", judul: "Dilan 1990", jatuhTempo: "15/10/2026", tglKembali: "-", status: "Dipinjam" },
  { anggota: "Rina Marlina", judul: "Negeri 5 Menara", jatuhTempo: "14/10/2026", tglKembali: "10/10/2026", status: "Dikembalikan" },
  { anggota: "Fahri Ananda", judul: "Matematika Dasar", jatuhTempo: "13/10/2026", tglKembali: "-", status: "Dipinjam" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  initActionButtons();
  initProfileDropdown();
  initLogoutEvents();
});

function renderTable() {
  const tableBody = document.getElementById("laporanTableBody");
  tableBody.innerHTML = "";

  laporanData.forEach((item, index) => {
    const row = document.createElement("tr");

    const badgeClass = item.status === "Dikembalikan" ? "badge-dikembalikan" : "badge-dipinjam";

    row.innerHTML = `
      <td>${item.anggota}</td>
      <td>${item.judul}</td>
      <td>${item.jatuhTempo}</td>
      <td>${item.tglKembali}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;

    tableBody.appendChild(row);
  });
}

function initActionButtons() {
  const btnTandai = document.getElementById("btnTandaiDikembalikan");
  const btnFilter = document.getElementById("btnFilterPeriode");

  btnTandai.addEventListener("click", () => {
    const itemDipinjam = laporanData.find(item => item.status === "Dipinjam");
    
    if (itemDipinjam) {
      itemDipinjam.status = "Dikembalikan";
      itemDipinjam.tglKembali = "10/10/2026";
      renderTable();
      alert(`Buku "${itemDipinjam.judul}" milik ${itemDipinjam.anggota} telah ditandai Dikembalikan!`);
    } else {
      alert("Semua peminjaman telah dikembalikan.");
    }
  });

  btnFilter.addEventListener("click", () => {
    alert("Fitur Filter Periode akan menampilkan dialog pemfilteran tanggal.");
  });
}

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
