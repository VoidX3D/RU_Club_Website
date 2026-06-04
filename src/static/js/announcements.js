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
      this.list = [];
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
          <img src="${imgPath}" alt="${a.title || 'Announcement'}" loading="lazy"${a.image ? '' : ' class="announcement-no-image"'}>
        </div>
        <div class="announcement-card-body">
          <div class="announcement-card-meta">
            <span class="announcement-tag">${a.tag || ''}</span>
            ${a.status ? `<span class="announcement-status announcement-status--${a.status}">${this.statusLabel(a.status)}</span>` : ''}
            <span class="announcement-date">${a.date || ''}</span>
          </div>
          <h3 class="announcement-card-title">${a.title || ''}</h3>
          <p class="announcement-card-summary">${a.summary || ''}</p>
          ${a.tags && a.tags.length ? `<div class="announcement-card-tags">${a.tags.map(t => `<span class="announcement-chip">${t}</span>`).join('')}</div>` : ''}
          <a href="/announcement?id=${a.id || ''}" class="announcement-read-more">
            Read More
            <img src="/static/assets/icons/arrow-right.svg" alt="Read more" width="18" height="18" class="icon-current">
          </a>
        </div>
      </article>
    `}).join('');
  }
};

async function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    const el = document.getElementById('announcement-content');
    if (el) el.innerHTML = '<div class="container" style="padding: 6rem 0; text-align:center;"><p>Announcement not found.</p><a href="/announcements" class="btn-primary" style="margin-top:1rem;display:inline-block;">View All Announcements</a></div>';
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.content = 'noindex, nofollow';
    return;
  }

  const announcement = await Announcements.get(id);
  const contentEl = document.getElementById('announcement-content');
  if (!announcement || !contentEl) {
    if (contentEl) contentEl.innerHTML = '<div class="container" style="padding: 6rem 0; text-align:center;"><p>Announcement not found.</p><a href="/announcements" class="btn-primary" style="margin-top:1rem;display:inline-block;">View All Announcements</a></div>';
    return;
  }

    document.title = (announcement.title || 'Announcement') + ' | RU Club Motherland';
  const safeDesc = (announcement.summary || announcement.description || '').substring(0, 160);

  const m = (sel, attr, val) => { const e = document.querySelector(sel); if (e) e[attr] = val; };
  m('meta[name="description"]', 'content', safeDesc);
  m('link[rel="canonical"]', 'href', '/announcement?id=' + announcement.id);
  m('meta[property="og:title"]', 'content', announcement.title + ' | RU Club Motherland');
  m('meta[property="og:description"]', 'content', safeDesc);
  m('meta[property="og:url"]', 'content', '/announcement?id=' + announcement.id);
  m('meta[name="twitter:title"]', 'content', announcement.title + ' | RU Club Motherland');
  m('meta[name="twitter:description"]', 'content', safeDesc);

  const s = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val || ''; };
  s('announcement-tag', announcement.tag);
  s('announcement-title', announcement.title);
  s('announcement-date', announcement.date + (announcement.day ? ' · ' + announcement.day : ''));
  s('announcement-issuer', announcement.issuedBy ? 'Issued by ' + announcement.issuedBy : '');

  if (announcement.status) {
    const se = document.getElementById('announcement-status');
    if (se) {
      se.textContent = Announcements.statusLabel(announcement.status);
      se.className = 'announcement-status announcement-status--' + announcement.status;
      se.style.display = '';
    }
  }

  const dc = document.getElementById('announcement-description');
  if (dc && announcement.description) {
    dc.innerHTML = announcement.description.split('\n').filter(p => p.trim()).map(p => '<p>' + p.trim() + '</p>').join('');
  }

  if (announcement.tags && announcement.tags.length) {
    const te = document.getElementById('announcement-tags');
    if (te) { te.innerHTML = announcement.tags.map(t => '<span class="announcement-chip">' + t + '</span>').join(''); te.style.display = 'flex'; }
  }

  if (announcement.importance) {
    const ie = document.getElementById('announcement-importance');
    const it = document.getElementById('announcement-importance-text');
    if (ie && it) { it.textContent = announcement.importance; ie.style.display = 'block'; }
  }

  if (announcement.instructions) {
    const ie2 = document.getElementById('announcement-instructions');
    const it2 = document.getElementById('announcement-instructions-text');
    if (ie2 && it2) { it2.textContent = announcement.instructions; ie2.style.display = 'block'; }
  }

  if (announcement.image) {
    const iw = document.getElementById('announcement-image-wrap');
    const im = document.getElementById('announcement-image');
    if (iw && im) {
      im.src = announcement.image.startsWith('/') ? announcement.image : '/' + announcement.image;
      im.alt = announcement.title;
      iw.style.display = 'block';
    }
  }

  const mc = document.getElementById('announcement-meta');
  if (mc) {
    const statusLabel = { ongoing: 'Ongoing', deadline: 'Deadline', ended: 'Ended', urgent: 'Urgent', upcoming: 'Upcoming' };
    const metaItems = [
      { label: 'Status', value: announcement.status ? statusLabel[announcement.status] : null },
      { label: 'Deadline', value: announcement.deadline },
      { label: 'Date', value: announcement.date },
      { label: 'Day', value: announcement.day },
      { label: 'Time', value: announcement.time },
      { label: 'Location', value: announcement.location },
      { label: 'Issued By', value: announcement.issuedBy }
    ].filter(m => m.value);
    mc.innerHTML = metaItems.map(m => '<div class="announcement-meta-item"><div class="announcement-meta-label">' + m.label + '</div><div class="announcement-meta-value">' + m.value + '</div></div>').join('');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  if (document.getElementById('announcements-list')) {
    await Announcements.renderCards('announcements-list');
  }
  if (document.getElementById('announcement-content')) {
    await renderDetail();
  }
});
