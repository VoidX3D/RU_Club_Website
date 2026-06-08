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
  location: {
    school: string;
    city: string;
    ward: string;
    district: string;
    province: string;
    country: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  github: string;
  copyright: string;
  managedBy: string;
  madeBy: string;
  nav: NavItem[];
  footerQuickLinks: NavItem[];
  cookie: {
    title: string;
    text: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Content {
  hero: HeroContent;
  intro: IntroContent;
  features: FeaturesContent;
  cta: CTAContent;
  mission: MissionSectionContent;
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface IntroContent {
  label: string;
  title: string;
  paragraphs: string[];
}

export interface FeaturesContent {
  label: string;
  title: string;
  cards: FeatureCard[];
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

export interface Stat {
  value: string;
  label: string;
}

export interface Partner {
  src: string;
  alt: string;
  name: string;
}

export interface Member {
  name: string;
  class?: string;
  role: string;
  type?: string;
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

export interface MissionEntry {
  slug: string;
  id: string;
  title: string;
  description: string;
  tag?: string;
  date?: string;
  show?: boolean;
  imageCount?: number;
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
  stats?: Record<string, string>;
  partners?: string[];
  show?: boolean;
}

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
  status?: string;
  tags?: string[];
  date: string;
  day?: string;
  deadline?: string;
  time?: string;
  location?: string;
  issuedBy?: string;
  summary: string;
  description: string;
  importance?: string;
  instructions?: string;
  image?: string;
  active?: boolean;
  gallery?: string[];
}

export interface GalleryMission {
  slug: string;
  id: string;
  title: string;
  tag?: string;
  date?: string;
  description: string;
  show?: boolean;
  imageCount: number;
  featured: string;
}
