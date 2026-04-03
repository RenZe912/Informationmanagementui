import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Check, X } from 'lucide-react';
import { allTags } from '../data';

interface TagFilterDropdownProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
}

export function TagFilterDropdown({
  selectedTags,
  onToggleTag,
  onClearAll,
}: TagFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
          selectedTags.length > 0
            ? 'bg-primary text-white border-primary shadow-sm'
            : 'bg-white text-foreground border-border hover:bg-muted'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          {selectedTags.length > 0 ? `${selectedTags.length} Tags` : 'Filter Tags'}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl border border-border shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30">
              <span className="text-sm font-medium text-foreground">Filter by Tags</span>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-primary hover:text-secondary transition-colors font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Tag List */}
            <div className="max-h-80 overflow-y-auto">
              {allTags.map((tag, index) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => onToggleTag(tag)}
                    className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-primary/5 hover:bg-primary/10'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isSelected
                          ? 'text-primary font-medium'
                          : 'text-foreground'
                      }`}
                    >
                      {tag}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-md bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer with count */}
            {selectedTags.length > 0 && (
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <div className="text-xs text-muted-foreground">
                  {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Tags Chips - Show below button when tags are selected */}
      {selectedTags.length > 0 && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 right-0 flex flex-wrap gap-2 max-w-md"
        >
          {selectedTags.slice(0, 3).map((tag) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-primary text-white text-xs rounded-full flex items-center gap-1.5 shadow-sm"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTag(tag);
                }}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
          {selectedTags.length > 3 && (
            <div className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              +{selectedTags.length - 3} more
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
