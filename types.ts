
export enum Platform {
  LINKEDIN = 'LinkedIn',
  INSTAGRAM = 'Instagram',
  TWITTER = 'X / Twitter',
  THREADS = 'Threads'
}

export enum ContentType {
  POST = 'Post',
  REEL_SCRIPT = 'Reel Script',
  CAROUSEL = 'Carousel'
}

export enum Persona {
  VISIONARY = 'The Visionary',
  ANALYST = 'The Analyst',
  MINIMALIST = 'The Minimalist',
  COMEDIAN = 'The Comedian'
}

export interface Draft {
  id: string;
  platform: Platform;
  type: ContentType;
  persona: Persona;
  title: string;
  content: string | string[];
  engagementScore: number;
  strategyHint: string;
  createdAt: Date;
}

export interface GenerationConfig {
  platform: Platform;
  type: ContentType;
  persona: Persona;
  prompt: string;
}
