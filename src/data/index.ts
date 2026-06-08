import type { NavItem, FooterLink, SocialLink, SiteConfig } from '@/types'
import { storageUrl } from '@/lib/utils'

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
  { label: 'Admin Panel', href: '/admin', section: 'quick' },
  { label: 'Privacy Policy', href: '/privacy', section: 'legal' },
  { label: 'Cookie Policy', href: '/consent', section: 'legal' },
  { label: 'License', href: '/license', section: 'legal' },
]

export const socialLinks: SocialLink[] = [
  { platform: 'facebook', url: 'https://facebook.com/profile.php?id=61585206314774' },
  { platform: 'instagram', url: 'https://instagram.com/rucl.ub/' },
]

export const siteConfig: SiteConfig = {
  name: 'RU Club Motherland',
  shortName: 'RU Club',
  tagline: 'Environmental Sustainability Club',
  description: 'Environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Transforming awareness into action for a zero-waste ecosystem.',
  url: 'https://ruclubmss.vercel.app',
  logo: storageUrl('brand/logo.png'),
  logoIcon: storageUrl('brand/logo_icon.png'),
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


