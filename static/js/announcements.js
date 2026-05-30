const Announcements = {
  list: null,

  async loadList() {
    if (this.list) return this.list;
    try {
      const res = await fetch('announcements/list.json');
      this.list = await res.json();
      return this.list;
    } catch (e) {
      console.error('Failed to load announcements:', e);
      return [];
    }
  },

  active() {
    if (!this.list) return [];
    return this.list.filter(a => a.active !== false);
  },

  async renderCards(containerId) {
    await this.loadList();
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = this.active();
    container.innerHTML = items.map((a, i) => `
      <article class="announcement-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        ${a.image ? `<div class="announcement-card-image">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
        </div>` : ''}
        <div class="announcement-card-body">
          <div class="announcement-card-meta">
            <span class="announcement-tag">${a.tag}</span>
            <span class="announcement-date">${a.date}</span>
          </div>
          <h3 class="announcement-card-title">${a.title}</h3>
          <p class="announcement-card-summary">${a.summary}</p>
          <button class="announcement-read-more" data-id="${a.id}">
            Read More
            <img src="static/assets/icons/chevron-down.svg" alt="" width="14" height="14" class="icon-current announcement-chevron">
          </button>
        </div>
        <div class="announcement-detail" id="announcement-detail-${a.id}"></div>
      </article>
    `).join('');

    container.querySelectorAll('.announcement-read-more').forEach(btn => {
      btn.addEventListener('click', () => this.toggleDetail(btn.dataset.id));
    });
  },

  async toggleDetail(id) {
    const detailEl = document.getElementById(`announcement-detail-${id}`);
    if (!detailEl) return;

    const btn = document.querySelector(`.announcement-read-more[data-id="${id}"]`);
    const chevron = btn?.querySelector('.announcement-chevron');

    if (detailEl.classList.contains('open')) {
      detailEl.classList.remove('open');
      detailEl.style.maxHeight = '0';
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      if (btn) btn.classList.remove('active');
      return;
    }

    if (!detailEl.dataset.loaded) {
      try {
        const res = await fetch(`announcements/main/${id}.json`);
        const data = await res.json();
        detailEl.dataset.loaded = 'true';
        detailEl.innerHTML = this.renderDetail(data);
      } catch (e) {
        detailEl.innerHTML = '<p style="color:var(--text-tertiary);padding:1rem;">Could not load announcement details.</p>';
      }
    }

    detailEl.classList.add('open');
    detailEl.style.maxHeight = detailEl.scrollHeight + 'px';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    if (btn) btn.classList.add('active');
  },

  renderDetail(data) {
    const dayRow = data.day ? `<div class="detail-row"><span class="detail-label">Day</span><span class="detail-value">${data.day}</span></div>` : '';
    const timeRow = data.time ? `<div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${data.time}</span></div>` : '';
    const locationRow = data.location ? `<div class="detail-row"><span class="detail-label">Location</span><span class="detail-value">${data.location}</span></div>` : '';
    const instructions = data.instructions ? `
      <div class="detail-section">
        <h4 class="detail-section-title">Instructions</h4>
        <p class="detail-section-body">${data.instructions}</p>
      </div>
    ` : '';
    const importance = data.importance ? `
      <div class="detail-section detail-importance">
        <h4 class="detail-section-title">Why It Matters</h4>
        <p class="detail-section-body">${data.importance}</p>
      </div>
    ` : '';

    return `
      <div class="detail-header">
        <div class="detail-meta-grid">
          <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${data.date}</span></div>
          ${dayRow}
          ${timeRow}
          ${locationRow}
          <div class="detail-row"><span class="detail-label">Issued By</span><span class="detail-value">${data.issuedBy}</span></div>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-section">
          <h4 class="detail-section-title">Description</h4>
          ${data.description.split('\n').filter(p => p.trim()).map(p => `<p class="detail-section-body">${p.trim()}</p>`).join('')}
        </div>
        ${importance}
        ${instructions}
      </div>
    `;
  }
};
