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

  async get(id) {
    await this.loadList();
    const entry = this.list.find(a => a.id === id);
    if (!entry) return null;
    try {
      const res = await fetch(`announcements/main/${id}.json`);
      const detail = await res.json();
      return { ...entry, ...detail };
    } catch (e) {
      console.error('Failed to load announcement detail:', e);
      return entry;
    }
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
          <a href="/announcement?id=${a.id}" class="announcement-read-more">
            Read More
            <img src="static/assets/icons/arrow-right.svg" alt="" width="14" height="14" class="icon-current">
          </a>
        </div>
      </article>
    `).join('');
  }
};
