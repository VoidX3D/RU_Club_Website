const Gallery = {
  async init() {
    console.log('[Gallery] init');
    await this.renderGrouped('gallery-grid');
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

  async renderGrouped(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const all = await this.loadMissions();
    const missions = this.shown(all);

    if (!missions.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    let totalImages = 0;
    const loadPromises = missions.map(async (m) => {
      const mid = m.id || m.slug;
      if (!mid) return null;
      try {
        const res = await fetch(`/mission/${mid}/info.json`);
        if (!res.ok) return null;
        const info = await res.json();
        if (!Array.isArray(info.images) || !info.images.length) return null;
        totalImages += info.images.length;
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
      const imgPath = images[0];
      const featured = `/mission/${mid}/${imgPath}`;
      return `
        <div class="gallery-mission-card" data-aos="fade-up">
          <div class="gallery-mission-image">
            <img src="${featured}" alt="${mission.title || ''}" loading="lazy">
            <div class="gallery-mission-overlay">
              <span class="gallery-mission-tag">${mission.tag || 'Mission'}</span>
              <span class="gallery-mission-date">${mission.date || ''}</span>
            </div>
          </div>
          <div class="gallery-mission-body">
            <h3 class="gallery-mission-title">${mission.title || ''}</h3>
            <p class="gallery-mission-desc">${mission.description || ''}</p>
          </div>
          <div class="gallery-mission-images">
            ${images.map(img => `
              <a href="/mission/${mid}/${img}" class="glightbox gallery-img-link" data-gallery="mission-gallery" data-description="${mission.title || ''}">
                <img src="/mission/${mid}/${img}" alt="${mission.title || 'Mission photo'}" loading="lazy" class="gallery-img">
              </a>
            `).join('')}
          </div>
        </div>`;
    }).join('');

    console.log('[Gallery] Rendered', totalImages, 'images across', results.length, 'missions');

    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox[data-gallery="mission-gallery"]',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Gallery.init());
