/**
 * Typed content contract for the whole site.
 *
 * The frontend is intentionally backend-free: every locale supplies one
 * `SiteContent` object. Swapping these objects for a CMS/API response later
 * requires no component changes.
 */

export type Locale = 'fa' | 'en' | 'ar';
export type Direction = 'rtl' | 'ltr';

export interface LocaleMeta {
  code: Locale;
  dir: Direction;
  /** Endonym, shown in the language switcher */
  label: string;
  shortLabel: string;
  htmlLang: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface NavItem extends Link {
  description?: string;
  children?: Link[];
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}

export interface HeroIndicator {
  icon: IconName;
  title: string;
  note: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  titleTrail?: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  primary: Link;
  secondary: Link;
  indicators: HeroIndicator[];
}

export interface Stat {
  id: string;
  value: string;
  /** Numeric part used by the count-up animation; omit for non-numeric values */
  numeric?: number;
  suffix?: string;
  label: string;
  note?: string;
  icon: IconName;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface JourneyStage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
}

export interface CampusFacility {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface CampusPhase {
  id: string;
  name: string;
  area: string;
  description: string;
}

export interface HealthArea {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  href: string;
}

export interface EventItem {
  id: string;
  category: string;
  title: string;
  description: string;
  dateLabel: string;
  dateDay: string;
  dateMonth: string;
  location: string;
  status: 'scheduled' | 'planning' | 'archived';
  statusLabel: string;
  image: string;
  imageAlt: string;
  cta: Link;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  imageAlt?: string;
  href: string;
  featured?: boolean;
}

export interface Company {
  id: string;
  name: string;
  monogram: string;
  sector: string;
  description: string;
  founded?: string;
  href: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  monogram: string;
}

export interface FooterColumn {
  title: string;
  links: Link[];
}

export interface ContactInfo {
  addressTitle: string;
  address: string;
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  hoursLabel: string;
  hours: string;
}

export interface SiteContent {
  locale: Locale;
  dir: Direction;
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    parent: string;
  };
  nav: {
    items: NavItem[];
    cta: Link;
    searchLabel: string;
    searchPlaceholder: string;
    searchHint: string;
    searchEmpty: string;
    menuLabel: string;
    closeLabel: string;
    themeLabel: string;
    langLabel: string;
    skipToContent: string;
  };
  hero: {
    slides: HeroSlide[];
    prevLabel: string;
    nextLabel: string;
    slideLabel: string;
    pauseLabel: string;
    playLabel: string;
  };
  stats: {
    title: string;
    items: Stat[];
  };
  why: {
    intro: SectionIntro;
    body: string;
    benefits: Benefit[];
    cta: Link;
    investment: {
      title: string;
      description: string;
      items: { label: string; value: string }[];
    };
    gallery: { src: string; alt: string }[];
  };
  journey: {
    intro: SectionIntro;
    stages: JourneyStage[];
    cta: Link;
    progressLabel: string;
  };
  campus: {
    intro: SectionIntro;
    body: string;
    image: { src: string; alt: string };
    mapImage: { src: string; alt: string };
    facilities: CampusFacility[];
    phasesTitle: string;
    phases: CampusPhase[];
    architectureNote: string;
    cta: Link;
    secondaryCta: Link;
  };
  areas: {
    intro: SectionIntro;
    items: HealthArea[];
    cta: Link;
  };
  news: {
    intro: SectionIntro;
    featuredEvent: EventItem;
    items: NewsItem[];
    allNews: Link;
    allEvents: Link;
    timelineTitle: string;
  };
  companies: {
    intro: SectionIntro;
    items: Company[];
    foundersTitle: string;
    founders: Founder[];
    cta: Link;
    prevLabel: string;
    nextLabel: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primary: Link;
    secondary: Link;
    points: string[];
  };
  footer: {
    description: string;
    columns: FooterColumn[];
    contact: ContactInfo;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      submit: string;
      success: string;
      error: string;
    };
    socialLabel: string;
    social: { label: string; href: string; icon: IconName }[];
    copyright: string;
    legal: Link[];
  };
  pages: Record<
    string,
    {
      eyebrow: string;
      title: string;
      description: string;
      sections: { title: string; body: string }[];
      note?: string;
    }
  >;
  common: {
    readMore: string;
    learnMore: string;
    viewAll: string;
    backHome: string;
    breadcrumbHome: string;
    notFoundTitle: string;
    notFoundBody: string;
    formName: string;
    formOrg: string;
    formEmail: string;
    formPhone: string;
    formArea: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    formNote: string;
    required: string;
  };
}

export type IconName =
  | 'atom'
  | 'beaker'
  | 'brain'
  | 'building'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'compass'
  | 'factory'
  | 'flask'
  | 'globe'
  | 'graduation'
  | 'handshake'
  | 'heart'
  | 'leaf'
  | 'lightbulb'
  | 'link'
  | 'location'
  | 'microscope'
  | 'network'
  | 'package'
  | 'pill'
  | 'ruler'
  | 'shield'
  | 'sparkles'
  | 'stethoscope'
  | 'store'
  | 'target'
  | 'trending'
  | 'users'
  | 'wind'
  | 'instagram'
  | 'linkedin'
  | 'telegram'
  | 'youtube';
