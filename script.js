/**
 * ALFAZ FARM - Core Logic Script
 */

const state = {
    currentLang: localStorage.getItem('alfazLang') || 'id',
    currentTheme: localStorage.getItem('alfazTheme') || 'light'
};

// --- 1. Init Theme ---
function initTheme() {
    document.body.className = state.currentTheme + '-theme';
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.innerHTML = state.currentTheme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }
}

// --- 2. Load Content ---
async function loadContent() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Data.json not found");
        
        const data = await response.json();
        const content = data[state.currentLang];

        // Update Nav
        const navLinks = document.querySelectorAll('.nav-links a');
        content.nav.forEach((text, i) => { if(navLinks[i]) navLinks[i].innerText = text; });

        // Update Hero
        document.getElementById('hero-tagline').innerText = content.profile.tagline;
        document.getElementById('hero-desc').innerText = content.profile.description;
        document.getElementById('about-text').innerText = content.profile.description;

        // Update Stats
        renderStats(content.stats);

        // Update Commodities
        renderCommodities(content.commodities);

        // Update Gallery
        if (document.getElementById('gallery-h2')) {
            document.getElementById('gallery-h2').innerText = content.gallery_title;
            renderGallery(data.images);
        }

    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

// --- 3. Render Helpers ---
function renderStats(stats) {
    const container = document.getElementById('stats-grid');
    container.innerHTML = stats.map(s => `
        <div class="stat-item">
            <h3>${s.value}</h3>
            <p>${s.label}</p>
        </div>
    `).join('');
}

function renderCommodities(items) {
    const container = document.getElementById('commodity-grid');
    container.innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderGallery(images) {
    const container = document.getElementById('gallery-grid');
    if (!container || !images) return;
    container.innerHTML = images.map(src => `
        <div class="gallery-item">
            <img src="${src}" alt="Farm Gallery" loading="lazy">
        </div>
    `).join('');
}

// --- 4. Controls ---
function toggleLang() {
    state.currentLang = state.currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('alfazLang', state.currentLang);
    document.getElementById('langText').innerText = state.currentLang.toUpperCase();
    loadContent();
}

function toggleTheme() {
    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('alfazTheme', state.currentTheme);
    initTheme();
}

// --- 5. Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadContent();
    
    // Set initial lang text
    const langBtnText = document.getElementById('langText');
    if (langBtnText) langBtnText.innerText = state.currentLang.toUpperCase();
});
