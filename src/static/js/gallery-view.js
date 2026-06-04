const GalleryView = {
  async init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      this.showEmpty('Mission ID not specified.');
      return;
    }

    let mission;
    try {
      const res = await fetch('/mission/list.json');
      const data = await res.json();
      mission = (data.missions || []).find(m => (m.slug === id || m.id === id) && m.show !== false);
    } catch (e) {
      console.error('[GalleryView] Failed to load missions:', e);
    }

    if (!mission) {
      this.showEmpty('Mission not found.');
      return;
    }

    let info;
    try {
      const res = await fetch(`/mission/${mission.id}/info.json`);
      info = await res.json();
    } catch (e) {
      console.error('[GalleryView] Failed to load mission info:', e);
      this.showEmpty('Failed to load mission data.');
      return;
    }

    if (!Array.isArray(info.images) || !info.images.length) {
      this.showEmpty('No photos available for this mission.');
      return;
    }

    this.render(mission, info);
  },

  render(mission, info) {
    const s = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val || ''; };
    s('gv-tag', mission.tag);
    s('gv-title', mission.title);
    s('gv-date', mission.date);

    const title = (mission.title || 'Gallery View') + ' | RU Club Motherland';
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = (mission.description || '').substring(0, 160);

    const grid = document.getElementById('gv-grid');
    if (!grid) return;

    grid.innerHTML = info.images.map(img =>
      `<a href="/mission/${mission.id}/${img}" class="glightbox" data-gallery="gv-gallery" data-aos="fade-up">
        <img src="/mission/${mission.id}/${img}" alt="${mission.title || 'Mission photo'}" loading="lazy">
      </a>`
    ).join('');

    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true
      });
    }

    if (typeof AOS !== 'undefined') AOS.refresh();

    const backLink = document.getElementById('gv-back-link');
    if (backLink) {
      const ref = document.referrer;
      if (ref && ref.includes('/gallery')) {
        backLink.href = '/gallery';
      }
    }
  },

  showEmpty(msg) {
    const grid = document.getElementById('gv-grid');
    if (grid) grid.style.display = 'none';
    const empty = document.getElementById('gv-empty');
    if (empty) {
      empty.style.display = 'block';
      const p = empty.querySelector('p');
      if (p) p.textContent = msg || 'No photos available.';
    }
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.content = 'noindex, nofollow';
  }
};

document.addEventListener('DOMContentLoaded', () => GalleryView.init());
