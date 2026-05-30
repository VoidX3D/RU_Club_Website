/**
 * Main Entry Point - RU Club Motherland
 *
 * This file loads all modular JS files and initializes the app.
 * Scripts are loaded in order: components.js loads everything else after header/footer
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    Components.init();

    // Load data-driven content (only on pages with matching containers)
    if (document.getElementById('home-stats')) {
        await Promise.all([
            DataLoader.renderStats('home-stats'),
            DataLoader.renderPartners('home-partners'),
            DataLoader.renderContent()
        ]);
    }

    if (document.getElementById('members-teachers')) {
        await Promise.all([
            DataLoader.renderMembers('members-teachers', 'teachers'),
            DataLoader.renderMembers('members-core', 'core'),
            DataLoader.renderMembers('members-general', 'general')
        ]);
    }

    // Always init partner swiper if container exists
    if (typeof Carousel !== 'undefined') Carousel.initPartnerSwiper();

    // Load missions carousel — populate slides first, then init Swiper
    if (document.getElementById('missions-carousel')) {
        await Missions.renderCarousel('missions-carousel');
        Carousel.initParkSwiper();
    }

    // Load missions grid if present
    if (document.getElementById('missions-grid')) {
        Missions.renderMissionsGrid('missions-grid');
    }

    // Update missions stats page from JSON data
    if (document.getElementById('stat-missions')) {
        Missions.updateStats();
    }
});