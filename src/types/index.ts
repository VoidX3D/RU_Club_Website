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
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
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

export interface MissionImageItem {
  url: string;
  alt: string;
}

export interface MissionInfo {
  id: string;
  title: string;
  slug: string;
  tag?: string;
  date?: string;
  description: string;
  detail?: string;
  images: MissionImageItem[];
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
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  missionTitle: string;
  missionSlug: string;
  downloadUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
