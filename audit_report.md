# RU Club Website Audit Report

## Identified Issues

### 1. Navigation & Header
- **Broken Mobile View**: Malformed CSS in `style.css` (nested media queries at line 211) breaks mobile layout.
- **Navbar Icons**: Icons like GitHub and Social icons are hardcoded in SVGs and don't respond to theme changes.
- **Navarro/Navbar**: User mentioned "Navarro" is broken on mobile and desktop view on phone. This likely refers to the navbar layout and responsive behavior.
- **Mobile View "Naval Pokémon"**: Likely a typo for "Navbar Icons" or specific icons in mobile view being broken in both modes.

### 2. Form Submission & Status Pages
- **Success/Fail Pages**: `forms.js` always redirects to `/success` on any resolved fetch (even with `no-cors` which doesn't provide status). It never redirects to `/failed`.
- **Formspree Endpoint**: Hardcoded endpoints might be incorrect or misconfigured for the fork.

### 3. Secret Garden
- **Not Working**: User reports it doesn't work. Likely due to duplicated/conflicting logic in `members.html` and `animations.js`, or broken trigger mechanisms.

### 4. Code Structure & Optimization
- **Duplicated Logic**: Easter egg logic is duplicated in multiple places.
- **Component Loading**: Header/Footer are loaded via `fetch` which causes layout shift (CLS).
- **Hardcoded Colors**: Many icons have hardcoded fill/stroke colors.

### 5. Analytics
- **Limited Data**: Current analytics tracks basic events but could be enhanced for deeper insights.
- **Initialization Timing**: Analytics might be binding to elements before they are injected into the DOM.

## Planned Fixes
- [ ] Fix CSS media query nesting.
- [ ] Normalize icons to use `currentColor` or CSS filters for theme support.
- [ ] Fix form submission logic to properly handle success/failure.
- [ ] Consolidate easter egg logic and fix Secret Garden access.
- [ ] Improve component loading or provide better fallbacks.
- [ ] Enhance GA4 tracking with more custom dimensions and events.
