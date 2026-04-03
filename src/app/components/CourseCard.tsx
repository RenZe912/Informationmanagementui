import { motion } from 'motion/react';
import { ExternalLink, Play } from 'lucide-react';
import { Course } from '../types';
import { tagColors } from '../data';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const progressColor =
    course.progress === 100
      ? 'bg-secondary'
      : course.progress >= 50
      ? 'bg-accent'
      : 'bg-primary';

  const tagColor = tagColors[course.tag] || '#008E6B';

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
          {course.tag}
        </div>
      </div>

      <div className="flex items-start justify-between mb-3 pr-24">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
          {course.title}
        </h3>
        {course.link && (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors absolute top-14 right-4"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {course.description}
      </p>

      <div className="space-y-3 pt-3 border-t border-border">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Play className="w-3 h-3" />
              Progress
            </span>
            <span className="font-medium text-foreground">{course.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full ${progressColor} rounded-full`}
            />
          </div>
        </div>

        {/* Episodes */}
        {course.episodes && (
          <div className="text-xs text-muted-foreground">
            {course.episodes} episodes
          </div>
        )}
      </div>
    </motion.div>
  );
}