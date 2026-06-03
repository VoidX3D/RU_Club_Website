const Announcements = {
  list: null,

  async loadList() {
    if (this.list) {
      return this.list;
    }
    try {
      const res = await fetch('/announcements/list.json');
      this.list = await res.json();
      return this.list;
    } catch (e) {
      console.error('Failed to load announcements list:', e);
      return [];
    }
  },

  active() {
    if (!this.list) {
      console.warn('Announcements: list not loaded yet');
      return [];
    }
    return this.list.filter(a => a.active !== false);
  },

  async get(id) {
    await this.loadList();
    const entry = this.list.find(a => a.id === id);
    if (!entry) return null;
    try {
      const res = await fetch('/announcements/main/' + id + '.json');
      const detail = await res.json();
      return { ...entry, ...detail };
    } catch (e) {
      console.error('Failed to load announcement detail:', e);
      return entry;
    }
  },

  statusLabel(s) {
    return { 
      ongoing: 'Ongoing', 
      deadline: 'Deadline', 
      ended: 'Ended',
      urgent: 'Urgent',
      upcoming: 'Upcoming'
    }[s] || s;
  },

  async renderCards(containerId) {
    await this.loadList();
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = this.active();
    if (!items.length) {
      container.innerHTML = '<div class="announcements-empty"><p>No announcements at this time.</p></div>';
      return;
    }

    const NO_IMAGE = '/announcements/assets/no-image.svg';

    container.innerHTML = items.map((a, i) => {
      const imgPath = a.image ? (a.image.startsWith('/') ? a.image : '/' + a.image) : NO_IMAGE;
      return `
      <article class="announcement-card" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="announcement-card-image">
          <img src="${imgPath}" alt="${a.title}" loading="lazy"${a.image ? '' : ' class="announcement-no-image"'}>
        </div>
        <div class="announcement-card-body">
          <div class="announcement-card-meta">
            <span class="announcement-tag">${a.tag}</span>
            ${a.status ? `<span class="announcement-status announcement-status--${a.status}">${this.statusLabel(a.status)}</span>` : ''}
            <span class="announcement-date">${a.date}</span>
          </div>
          <h3 class="announcement-card-title">${a.title}</h3>
          <p class="announcement-card-summary">${a.summary}</p>
          ${a.tags && a.tags.length ? `<div class="announcement-card-tags">${a.tags.map(t => `<span class="announcement-chip">${t}</span>`).join('')}</div>` : ''}
          <a href="/announcement?id=${a.id}" class="announcement-read-more">
            Read More
            <img src="/static/assets/icons/arrow-right.svg" alt="Read more" width="18" height="18" class="icon-current">
          </a>
        </div>
      </article>
    `}).join('');
  }
};
