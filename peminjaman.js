document.addEventListener("DOMContentLoaded", () => {
  setDefaultDates();
  initFormHandler();
  initProfileDropdown();
  initLogoutEvents();
});

// Mengatur nilai default tanggal pinjam (hari ini) & jatuh tempo (7 hari setelahnya)
function setDefaultDates() {
  const tglPinjamInput = document.getElementById("tglPinjam");
  const tglJatuhTempoInput = document.getElementById("tglJatuhTempo");

  const today = new Date("2026-10-10"); // Disesuaikan dengan tanggal visual pada gambar
  const nextWeek = new Date("2026-10-17");

  tglPinjamInput.value = formatDateForInput(today);
  tglJatuhTempoInput.value = formatDateForInput(nextWeek);
}

function formatDateForInput(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Handler Submit Form Peminjaman
function initFormHandler() {
  const form = document.getElementById("peminjamanForm");
  const totalPeminjamanEl = document.getElementById("totalPeminjaman");
  const bukuDipinjamEl = document.getElementById("bukuDipinjam");
  const anggotaAktifEl = document.getElementById("anggotaAktif");

  let count = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const anggota = document.getElementById("pilihAnggota").value;
    const buku = document.getElementById("pilihBuku").value;

    if (!anggota || !buku) {
      alert("Harap pilih anggota dan buku terlebih dahulu!");
      return;
    }

    // Update Counter Ringkasan Peminjaman
    count++;
    totalPeminjamanEl.innerText = count;
    bukuDipinjamEl.innerText = count;
    anggotaAktifEl.innerText = count;

    alert("Transaksi peminjaman berhasil disimpan!");
    
    // Reset Form Pilihan
    document.getElementById("pilihAnggota").selectedIndex = 0;
    document.getElementById("pilihBuku").selectedIndex = 0;
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