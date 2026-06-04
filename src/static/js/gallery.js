const Gallery = {
  async init() {
    console.log('[Gallery] init');
    await this.renderGroupedGrid('gallery-grid');
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

  async renderGroupedGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const all = await this.loadMissions();
    const missions = this.shown(all);

    if (!missions.length) {
      container.innerHTML = '<div class="gallery-empty">No gallery images available yet.</div>';
      return;
    }

    let allImages = [];
    let sectionsHtml = '';

    for (const m of missions) {
      const mid = m.id || m.slug;
      if (!mid) continue;

      try {
        const res = await fetch(`/mission/${mid}/info.json`);
        if (!res.ok) continue;
        const info = await res.json();
        if (!Array.isArray(info.images) || !info.images.length) continue;

        const images = info.images.map(img => ({
          src: `/mission/${mid}/${img}`,
          title: m.title || ''
        }));
        allImages.push(...images);

        sectionsHtml += `
          <div class="gallery-group" data-aos="fade-up">
            <div class="gallery-group-header">
              ${m.tag ? `<span class="gallery-group-tag">${m.tag}</span>` : ''}
              <h2 class="gallery-group-title">${m.title || ''}</h2>
              ${m.date ? `<span class="gallery-group-date">${m.date}</span>` : ''}
            </div>
            <div class="gallery-grid">
              ${images.map(img => `
                <a href="${img.src}" class="glightbox gallery-img-link" data-gallery="mission-gallery"${img.title ? ` data-glightbox="description: ${img.title}"` : ''}>
                  <img src="${img.src}" alt="${img.title || 'Mission photo'}" loading="lazy" class="gallery-img">
                </a>
              `).join('')}
            </div>
          </div>`;
      } catch (e) {
        console.warn('[Gallery] Failed:', mid, e);
      }
    }

    container.innerHTML = sectionsHtml ||
      '<div class="gallery-empty">No gallery images available yet.</div>';

    console.log('[Gallery] Rendered', allImages.length, 'images across', missions.length, 'groups');

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
