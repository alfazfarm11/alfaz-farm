/**
 * ALFAZ FARM - Core Logic Script
 * Fungsi: Mengelola multi-bahasa, render data dari JSON, 
 * dan interaktivitas galeri.
 */

let currentLang = 'id'; // Bahasa default

// Fungsi Utama untuk memuat konten dari data.json
async function loadContent() {
    try {
        // Mengambil data dari file JSON
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Gagal memuat file data.json");
        
        const data = await response.json();
        const content = data[currentLang]; // Mengambil objek bahasa yang dipilih

        // 1. Render Navigasi (Jika ID sesuai dengan urutan di JSON)
        const navLinks = document.querySelectorAll('.nav-links a');
        if (content.nav && navLinks.length > 0) {
            content.nav.forEach((text, index) => {
                if (navLinks[index]) navLinks[index].innerText = text;
            });
        }

        // 2. Render Hero & Profile Section
        document.getElementById('hero-tagline').innerText = content.profile.tagline;
        document.getElementById('hero-desc').innerText = content.profile.description;
        
        const aboutTextElement = document.getElementById('about-text');
        if (aboutTextElement) {
            aboutTextElement.innerText = content.profile.description;
        }

        // 3. Render Statistik (Total Lahan, Mitra, Kapasitas)
        const statsGrid = document.getElementById('stats-grid');
        statsGrid.innerHTML = ''; // Reset konten sebelumnya
        content.stats.forEach(stat => {
            statsGrid.innerHTML += `
                <div class="stat-item">
                    <h3>${stat.value}</h3>
                    <p>${stat.label}</p>
                </div>`;
        });

        // 4. Render Komoditas Utama (Jagung, Ubi, Rimpang)
        const commodityGrid = document.getElementById('commodity-grid');
        commodityGrid.innerHTML = ''; // Reset konten sebelumnya
        content.commodities.forEach(item => {
            commodityGrid.innerHTML += `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                    </div>
                </div>`;
        });

        // 5. Render Galeri Foto Lahan
        const galleryTitle = document.getElementById('gallery-h2');
        if (galleryTitle) galleryTitle.innerText = content.gallery_title;

        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid && data.images) {
            galleryGrid.innerHTML = ''; // Reset konten sebelumnya
            data.images.forEach(imgUrl => {
                galleryGrid.innerHTML += `
                    <div class="gallery-item">
                        <img src="${imgUrl}" alt="Alfaz Farm Gallery" loading="lazy">
                    </div>`;
            });
        }

    } catch (error) {
        console.error('Alfaz Farm Script Error:', error);
    }
}

// Fungsi untuk mengganti bahasa
function toggleLang() {
    // Tukar bahasa
    currentLang = (currentLang === 'id') ? 'en' : 'id';
    
    // Update teks tombol
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.innerText = (currentLang === 'id') ? 'EN' : 'ID';
    }

    // Muat ulang konten dengan bahasa baru
    loadContent();
    
    // Opsional: Simpan pilihan bahasa ke localStorage agar saat refresh tidak kembali ke awal
    localStorage.setItem('alfazLang', currentLang);
}

// Jalankan fungsi saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Cek jika ada preferensi bahasa tersimpan
    const savedLang = localStorage.getItem('alfazLang');
    if (savedLang) {
        currentLang = savedLang;
        const langBtn = document.getElementById('langBtn');
        if (langBtn) langBtn.innerText = (currentLang === 'id') ? 'EN' : 'ID';
    }
    
    loadContent();
});
