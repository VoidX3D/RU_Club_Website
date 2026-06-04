/**
 * Main Entry Point - RU Club Motherland
 *
 * This file loads all modular JS files and initializes the app.
 * Scripts are loaded in order: components.js loads everything else after header/footer
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
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
            // Setup easter egg click on member rows
            document.querySelectorAll('.easter-row').forEach(row => {
                row.addEventListener('click', () => {
                    window.location.href = '/secret-garden';
                });
            });
        }

        // Load missions carousel — populate slides first, then init Swiper
        if (document.getElementById('missions-carousel')) {
            const slideCount = await Missions.renderCarousel('missions-carousel');
            Carousel.initParkSwiper(slideCount);
        }

        // Load missions grid if present
        if (document.getElementById('missions-grid')) {
            await Missions.renderMissionsGrid('missions-grid');
        }

        // Load announcements if present
        if (document.getElementById('announcements-list')) {
            await Announcements.renderCards('announcements-list');
        }

        // Update missions stats page from JSON data
        if (document.getElementById('stat-missions')) {
            await Missions.updateStats();
        }
    } catch (error) {
        console.error('Main initialization error:', error);
    }
});