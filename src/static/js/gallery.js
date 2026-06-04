const Gallery = {
  async init() {
    console.log('[Gallery] init');
    await this.renderGrid('gallery-grid');
  },

  async loadMissions() {
    try {
      const res = await fetch('/mission/list.json');
      return (await res.json()).missions || [];
    } catch (e) {
      console.error('[Gallery] Failed to load missions:', e);
      return [];
    }
  },

  shown(missions) {
    return missions.filter(m => m.show !== false);
  },

  async renderGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const all = await this.loadMissions();
    const missions = this.shown(all);

    if (!missions.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    const loadPromises = missions.map(async (m) => {
      const mid = m.id || m.slug;
      if (!mid) return null;
      try {
        const res = await fetch(`/mission/${mid}/info.json`);
        if (!res.ok) return null;
        const info = await res.json();
        if (!Array.isArray(info.images) || !info.images.length) return null;
        return { mission: m, mid, images: info.images, info };
      } catch {
        return null;
      }
    });

    const results = (await Promise.all(loadPromises)).filter(Boolean);

    if (!results.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    container.innerHTML = results.map(({ mission, mid, images }) => {
      const featured = `/mission/${mid}/${images[0]}`;
      return `
        <div class="gallery-card" data-aos="fade-up">
          <div class="gallery-image">
            <img src="${featured}" alt="${mission.title || ''}" loading="lazy">
            <div class="gallery-overlay">
              <a href="/gallery-view?id=${mid}" class="btn-primary">View Gallery</a>
            </div>
          </div>
          <div class="gallery-content">
            <div class="gallery-meta">
              <span class="gallery-tag">${mission.tag || 'Mission'}</span>
              <span class="gallery-date">${mission.date || ''}</span>
            </div>
            <h3 class="gallery-title">${mission.title || ''}</h3>
            <p class="gallery-desc">${mission.description || ''}</p>
          </div>
        </div>`;
    }).join('');

    const imageCount = results.reduce((sum, r) => sum + r.images.length, 0);
    console.log('[Gallery] Rendered', imageCount, 'images across', results.length, 'missions');
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
};

document.addEventListener('DOMContentLoaded', () => Gallery.init());
