import { Creator, Course } from './types';

export const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Ali Abdaal',
    bio: 'Doctor turned productivity expert, sharing evidence-based strategies for better work and life.',
    tag: 'Productivity',
    platform: 'YouTube',
  },
  {
    id: '2',
    name: 'Lenny Rachitsky',
    bio: 'Ex-Airbnb PM helping product leaders build better products through actionable insights.',
    tag: 'Product',
    platform: 'Substack',
  },
  {
    id: '3',
    name: 'Naval Ravikant',
    bio: 'Angel investor and philosopher sharing wisdom on wealth, happiness, and personal growth.',
    tag: 'Philosophy',
    platform: 'Twitter',
  },
  {
    id: '4',
    name: 'Lex Fridman',
    bio: 'AI researcher hosting deep conversations with leading thinkers in science and technology.',
    tag: 'AI',
    platform: 'Podcast',
  },
  {
    id: '5',
    name: 'Farnam Street',
    bio: 'Helping you master the best of what other people have already figured out.',
    tag: 'Learning',
    platform: 'Blog',
  },
  {
    id: '6',
    name: 'Nat Eliason',
    bio: 'Entrepreneur and writer exploring personal growth, crypto, and building digital products.',
    tag: 'Entrepreneurship',
    platform: 'Blog',
  },
  {
    id: '7',
    name: 'Andrew Huberman',
    bio: 'Neuroscientist sharing science-based tools for everyday life and peak performance.',
    tag: 'Science',
    platform: 'Podcast',
  },
  {
    id: '8',
    name: 'Tim Ferriss',
    bio: 'Author and podcast host deconstructing world-class performers from various disciplines.',
    tag: 'Business',
    platform: 'Podcast',
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Building a Second Brain',
    description: 'Master the art of personal knowledge management and turn information into creative output.',
    tag: 'Productivity',
    link: 'https://buildingasecondbrain.com',
    progress: 75,
    episodes: 10,
  },
  {
    id: '2',
    title: 'Reforge Product Strategy',
    description: 'Advanced product strategy frameworks used by top PMs at leading tech companies.',
    tag: 'Product',
    link: 'https://reforge.com',
    progress: 40,
    episodes: 8,
  },
  {
    id: '3',
    title: 'The Complete Guide to Deep Work',
    description: 'Learn to focus intensely and produce meaningful work in a distracted world.',
    tag: 'Productivity',
    progress: 100,
    episodes: 6,
  },
  {
    id: '4',
    title: 'Ship 30 for 30',
    description: 'Write and publish 30 pieces of content in 30 days to build your online presence.',
    tag: 'Writing',
    link: 'https://ship30for30.com',
    progress: 60,
    episodes: 30,
  },
  {
    id: '5',
    title: 'Designing Data-Intensive Applications',
    description: 'Deep dive into the principles and practices of building scalable systems.',
    tag: 'Engineering',
    progress: 25,
    episodes: 12,
  },
  {
    id: '6',
    title: 'The Mom Test',
    description: 'Learn how to talk to customers and validate your business ideas effectively.',
    tag: 'Entrepreneurship',
    progress: 90,
    episodes: 5,
  },
  {
    id: '7',
    title: 'Learn AI Fundamentals',
    description: 'Comprehensive introduction to artificial intelligence and machine learning concepts.',
    tag: 'AI',
    progress: 55,
    episodes: 15,
  },
  {
    id: '8',
    title: 'Growth Marketing Mastery',
    description: 'Data-driven strategies for scaling your product and acquiring customers efficiently.',
    tag: 'Marketing',
    progress: 30,
    episodes: 9,
  },
  {
    id: '9',
    title: 'System Design Interview Prep',
    description: 'Master the skills needed to design large-scale distributed systems.',
    tag: 'Engineering',
    progress: 45,
    episodes: 14,
  },
  {
    id: '10',
    title: 'Strategic Thinking Workshop',
    description: 'Develop mental models and frameworks for better decision-making in business.',
    tag: 'Strategy',
    progress: 70,
    episodes: 7,
  },
];

export const allTags = Array.from(
  new Set([...mockCreators.map((c) => c.tag), ...mockCourses.map((c) => c.tag)])
).sort();

// Tag color mapping for consistent visualization
export const tagColors: Record<string, string> = {
  'Productivity': '#008E6B',
  'Product': '#46B065',
  'Philosophy': '#81C570',
  'AI': '#DCECB5',
  'Learning': '#008E6B',
  'Entrepreneurship': '#46B065',
  'Science': '#81C570',
  'Business': '#DCECB5',
  'Writing': '#008E6B',
  'Engineering': '#46B065',
  'Marketing': '#81C570',
  'Strategy': '#DCECB5',
};