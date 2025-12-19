document.addEventListener('DOMContentLoaded', () => {
    // Mengambil data dari file JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Isi Profile & Hero
            document.getElementById('hero-tagline').innerText = data.profile.tagline;
            document.getElementById('hero-desc').innerText = data.profile.description;
            document.getElementById('about-text').innerText = data.profile.description;

            // Render Stats
            const statsGrid = document.getElementById('stats-grid');
            data.stats.forEach(stat => {
                statsGrid.innerHTML += `
                    <div class="stat-item">
                        <h3>${stat.value}</h3>
                        <p>${stat.label}</p>
                    </div>
                `;
            });

            // Render Komoditas
            const commodityGrid = document.getElementById('commodity-grid');
            data.commodities.forEach(item => {
                commodityGrid.innerHTML += `
                    <div class="card">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="card-content">
                            <h3>${item.name}</h3>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Gagal memuat data:', error));
});
