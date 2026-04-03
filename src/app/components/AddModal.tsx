import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { Creator, Course } from '../types';
import { allTags, tagColors } from '../data';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Creator | Course) => void;
  type: 'creator' | 'course';
}

export function AddModal({ isOpen, onClose, onAdd, type }: AddModalProps) {
  const isCreator = type === 'creator';
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [formData, setFormData] = useState<any>({
    name: '',
    title: '',
    bio: '',
    description: '',
    platform: 'YouTube',
    progress: 0,
    episodes: 0,
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: any = {
      id: Date.now().toString(),
      tag: selectedTag,
    };

    if (isCreator) {
      newItem.name = formData.name;
      newItem.bio = formData.bio;
      newItem.platform = formData.platform;
    } else {
      newItem.title = formData.title;
      newItem.description = formData.description;
      newItem.progress = formData.progress;
      newItem.episodes = formData.episodes || undefined;
      newItem.link = formData.link || undefined;
    }

    onAdd(newItem);
    
    // Reset form
    setFormData({
      name: '',
      title: '',
      bio: '',
      description: '',
      platform: 'YouTube',
      progress: 0,
      episodes: 0,
      link: '',
    });
    setSelectedTag('');
    onClose();
  };

  const toggleTag = (tag: string) => {
    setSelectedTag(tag);
  };

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
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Add New {isCreator ? 'Creator' : 'Course'}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Name/Title */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isCreator ? 'Name' : 'Title'}
                    </label>
                    <input
                      type="text"
                      value={isCreator ? formData.name : formData.title}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [isCreator ? 'name' : 'title']: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      required
                    />
                  </div>

                  {/* Bio/Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {isCreator ? 'Bio' : 'Description'}
                    </label>
                    <textarea
                      value={isCreator ? formData.bio : formData.description}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [isCreator ? 'bio' : 'description']: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Platform (Creator only) */}
                  {isCreator && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Platform
                      </label>
                      <select
                        value={formData.platform}
                        onChange={(e) =>
                          setFormData((prev: any) => ({ ...prev, platform: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        required
                      >
                        <option value="YouTube">YouTube</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Medium">Medium</option>
                        <option value="Substack">Substack</option>
                        <option value="Blog">Blog</option>
                        <option value="Podcast">Podcast</option>
                      </select>
                    </div>
                  )}

                  {/* Progress (Course only) */}
                  {!isCreator && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Progress: {formData.progress}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.progress}
                        onChange={(e) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            progress: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  )}

                  {/* Episodes (Course only) */}
                  {!isCreator && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Episodes (optional)
                      </label>
                      <input
                        type="number"
                        value={formData.episodes || ''}
                        onChange={(e) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            episodes: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  )}

                  {/* Link (Course only) */}
                  {!isCreator && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Link (optional)
                      </label>
                      <input
                        type="url"
                        value={formData.link}
                        onChange={(e) =>
                          setFormData((prev: any) => ({ ...prev, link: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="https://"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Tags (select at least one)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-full transition-all ${
                            selectedTag === tag
                              ? 'bg-primary text-white'
                              : 'bg-muted text-accent-foreground hover:bg-accent'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-border p-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-lg bg-muted text-foreground hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={selectedTag.length === 0}
                    className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-secondary transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    Add {isCreator ? 'Creator' : 'Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}