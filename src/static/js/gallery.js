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
    if (!container) {
      console.warn('[Gallery] Container not found:', containerId);
      return;
    }

    const all = await this.loadMissions();
    const missions = this.shown(all);
    console.log('[Gallery] Missions:', missions.length);

    if (!missions.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    const images = [];
    for (const m of missions) {
      const mid = m.id || m.slug;
      if (!mid) continue;
      try {
        const res = await fetch(`/mission/${mid}/info.json`);
        if (!res.ok) continue;
        const info = await res.json();
        if (Array.isArray(info.images)) {
          info.images.forEach(img => {
            images.push({ src: `/mission/${mid}/${img}`, title: m.title || '' });
          });
        }
      } catch (e) {
        console.warn('[Gallery] Failed:', mid, e);
      }
    }

    if (!images.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    container.innerHTML = images.map(img => `
      <a href="${img.src}" class="glightbox gallery-img-link" data-gallery="mission-gallery"${img.title ? ` data-glightbox="description: ${img.title}"` : ''}>
        <img src="${img.src}" alt="${img.title || 'Mission photo'}" loading="lazy" class="gallery-img">
      </a>
    `).join('');

    console.log('[Gallery] Rendered', images.length, 'images');

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
