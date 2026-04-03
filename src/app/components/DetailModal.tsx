import { motion, AnimatePresence } from 'motion/react';
import { X, Edit2, ExternalLink, Youtube, Twitter, FileText, Mic, Globe, Play } from 'lucide-react';
import { Creator, Course } from '../types';
import { tagColors } from '../data';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  item: Creator | Course | null;
  type: 'creator' | 'course';
}

const platformIcons = {
  YouTube: Youtube,
  Twitter: Twitter,
  Medium: FileText,
  Substack: FileText,
  Blog: Globe,
  Podcast: Mic,
};

export function DetailModal({ isOpen, onClose, onEdit, item, type }: DetailModalProps) {
  if (!item) return null;

  const isCreator = type === 'creator';
  const creator = isCreator ? (item as Creator) : null;
  const course = !isCreator ? (item as Course) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-border p-6 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-1">
                    {isCreator ? creator?.name : course?.title}
                  </h2>
                  {isCreator && creator && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {(() => {
                        const Icon = platformIcons[creator.platform];
                        return (
                          <>
                            <Icon className="w-4 h-4" />
                            {creator.platform}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onEdit}
                    className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description/Bio */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {isCreator ? 'Bio' : 'Description'}
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {isCreator ? creator?.bio : course?.description}
                  </p>
                </div>

                {/* Tag */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Category</h3>
                  <div
                    className="inline-flex px-4 py-2 rounded-full text-white font-medium"
                    style={{ backgroundColor: tagColors[item.tag] || '#008E6B' }}
                  >
                    {item.tag}
                  </div>
                </div>

                {/* Course-specific details */}
                {!isCreator && course && (
                  <>
                    {/* Progress */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Progress</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Course Progress
                          </span>
                          <span className="text-lg font-semibold text-foreground">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div
                            style={{ width: `${course.progress}%` }}
                            className={`h-full transition-all duration-500 ${
                              course.progress === 100
                                ? 'bg-secondary'
                                : course.progress >= 50
                                ? 'bg-accent'
                                : 'bg-primary'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Episodes */}
                    {course.episodes && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Episodes</h3>
                        <p className="text-foreground">{course.episodes} total episodes</p>
                      </div>
                    )}

                    {/* Link */}
                    {course.link && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Link</h3>
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                        >
                          {course.link}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}