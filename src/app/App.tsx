import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Users, GraduationCap, Sparkles, X } from 'lucide-react';
import { Creator, Course, ViewMode } from './types';
import { mockCreators, mockCourses, allTags } from './data';
import { CreatorCard } from './components/CreatorCard';
import { CourseCard } from './components/CourseCard';
import { DetailModal } from './components/DetailModal';
import { EditModal } from './components/EditModal';
import { AddModal } from './components/AddModal';
import { TagFilterDropdown } from './components/TagFilterDropdown';
import { OverviewSection } from './components/OverviewSection';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('creators');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [creators, setCreators] = useState<Creator[]>(mockCreators);
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  // Modal states
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Creator | Course | null>(null);

  const isCreatorMode = viewMode === 'creators';
  const currentItems = isCreatorMode ? creators : courses;

  // Filter logic
  const filteredItems = useMemo(() => {
    let items = currentItems;

    // Filter by search query
    if (searchQuery) {
      items = items.filter((item) => {
        const searchFields = isCreatorMode
          ? [(item as Creator).name, (item as Creator).bio]
          : [(item as Course).title, (item as Course).description];
        
        return searchFields.some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Filter by tags (single tag per item now)
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.includes(item.tag)
      );
    }

    return items;
  }, [currentItems, searchQuery, selectedTags, isCreatorMode]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const handleItemClick = (item: Creator | Course) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleEdit = () => {
    setDetailModalOpen(false);
    setEditModalOpen(true);
  };

  const handleSave = (updatedItem: Creator | Course) => {
    if (isCreatorMode) {
      setCreators((prev) =>
        prev.map((c) => (c.id === updatedItem.id ? (updatedItem as Creator) : c))
      );
    } else {
      setCourses((prev) =>
        prev.map((c) => (c.id === updatedItem.id ? (updatedItem as Course) : c))
      );
    }
    setSelectedItem(updatedItem);
  };

  const handleAdd = (newItem: Creator | Course) => {
    if (isCreatorMode) {
      setCreators((prev) => [...prev, newItem as Creator]);
    } else {
      setCourses((prev) => [...prev, newItem as Course]);
    }
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  High-Quality Information Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Curate and manage your learning resources
                </p>
              </div>
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-secondary transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add {isCreatorMode ? 'Creator' : 'Course'}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setViewMode('creators');
                clearFilters();
              }}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                isCreatorMode
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <Users className="w-5 h-5" />
              Creators ({creators.length})
            </button>
            <button
              onClick={() => {
                setViewMode('courses');
                clearFilters();
              }}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                !isCreatorMode
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Courses ({courses.length})
            </button>
          </div>

          {/* Search Bar and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${isCreatorMode ? 'creators' : 'courses'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <TagFilterDropdown
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              onClearAll={() => setSelectedTags([])}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Overview Section - Only for courses */}
        {!isCreatorMode && <OverviewSection courses={filteredItems as Course[]} />}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-accent rounded-full text-sm flex items-center gap-2"
              >
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
            {selectedTags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-primary text-white rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-secondary transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredItems.length} of {currentItems.length}{' '}
          {isCreatorMode ? 'creators' : 'courses'}
        </div>

        {/* Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) =>
                isCreatorMode ? (
                  <CreatorCard
                    key={item.id}
                    creator={item as Creator}
                    onClick={() => handleItemClick(item)}
                  />
                ) : (
                  <CourseCard
                    key={item.id}
                    course={item as Course}
                    onClick={() => handleItemClick(item)}
                  />
                )
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex p-4 bg-muted rounded-full mb-4">
              {isCreatorMode ? (
                <Users className="w-8 h-8 text-muted-foreground" />
              ) : (
                <GraduationCap className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No {isCreatorMode ? 'creators' : 'courses'} found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <DetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onEdit={handleEdit}
        item={selectedItem}
        type={isCreatorMode ? 'creator' : 'course'}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        item={selectedItem}
        type={isCreatorMode ? 'creator' : 'course'}
      />

      <AddModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
        type={isCreatorMode ? 'creator' : 'course'}
      />
    </div>
  );
}