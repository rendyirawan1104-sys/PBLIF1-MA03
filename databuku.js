// Initial Data Buku sesuai gambar[cite: 3]
let bukuData = [
  { kode: "B001", judul: "Laskar Pelangi", penulis: "Andrea Hirata", stok: 8 },
  { kode: "B002", judul: "Bumi Manusia", penulis: "Pramoedya A.", stok: 6 },
  { kode: "B003", judul: "Dilan 1990", penulis: "Pidi Baiq", stok: 10 },
  { kode: "B004", judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", stok: 7 },
  { kode: "B005", judul: "Matematika Dasar", penulis: "R. S. Prasetyo", stok: 12 }
];

let editKodeTarget = null;

document.addEventListener("DOMContentLoaded", () => {
  renderTable(bukuData);
  initSearch();
  initModal();
  initProfileDropdown();
  initLogoutEvents();
});

// Render Data Tabel Buku
function renderTable(data) {
  const tableBody = document.getElementById("bukuTableBody");
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #888;">Data tidak ditemukan.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.kode}</td>
      <td>${item.judul}</td>
      <td>${item.penulis}</td>
      <td>${item.stok}</td>
      <td>
        <button class="btn-action" onclick="editBuku('${item.kode}')">✏️ Edit</button>
        <button class="btn-action" onclick="hapusBuku('${item.kode}')">🗑️ Hapus</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Fungsi Filter Pencarian Live
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = bukuData.filter(buku => 
      buku.judul.toLowerCase().includes(keyword) || 
      buku.penulis.toLowerCase().includes(keyword) ||
      buku.kode.toLowerCase().includes(keyword)
    );
    renderTable(filteredData);
  });
}

// Handler Modal Tambah & Edit Buku
function initModal() {
  const modal = document.getElementById("bukuModal");
  const btnTambah = document.getElementById("btnTambahBuku");
  const btnBatal = document.getElementById("btnBatal");
  const bukuForm = document.getElementById("bukuForm");

  btnTambah.addEventListener("click", () => {
    editKodeTarget = null;
    document.getElementById("modalTitle").innerText = "Tambah Buku Baru";
    document.getElementById("kodeBuku").disabled = false;
    bukuForm.reset();
    modal.classList.remove("hidden");
  });

  btnBatal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  bukuForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const kode = document.getElementById("kodeBuku").value;
    const judul = document.getElementById("judulBuku").value;
    const penulis = document.getElementById("penulisBuku").value;
    const stok = parseInt(document.getElementById("stokBuku").value);

    if (editKodeTarget) {
      // Logic Update Data
      const index = bukuData.findIndex(b => b.kode === editKodeTarget);
      if (index !== -1) {
        bukuData[index] = { kode, judul, penulis, stok };
      }
    } else {
      // Logic Tambah Data Baru
      bukuData.push({ kode, judul, penulis, stok });
    }

    renderTable(bukuData);
    modal.classList.add("hidden");
  });
}

// Fungsi Edit Buku
function editBuku(kode) {
  const buku = bukuData.find(b => b.kode === kode);
  if (!buku) return;

  editKodeTarget = kode;
  document.getElementById("modalTitle").innerText = "Edit Data Buku";
  document.getElementById("kodeBuku").value = buku.kode;
  document.getElementById("kodeBuku").disabled = true; // Kode tidak diubah saat edit
  document.getElementById("judulBuku").value = buku.judul;
  document.getElementById("penulisBuku").value = buku.penulis;
  document.getElementById("stokBuku").value = buku.stok;

  document.getElementById("bukuModal").classList.remove("hidden");
}

// Fungsi Hapus Buku
function hapusBuku(kode) {
  if (confirm(`Apakah Anda yakin ingin menghapus buku dengan kode ${kode}?`)) {
    bukuData = bukuData.filter(b => b.kode !== kode);
    renderTable(bukuData);
  }
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