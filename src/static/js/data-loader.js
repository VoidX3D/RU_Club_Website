const DataLoader = {
  cache: {},

  async get(path) {
    if (this.cache[path]) return this.cache[path];
    try {
      const res = await fetch(path);
      this.cache[path] = await res.json();
      return this.cache[path];
    } catch (e) {
      console.error('DataLoader error:', path, e);
      return null;
    }
  },

  async getSite() { return this.get('/info/site.json'); },
  async getStats() { return this.get('/info/stats.json'); },
  async getPartners() { return this.get('/info/partners.json'); },
  async getMembers() { return this.get('/info/members.json'); },
  async getContent() { return this.get('/info/content.json'); },

  async renderStats(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const stats = await this.getStats();
    if (!stats) return;
    container.innerHTML = stats.map((s, i) => `
      <div class="stat-item" data-aos="fade-up" ${i > 0 ? `data-aos-delay="${i * 100}"` : ''}>
        <div class="stat-number">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  },

  async renderPartners(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const partners = await this.getPartners();
    if (!partners) return;
    const card = p => `<div class="partner-card">
      <img src="${p.src}" alt="${p.alt}" loading="lazy">
    </div>`;
    container.innerHTML = [...partners, ...partners].map(card).join('');
  },

  async renderMembers(containerId, group) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = await this.getMembers();
    if (!data || !data[group]) return;

    const typeMap = {
      teachers: { label: 'Leadership', title: 'Teachers & Advisors', headers: ['#', 'Name', 'Position'] },
      core: { label: 'Team', title: 'Core Members', headers: ['#', 'Name', 'Class', 'Role'] },
      general: { label: 'Membership', title: 'General Members', headers: ['#', 'Name', 'Class', 'Role'] }
    };

    const cfg = typeMap[group];
    const hasClass = cfg.headers.includes('Class');
    const roleTypeMap = { patron: 'role-patron', advisor: 'role-advisor', coord: 'role-coord', member: 'role-member' };

    const rows = data[group].map((m, i) => {
      const num = String(i + 1).padStart(2, '0');
      const serialClass = group === 'general' ? 'serial-num-light' : 'serial-num';
      const roleClass = roleTypeMap[m.type] || 'role-member';
      const isEaster = m.name === 'Sincere Bhattarai';
      const nameClass = isEaster ? 'member-name member-easter' : (group !== 'general' ? 'member-name' : '');
      return `<tr${isEaster ? ' class="easter-row"' : ''}>
        <td><span class="${serialClass}">${num}</span></td>
        <td class="${nameClass}">${m.name}</td>
        ${hasClass ? `<td class="member-class">${m.class || ''}</td>` : ''}
        <td><span class="member-role ${roleClass}">${m.type ? m.role : 'General Member'}</span></td>
      </tr>`;
    }).join('');

    container.innerHTML = `
      <div class="section-header">
        <p class="section-label" data-aos="fade-up">${cfg.label}</p>
        <h2 class="section-title" data-aos="fade-up">${cfg.title}</h2>
      </div>
      <div class="table-wrapper" data-aos="fade-up" data-aos-delay="100">
        <table class="members-table">
          <thead><tr>${cfg.headers.map(h => `<th${h === '#' ? ' style="width:55px;"' : ''}>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },

  async renderContent() {
    const content = await this.getContent();
    if (!content) return;
    if (!content.hero || !content.intro || !content.features || !content.cta || !content.mission) {
      console.warn('DataLoader: content.json missing section');
      return;
    }

    // Hero
    this.setText('hero-badge-text', content.hero.badge || '');
    this.setHTML('hero-title-line1', content.hero.titleLine1 || '');
    this.setHTML('hero-title-line2', content.hero.titleLine2 || '');
    this.setHTML('hero-subtitle', content.hero.subtitle || '');

    // Intro
    this.setHTML('intro-label', content.intro.label || '');
    this.setHTML('intro-title', content.intro.title || '');
    const introContainer = document.getElementById('intro-paragraphs');
    if (introContainer && Array.isArray(content.intro.paragraphs)) {
      introContainer.innerHTML = content.intro.paragraphs.map(p => `<p class="intro-text">${p}</p>`).join('');
    }

    // Features
    this.setHTML('features-label', content.features.label || '');
    this.setHTML('features-title', content.features.title || '');
    const featuresContainer = document.getElementById('features-cards');
    if (featuresContainer && content.features.cards) {
      featuresContainer.innerHTML = content.features.cards.map((c, i) => `
        <div class="feature-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
          <div class="feature-icon">
            <img src="/static/assets/icons/${c.icon}.svg" alt="${c.title}" width="24" height="24">
          </div>
          <h3 class="feature-title">${c.title}</h3>
          <p class="feature-desc">${c.description}</p>
        </div>
      `).join('');
    }

    // CTA
    this.setHTML('cta-title', content.cta.title || '');
    this.setHTML('cta-subtitle', content.cta.subtitle || '');

    // Mission section
    this.setHTML('mission-label', content.mission.label || '');
    this.setHTML('mission-title', content.mission.title || '');
    this.setHTML('mission-subtitle', content.mission.subtitle || '');
  },

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  },

  showError(containerId, message) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `<div class="load-error"><p>${message || 'Failed to load content.'}</p></div>`;
  }
};
