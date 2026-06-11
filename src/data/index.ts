import type { NavItem, FooterLink, SocialLink, SiteConfig } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Missions', href: '/missions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Members', href: '/members' },
  { label: 'Contact', href: '/contact' },
]

export const footerLinks: FooterLink[] = [
  { label: 'Home', href: '/', section: 'quick' },
  { label: 'Announcements', href: '/announcements', section: 'quick' },
  { label: 'Missions', href: '/missions', section: 'quick' },
  { label: 'Gallery', href: '/gallery', section: 'quick' },
  { label: 'Members', href: '/members', section: 'quick' },
  { label: 'Contact', href: '/contact', section: 'quick' },
  { label: 'Admin Panel', href: 'https://ru-admin-site.vercel.app/', section: 'quick', external: true },
  { label: 'Privacy Policy', href: '/privacy', section: 'legal' },
  { label: 'Cookie Policy', href: '/consent', section: 'legal' },
  { label: 'License', href: '/license', section: 'legal' },
]

export const socialLinks: SocialLink[] = [
  { platform: 'facebook', url: 'https://facebook.com/profile.php?id=61585206314774' },
  { platform: 'instagram', url: 'https://instagram.com/rucl.ub/' },
  { platform: 'github', url: 'https://github.com/RU-Club-Motherland' },
  { platform: 'email', url: 'ruclubmotherland@gmail.com' },
]

// ============================================================
// Hardcoded site text — NEVER use DB for this
// ============================================================
export const heroContent = {
  badge: 'Sustainability Leaders',
  titleLine1: 'A Greener',
  titleLine2: 'Future.',
  subtitle: '"Leading the community toward a zero-waste ecosystem through innovation and collective responsibility."',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'View Gallery',
  bgImage: '/static/assets/images/heroimg-bg.webp',
}

export const introContent = {
  label: 'Who We Are',
  title: 'The RU Identity',
  paragraphs: [
    'Rooted in the vision of <strong>Motherland Secondary School</strong> to provide <span class="highlight">"Quality Education For Everyone"</span>, the <strong>RU Club Motherland</strong> serves as a dynamic platform where environmental awareness meets collective action.',
    'We believe true education extends beyond the classroom — into our communities and natural spaces. Supported by <strong>The Government of Nepal</strong>, <strong>KOICA Nepal</strong>, <strong>Doko Recyclers</strong>, and <strong>UNDP</strong>.',
  ],
}

export const featureCards = [
  {
    title: 'Tree Plantation',
    description: 'Organizing community tree plantation drives to restore green cover in Pokhara region.',
    icon: 'plant',
  },
  {
    title: 'Waste Management',
    description: 'Promoting zero-waste practices and proper waste segregation in communities.',
    icon: 'trash',
  },
  {
    title: 'Awareness Education',
    description: 'Conducting workshops and campaigns to educate students and communities.',
    icon: 'book',
  },
]

export const ctaContent = {
  title: 'Join the Movement',
  subtitle: 'Be part of the change. Together, we can create a sustainable future for Pokhara.',
  primaryBtn: 'Become a Member',
  secondaryBtn: 'View Our Work',
}

export const missionSectionContent = {
  label: 'Our Mission',
  title: 'Latest Missions',
  subtitle: '',
}

// Static path helper — logo/icons always use static assets, NOT DB
const STATIC_ASSETS = '/static/assets'

export const siteConfig: SiteConfig = {
  name: 'RU Club Motherland',
  shortName: 'RU Club',
  tagline: 'Environmental Sustainability Club',
  description: 'Environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Transforming awareness into action for a zero-waste ecosystem.',
  url: 'https://ruclub.motherland.edu.np',
  logo: `${STATIC_ASSETS}/brand/logo.png`,
  logoIcon: `${STATIC_ASSETS}/brand/logo_icon.png`,
  email: 'ruclubmotherland@gmail.com',
  phone: '+977 9856022256',
  school: 'Motherland Secondary School',
  city: 'Pokhara',
  ward: 'Pokhara Metropolitan City - 7',
  district: 'Kaski',
  province: 'Gandaki Province',
  country: 'Nepal',
  github: 'https://github.com/RU-Club-Motherland',
  copyright: '2026',
  managedBy: 'Motherland Secondary School',
  madeBy: 'Sincere Bhattarai',
  cookieTitle: 'We value your privacy',
  cookieText: 'This site uses cookies from Google Analytics to analyze traffic. No personal data is sold or shared.',
  navItems,
  footerLinks,
  socialLinks,
}
