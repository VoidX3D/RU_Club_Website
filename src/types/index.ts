// ============================================================
// Site Configuration
// ============================================================
export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  logoIcon: string;
  email: string;
  phone: string;
  school: string;
  city: string;
  ward: string;
  district: string;
  province: string;
  country: string;
  github: string;
  copyright: string;
  managedBy: string;
  madeBy: string;
  cookieTitle: string;
  cookieText: string;
  navItems: NavItem[];
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
  section: 'quick' | 'legal';
}

export interface SocialLink {
  platform: string;
  url: string;
}

// ============================================================
// Page Content
// ============================================================
export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bgImage?: string;
}

export interface IntroContent {
  label: string;
  title: string;
  paragraphs: string[];
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export interface CTAContent {
  title: string;
  subtitle: string;
  primaryBtn: string;
  secondaryBtn: string;
}

export interface MissionSectionContent {
  label: string;
  title: string;
  subtitle: string;
}

// ============================================================
// Statistics
// ============================================================
export interface Stat {
  value: string;
  label: string;
}

// ============================================================
// Partners
// ============================================================
export interface Partner {
  src: string;
  alt: string;
  name: string;
}

// ============================================================
// Members
// ============================================================
export interface Member {
  name: string;
  class?: string;
  role: string;
  memberType: 'patron' | 'advisor' | 'coord' | 'member';
  groupName: 'teachers' | 'core' | 'general';
  image?: string;
}

export interface MembersData {
  teachers: Member[];
  core: Member[];
  general: Member[];
  stats: {
    teachers: number;
    core: number;
    general: number;
    total: number;
  };
}

// ============================================================
// Missions
// ============================================================
export interface MissionEntry {
  id: string;
  slug: string;
  title: string;
  tag?: string;
  date?: string;
  description: string;
  show?: boolean;
  featured?: string;
}

export interface MissionInfo {
  id: string;
  title: string;
  slug: string;
  tag?: string;
  date?: string;
  description: string;
  detail?: string;
  images: string[];
  stats: { label: string; value: string }[];
  partners: string[];
  goals: string[];
  timeline: MissionTimeline[];
  participants: { group_name: string; participant_count: string }[];
  budget: { item: string; amount?: string }[];
}

export interface MissionTimeline {
  title: string;
  date?: string;
  description?: string;
}

// ============================================================
// Announcements
// ============================================================
export interface AnnouncementEntry {
  id: string;
  title: string;
  tag?: string;
  date: string;
  day?: string;
  summary: string;
  image?: string;
  active?: boolean;
  status?: string;
}

export interface AnnouncementFull {
  id: string;
  title: string;
  tag?: string;
  date: string;
  day?: string;
  summary: string;
  description?: string;
  image?: string;
  active?: boolean;
  status?: string;
  deadline?: string;
  issuedBy?: string;
  importance?: string;
  instructions?: string;
  tags: string[];
  gallery: string[];
}

// ============================================================
// Gallery
// ============================================================
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  missionTitle: string;
  missionSlug: string;
  downloadUrl: string;
}

export interface GalleryMission {
  id: string;
  slug: string;
  title: string;
  tag?: string;
  date?: string;
  description: string;
  featured: string;
}

// ============================================================
// Contact
// ============================================================
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
