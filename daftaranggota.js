// Initial Data Anggota sesuai gambar[cite: 4]
let anggotaData = [
  { id: "A001", nama: "Andi Pratama", kelas: "X TKJ 1", nohp: "081234567890" },
  { id: "A002", nama: "Siti Nurhaliza", kelas: "X MM 1", nohp: "081298765432" },
  { id: "A003", nama: "Budi Santoso", kelas: "XI TKJ 2", nohp: "085612345678" },
  { id: "A004", nama: "Rina Marlina", kelas: "XI MM 1", nohp: "082345678901" },
  { id: "A005", nama: "Fahri Ananda", kelas: "XII TKJ 1", nohp: "087812345678" }
];

let editIdTarget = null;

document.addEventListener("DOMContentLoaded", () => {
  renderTable(anggotaData);
  initSearch();
  initModal();
  initProfileDropdown();
  initLogoutEvents();
});

// Render Data Tabel Anggota
function renderTable(data) {
  const tableBody = document.getElementById("anggotaTableBody");
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: #888;">Data anggota tidak ditemukan.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nama}</td>
      <td>${item.kelas}</td>
      <td>${item.nohp}</td>
      <td>
        <button class="btn-action" onclick="editAnggota('${item.id}')">✏️ Edit</button>
        <button class="btn-action" onclick="hapusAnggota('${item.id}')">🗑️ Hapus</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Fungsi Filter Pencarian Live (Berdasarkan Nama, ID, atau Kelas)
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = anggotaData.filter(anggota => 
      anggota.nama.toLowerCase().includes(keyword) || 
      anggota.id.toLowerCase().includes(keyword) ||
      anggota.kelas.toLowerCase().includes(keyword)
    );
    renderTable(filteredData);
  });
}

// Handler Modal Tambah & Edit Anggota
function initModal() {
  const modal = document.getElementById("anggotaModal");
  const btnTambah = document.getElementById("btnTambahAnggota");
  const btnBatal = document.getElementById("btnBatal");
  const anggotaForm = document.getElementById("anggotaForm");

  btnTambah.addEventListener("click", () => {
    editIdTarget = null;
    document.getElementById("modalTitle").innerText = "Tambah Anggota Baru";
    document.getElementById("idAnggota").disabled = false;
    anggotaForm.reset();
    modal.classList.remove("hidden");
  });

  btnBatal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  anggotaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("idAnggota").value;
    const nama = document.getElementById("namaAnggota").value;
    const kelas = document.getElementById("kelasAnggota").value;
    const nohp = document.getElementById("nohpAnggota").value;

    if (editIdTarget) {
      // Update Data Anggota
      const index = anggotaData.findIndex(a => a.id === editIdTarget);
      if (index !== -1) {
        anggotaData[index] = { id, nama, kelas, nohp };
      }
    } else {
      // Tambah Data Anggota Baru
      anggotaData.push({ id, nama, kelas, nohp });
    }

    renderTable(anggotaData);
    modal.classList.add("hidden");
  });
}

// Fungsi Edit Anggota
function editAnggota(id) {
  const anggota = anggotaData.find(a => a.id === id);
  if (!anggota) return;

  editIdTarget = id;
  document.getElementById("modalTitle").innerText = "Edit Data Anggota";
  document.getElementById("idAnggota").value = anggota.id;
  document.getElementById("idAnggota").disabled = true; // ID tidak diubah saat edit
  document.getElementById("namaAnggota").value = anggota.nama;
  document.getElementById("kelasAnggota").value = anggota.kelas;
  document.getElementById("nohpAnggota").value = anggota.nohp;

  document.getElementById("anggotaModal").classList.remove("hidden");
}

// Fungsi Hapus Anggota
function hapusAnggota(id) {
  if (confirm(`Apakah Anda yakin ingin menghapus anggota dengan ID ${id}?`)) {
    anggotaData = anggotaData.filter(a => a.id !== id);
    renderTable(anggotaData);
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
      window.location.href ="ProyekloginPBL.html";
    }
  };

  document.getElementById("sidebarLogout").addEventListener("click", handleLogout);
  document.getElementById("dropdownLogout").addEventListener("click", handleLogout);
}