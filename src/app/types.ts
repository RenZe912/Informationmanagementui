export interface Creator {
  id: string;
  name: string;
  bio: string;
  tag: string; // Changed from tags array to single tag
  platform: 'YouTube' | 'Twitter' | 'Medium' | 'Substack' | 'Blog' | 'Podcast';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tag: string; // Changed from tags array to single tag
  link?: string;
  progress: number; // 0-100
  episodes?: number;
}

export type ViewMode = 'creators' | 'courses';