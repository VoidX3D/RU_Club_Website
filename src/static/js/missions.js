const Missions = {
  data: null,

  async load() {
    if (this.data) return this.data;
    try {
      const res = await fetch('/mission/list.json');
      this.data = await res.json();
      return this.data;
    } catch (e) {
      console.error('Failed to load missions:', e);
      return { missions: [] };
    }
  },

  shown() {
    if (!this.data) return [];
    return this.data.missions.filter(m => m.show !== false);
  },

  async getMission(slug) {
    const data = await this.load();
    return data.missions.find(m => m.slug === slug) || null;
  },

  async renderMissionsGrid(containerId) {
    await this.load();
    const container = document.getElementById(containerId);
    if (!container) return;

    const missions = this.shown();
    container.innerHTML = missions.map(m => `
      <div class="gallery-card" data-aos="fade-up">
        <div class="gallery-image">
          <img src="${m.featured ? (m.featured.startsWith('/') ? m.featured : '/' + m.featured) : '/static/assets/brand/logo.png'}" alt="${m.title || 'Mission image'}" loading="lazy">
          <div class="gallery-overlay">
            <a href="/mission?id=${m.slug || m.id || ''}" class="btn-primary">View Mission</a>
          </div>
        </div>
        <div class="gallery-content">
          <div class="gallery-meta">
            <span class="gallery-tag">${m.tag || ''}</span>
            <span class="gallery-date">${m.date || ''}</span>
          </div>
          <h3 class="gallery-title">${m.title || ''}</h3>
          <p class="gallery-desc">${m.description || ''}</p>
        </div>
      </div>
    `).join('');
  },

  async updateStats() {
    await this.load();
    const missions = this.shown();
    const total = missions.length;

    let totalVolunteers = 0;
    let totalSurveyed = 0;

    for (const m of missions) {
      try {
        const res = await fetch(`/mission/${m.id}/info.json`);
        const info = await res.json();
        if (info.stats) {
          const v = parseInt(info.stats.volunteers) || 0;
          const s = parseInt(info.stats.areasSurveyed) || 0;
          totalVolunteers = Math.max(totalVolunteers, v);
          totalSurveyed = Math.max(totalSurveyed, s);
        }
      } catch (e) { console.warn('Failed to load stats for', m.id, e); }
    }

    const el = (id) => document.getElementById(id);
    if (el('stat-missions')) el('stat-missions').textContent = total;
    if (el('stat-volunteers')) el('stat-volunteers').textContent = totalVolunteers + '+';
    if (el('stat-waste')) el('stat-waste').textContent = totalSurveyed + '+';
  },

    async renderCarousel(containerId) {
    await this.load();
    const container = document.getElementById(containerId);
    if (!container) return 0;

    const shown = this.shown();
    if (!shown.length) return 0;

    // Pick a random mission from shown
    const mission = shown[Math.floor(Math.random() * shown.length)];

    try {
      const infoRes = await fetch(`/mission/${mission.id}/info.json`);
      const info = await infoRes.json();

      if (!Array.isArray(info.images)) {
        console.warn('No images found for mission:', mission.id);
        return 0;
      }
      container.innerHTML = info.images.map((img, i) => `
        <div class="swiper-slide">
          <img src="/mission/${mission.id}/${img}" alt="${mission.title || ''} - ${(mission.description || '').substring(0, 80)}" loading="${i === 0 ? 'eager' : 'lazy'}" ${i === 0 ? 'fetchpriority="high"' : ''}>
        </div>
      `).join('');

      // Update the mission section header to match the random pick
      const labelEl = document.getElementById('mission-label');
      const titleEl = document.getElementById('mission-title');
      const subtitleEl = document.getElementById('mission-subtitle');
      if (labelEl) labelEl.textContent = mission.tag;
      if (titleEl) titleEl.textContent = mission.title;
      if (subtitleEl) subtitleEl.textContent = mission.description || '';

      return info.images.length;
    } catch (e) {
      console.error('Failed to load mission images:', e);
      return 0;
    }
  },

  async renderGallery(containerId) {
    console.log('[Gallery] Loading...');
    await this.load();
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('[Gallery] Container not found:', containerId);
      return;
    }

    const missions = this.shown();
    console.log(`[Gallery] Found ${missions.length} missions`);
    if (!missions.length) {
      container.innerHTML = '<div style="text-align:center;padding:3rem 0;color:var(--text-secondary);">No gallery images available yet.</div>';
      return;
    }

    const allImages = [];
    for (const m of missions) {
      if (!m.id && !m.slug) {
        console.warn('[Gallery] Mission missing id/slug:', m);
        continue;
      }
      const mid = m.id || m.slug;
      try {
        const res = await fetch(`/mission/${mid}/info.json`);
        if (!res.ok) {
          console.warn(`[Gallery] HTTP ${res.status} for ${mid}`);
          continue;
        }
        const info = await res.json();
        if (Array.isArray(info.images)) {
          info.images.forEach(img => {
            allImages.push({
              src: `/mission/${mid}/${img}`,
              title: m.title || '',
              missionId: mid
            });
          });
        } else {
          console.warn(`[Gallery] No images array in ${mid}/info.json`);
        }
      } catch (e) {
        console.warn('[Gallery] Failed to load images for', mid, e);
      }
    }

    if (!allImages.length) {
      container.innerHTML = '<div style="text-align:center;padding:3rem 0;color:var(--text-secondary);">No gallery images available yet.</div>';
      console.warn('[Gallery] No images collected from any mission');
      return;
    }

    container.innerHTML = allImages.map((img, i) => `
        <a href="${img.src}" class="glightbox gallery-img-link" data-gallery="mission-gallery"${img.title ? ` data-glightbox="description: ${img.title}"` : ''}>
          <img src="${img.src}" alt="${img.title || 'Mission photo'}" loading="lazy" class="gallery-img">
        </a>
      `).join('');

    console.log(`[Gallery] Rendered ${allImages.length} images from ${missions.length} missions`);

    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox[data-gallery="mission-gallery"]',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true
      });
      console.log('[Gallery] GLightbox initialized');
    } else {
      console.warn('[Gallery] GLightbox not available');
    }
  }
};
