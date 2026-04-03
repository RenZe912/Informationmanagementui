import { motion } from 'motion/react';
import { Youtube, Twitter, FileText, Mic, Globe } from 'lucide-react';
import { Creator } from '../types';
import { tagColors } from '../data';

interface CreatorCardProps {
  creator: Creator;
  onClick: () => void;
}

const platformIcons = {
  YouTube: Youtube,
  Twitter: Twitter,
  Medium: FileText,
  Substack: FileText,
  Blog: Globe,
  Podcast: Mic,
};

const platformColors = {
  YouTube: 'bg-red-50 text-red-600',
  Twitter: 'bg-blue-50 text-blue-600',
  Medium: 'bg-gray-50 text-gray-700',
  Substack: 'bg-orange-50 text-orange-600',
  Blog: 'bg-purple-50 text-purple-600',
  Podcast: 'bg-pink-50 text-pink-600',
};

export function CreatorCard({ creator, onClick }: CreatorCardProps) {
  const Icon = platformIcons[creator.platform];
  const tagColor = tagColors[creator.tag] || '#008E6B';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200 border border-border group relative overflow-hidden"
    >
      {/* Tag Badge - Top Right */}
      <div className="absolute top-4 right-4">
        <div
          className="px-3 py-1.5 rounded-full text-white text-xs font-medium shadow-sm"
          style={{ backgroundColor: tagColor }}
        >
          {creator.tag}
        </div>
      </div>

      <div className="flex items-start justify-between mb-4 pr-20">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {creator.name}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {creator.bio}
      </p>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Icon className="w-3 h-3" />
            {creator.platform}
          </span>
          <div className={`p-1.5 rounded-lg ${platformColors[creator.platform]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}